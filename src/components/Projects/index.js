import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "~/styles/components/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProjectsActions from "~/store/ducks/projects";
import { Container, Project } from "./styles";

class Projects extends Component {
    static propTypes = {
        activeTeam: PropTypes.shape({
            name: PropTypes.string
        }).isRequired
    };

    componentDidMount() {
        const { getProjectRequest, activeTeam } = this.props;

        if (activeTeam) {
            getProjectRequest();
        }
    }

    render() {
        const { activeTeam, projects } = this.props;

        if (!activeTeam) return null;

        return (
            <Container>
                <header>
                    <h1>{activeTeam.name}</h1>

                    <div>
                        <Button size="small" onClick={() => {}}>
                            + Novo
                        </Button>
                        <Button size="small" onClick={() => {}}>
                            Membros
                        </Button>
                    </div>
                </header>

                {projects.data.map(project => (
                    <Project key={project.id}>
                        <p>{project.title}</p>
                    </Project>
                ))}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    activeTeam: state.teams.active,
    projects: state.projects
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ProjectsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);

import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "~/styles/components/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProjectsActions from "~/store/ducks/projects";
import MembersActions from "~/store/ducks/members";
import { Container, Project } from "./styles";
import Modal from "~/components/Modal";

class Projects extends Component {
    static propTypes = {
        activeTeam: PropTypes.shape({
            name: PropTypes.string
        }).isRequired
    };

    state = {
        newProject: ""
    };

    componentDidMount() {
        const { getProjectRequest, activeTeam } = this.props;

        if (activeTeam) {
            getProjectRequest();
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCreateProject = e => {
        e.preventDefault();

        const { createProjectRequest } = this.props;
        const { newProject } = this.state;

        createProjectRequest(newProject);
    };

    render() {
        const {
            activeTeam,
            projects,
            openProjectModal,
            closeProjectModal,
            members,
            openMembersModal,
            closeMembersModal
        } = this.props;

        const { newProject } = this.state;

        if (!activeTeam) return null;

        return (
            <Container>
                <header>
                    <h1>{activeTeam.name}</h1>

                    <div>
                        <Button size="small" onClick={openProjectModal}>
                            + Novo
                        </Button>
                        <Button size="small" onClick={openMembersModal}>
                            Membros
                        </Button>
                    </div>
                </header>

                {projects.data.map(project => (
                    <Project key={project.id}>
                        <p>{project.title}</p>
                    </Project>
                ))}

                {projects.projectModalOpen && (
                    <Modal>
                        <h1>Criar projeto</h1>

                        <form onSubmit={this.handleCreateProject}>
                            <span>NOME</span>

                            <input
                                name="newProject"
                                value={newProject}
                                onChange={this.handleInputChange}
                                type="newProject"
                            />

                            <Button size="big" type="submit">
                                Salvar
                            </Button>

                            <Button
                                size="big"
                                color="grey"
                                onClick={closeProjectModal}
                            >
                                Fechar
                            </Button>
                        </form>
                    </Modal>
                )}

                {members.membersModalOpen && (
                    <Modal>
                        <h1>Membros</h1>
                        <Button
                            size="big"
                            color="grey"
                            onClick={closeMembersModal}
                        >
                            Fechar
                        </Button>
                    </Modal>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    activeTeam: state.teams.active,
    projects: state.projects,
    members: state.members
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);

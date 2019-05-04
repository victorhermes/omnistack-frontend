import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamsActions from "~/store/ducks/teams";
import AuthActions from "~/store/ducks/auth";
import { NewTeam, Container, TeamList, Team, Logout } from "./styles";
import Button from "~/styles/components/Button";

import Modal from "~/components/Modal";

class TeamSwitcher extends Component {
    static propTypes = {
        getTeamsRequest: PropTypes.func.isRequired
    };

    state = {
        newTeam: ""
    };

    componentDidMount() {
        const { getTeamsRequest } = this.props;

        if (getTeamsRequest) {
            getTeamsRequest();
        }
    }

    handleTeamSelect = team => {
        const { selectTeam } = this.props;

        selectTeam(team);
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCreateTeam = e => {
        e.preventDefault();

        const { createTeamRequest } = this.props;
        const { newTeam } = this.state;

        createTeamRequest(newTeam);

        this.setState({ newTeam: "" });
    };

    render() {
        const { teams, openTeamModal, closeTeamModal, signOut } = this.props;
        const { newTeam } = this.state;

        return (
            <Container>
                <TeamList>
                    {teams.data.map(team => (
                        <Team
                            key={team.id}
                            onClick={() => this.handleTeamSelect(team)}
                            isSelected={
                                teams.active !== null &&
                                teams.active.name === team.name
                                    ? "select"
                                    : ""
                            }
                        >
                            <img
                                alt={team.name}
                                src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                                    team.name
                                }`}
                            />
                        </Team>
                    ))}

                    <NewTeam onClick={openTeamModal}>NOVO</NewTeam>

                    {teams.teamModalOpen && (
                        <Modal>
                            <h1> Criar time </h1>

                            <form onSubmit={this.handleCreateTeam}>
                                <span>NOME</span>
                                <input
                                    name="newTeam"
                                    value={newTeam}
                                    onChange={this.handleInputChange}
                                />

                                <Button size="big" type="submit">
                                    Salvar
                                </Button>

                                <Button
                                    onClick={closeTeamModal}
                                    size="small"
                                    color="grey"
                                >
                                    Cancelar
                                </Button>
                            </form>
                        </Modal>
                    )}
                </TeamList>

                <Logout onClick={signOut}>SAIR</Logout>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.teams
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamSwitcher);

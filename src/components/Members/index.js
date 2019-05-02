import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import api from "~/services/api";
import MembersActions from "~/store/ducks/members";

import Button from "~/styles/components/Button";
import Modal from "~/components/Modal";
import Select from "react-select";
import { MembersList, Invite } from "./styles";

class Members extends Component {
    state = {
        roles: [],
        invite: ""
    };

    async componentDidMount() {
        const { getMembersRequest } = this.props;

        getMembersRequest();

        const response = await api.get("roles");

        this.setState({ roles: response.data });
    }

    handleRolesChange = (id, roles) => {
        const { updateMemberRequest } = this.props;
        console.tron.log(roles);
        updateMemberRequest(id, roles);
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleInvite = e => {
        e.preventDefault();

        const { inviteMemberRequest } = this.props;
        const { invite } = this.state;

        inviteMemberRequest(invite);
    };

    render() {
        const { closeMembersModal, members } = this.props;
        const { roles, invite } = this.state;

        return (
            <Modal size="big">
                <h1>Membros</h1>

                <Invite onSubmit={this.handleInvite}>
                    <input
                        name="invite"
                        placeholder="Convidar para o time"
                        value={invite}
                        onChange={this.handleInputChange}
                    />

                    <Button type="submit">Convidar</Button>
                </Invite>

                <form>
                    <MembersList>
                        {members.data.map(member => (
                            <li key={member.id}>
                                <strong>{member.user.name}</strong>

                                <Select
                                    isMulti
                                    value={member.roles}
                                    options={roles}
                                    getOptionLabel={role => role.name}
                                    getOptionValue={role => role.id}
                                    onChange={value =>
                                        this.handleRolesChange(member.id, value)
                                    }
                                />
                            </li>
                        ))}
                    </MembersList>

                    <Button
                        onClick={closeMembersModal}
                        filled={false}
                        color="grey"
                    >
                        Cancelar
                    </Button>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    members: state.members
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(MembersActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members);

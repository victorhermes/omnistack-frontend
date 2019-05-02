import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import api from "~/services/api";
import MembersActions from "~/store/ducks/members";

import Button from "~/styles/components/Button";
import Modal from "~/components/Modal";
import Select from "react-select";
import { MembersList } from "./styles";

class Members extends Component {
    state = {
        roles: []
    };

    async componentDidMount() {
        const { getMembersRequest } = this.props;

        getMembersRequest();

        const response = await api.get("roles");

        this.setState({ roles: response.data });
    }

    handleRolesChange = (id, roles) => {
        const { updateMemberRequest } = this.props;

        updateMemberRequest(id, roles);
    };

    render() {
        const { closeMembersModal, members } = this.props;
        const { roles } = this.state;

        return (
            <Modal size="big">
                <h1>Membros</h1>

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

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MembersActions from "~/store/ducks/members";

import Button from "~/styles/components/Button";
import Modal from "~/components/Modal";
import { MembersList } from "./styles";

const Members = ({ closeMembersModal }) => (
    <Modal size="big">
        <h1>Membros</h1>

        <form>
            <MembersList>
                <li>
                    <strong>Victor Hermes</strong>
                </li>
            </MembersList>

            <Button onClick={closeMembersModal} filled={false} color="grey">
                Cancelar
            </Button>
        </form>
    </Modal>
);

const mapStateToProps = state => ({
    members: state.members
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(MembersActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members);

import React from "react";

import Button from "~/styles/components/Button";
import Modal from "~/components/Modal";
import { MembersList } from "./styles";

const Members = () => (
    <Modal size="big">
        <h1>Membros</h1>

        <form>
            <MembersList>
                <li>
                    <strong>Victor Hermes</strong>
                </li>
            </MembersList>

            <Button onClick={() => {}} filled={false} color="grey">
                Cancelar
            </Button>
        </form>
    </Modal>
);

export default Members;

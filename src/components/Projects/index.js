import React from "react";

import Button from "~/styles/components/Button";
import { connect } from "react-redux";
import { Container, Project } from "./styles";

const Projects = ({ activeTeam }) => {
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

            <Project>
                <p>Aplicação com React Native</p>
            </Project>

            <Project>
                <p>Aplicação com React Native</p>
            </Project>

            <Project>
                <p>Aplicação com React Native</p>
            </Project>

            <Project>
                <p>Aplicação com React Native</p>
            </Project>
        </Container>
    );
};

const mapStateToProps = state => ({
    activeTeam: state.teams.active
});

export default connect(mapStateToProps)(Projects);

import React, { Component } from "react";
import TeamSwitcher from "~/components/TeamSwitcher";
import { Container } from "./styles";
import Gif from "~/elips.svg";
class Main extends Component {
    state = {
        isLoading: true
    };

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return "CARREGANDO";
        }
        return (
            <Container>
                <TeamSwitcher />
            </Container>
        );
    }
}

export default Main;

import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PayActions from "~/store/ducks/pay";
import { withFormik } from "formik";
import { Container, Content } from "./styles";
import Button from "~/styles/components/Button";

const Payment = ({ handleSubmit, errors, values, handleChange, auth }) => (
    <Container>
        <Content>
            <h1>Pagamentos</h1>

            <form onSubmit={handleSubmit}>
                <span>Número do cartão:</span>
                <input
                    type="text"
                    name="Cardnumber"
                    onChange={handleChange}
                    value={values.Cardnumber}
                />

                <span>Nome (como escrito no cartão):</span>
                <input
                    type="text"
                    name="card_holder_name"
                    onChange={handleChange}
                    value={values.card_holder_name}
                />

                <span> Mês de expiração: </span>
                <input
                    type="text"
                    name="card_expiration_date"
                    onChange={handleChange}
                    value={values.card_expiration_date}
                />

                <span>Código de segurança:</span>
                <input
                    type="text"
                    name="card_cvv"
                    onChange={handleChange}
                    value={values.card_cvv}
                />

                <Button size="big" type="submit">
                    Comprar
                </Button>

                <Button size="big" color="grey" onClick={() => {}}>
                    Cancelar
                </Button>
            </form>
        </Content>
    </Container>
);

const mapDispatchToProps = dispatch => bindActionCreators(PayActions, dispatch);

export default compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withFormik({
        mapPropsToValues: () => ({
            Cardnumber: "",
            card_holder_name: "",
            card_expiration_date: "",
            card_cvv: ""
        }),

        handleSubmit: (values, { props }) => {
            const {
                Cardnumber,
                card_holder_name,
                card_expiration_date,
                card_cvv
            } = values;
            const { payRequest } = props;

            payRequest(
                Cardnumber,
                card_holder_name,
                card_expiration_date,
                card_cvv
            );
        }
    })
)(Payment);

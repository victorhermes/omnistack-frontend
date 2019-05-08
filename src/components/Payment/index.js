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
                    name="CardNumber"
                    onChange={handleChange}
                    value={values.CardNumber}
                />

                <span>Nome (como escrito no cartão):</span>
                <input
                    type="text"
                    name="cardHolderName"
                    onChange={handleChange}
                    value={values.cardHolderName}
                />

                <span> Mês de expiração: </span>
                <input
                    type="text"
                    name="cardExpirationDate"
                    onChange={handleChange}
                    value={values.cardExpirationDate}
                />

                <span> Parcelas: </span>
                <input
                    type="text"
                    name="installments"
                    onChange={handleChange}
                    value={values.installments}
                />

                <span>Código de segurança:</span>
                <input
                    type="text"
                    name="cardCvv"
                    onChange={handleChange}
                    value={values.cardCvv}
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
            CardNumber: "",
            cardHolderName: "",
            cardExpirationDate: "",
            cardCvv: "",
            installments: ""
        }),

        handleSubmit: (values, { props }) => {
            const {
                CardNumber,
                cardHolderName,
                cardExpirationDate,
                cardCvv,
                installments
            } = values;
            const { payRequest } = props;

            payRequest(
                CardNumber,
                cardHolderName,
                cardExpirationDate,
                cardCvv,
                installments
            );
        }
    })
)(Payment);

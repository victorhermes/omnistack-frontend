import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/store/ducks/auth";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Button from "~/styles/components/Button";
import Error from "~/styles/components/Error";
import { Container, SignForm } from "../styles";

const SignUp = ({ handleSubmit, errors, values, handleChange, auth }) => (
    <Container>
        <SignForm onSubmit={handleSubmit}>
            <h1>Criar conta</h1>

            <span>NOME</span>
            <input
                name="name"
                onChange={handleChange}
                value={values.name}
                autoFocus
            />

            {!!errors.name && <Error>{errors.name}</Error>}

            <span>E-MAIL</span>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
            />

            {!!errors.email && <Error>{errors.email}</Error>}

            <span>SENHA</span>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                values={values.password}
            />
            {!!errors.password && <Error>{errors.password}</Error>}

            <span>CONFIRMAÇÃO DE SENHA</span>
            <input
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                values={values.passwordConfirm}
            />
            {!!errors.passwordConfirm && (
                <Error>{errors.passwordConfirm}</Error>
            )}

            <Button
                size="big"
                type="submit"
                /*disabled={!values.email || !values.password}*/
            >
                CRIAR
            </Button>

            <Link to="/signin"> Efetuar login </Link>
        </SignForm>
    </Container>
);

const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withFormik({
        mapPropsToValues: () => ({
            email: "",
            name: "",
            password: "",
            passwordConfirm: ""
        }),

        validateOnChange: true,
        validateOnBlur: false,

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("E-mail inválido")
                .required("Campo obrigatório"),
            name: Yup.string().required("Campo obrigatório"),
            password: Yup.string()
                .required("Campo obrigatório")
                .min(5, "Senha muito curta!")
                .max(20, "Senha muito longa!")
                .matches(/[a-z]/, "Digita ao menos uma letra minúscula")
                .matches(/[A-Z]/, "Digite ao menos uma letra maiúscula")
                .matches(
                    /[a-zA-Z]+[^a-zA-Z\s]+/,
                    "Ao menos 1 número ou caractere especial (@, !, #, etc)"
                ),
            passwordConfirm: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Senhas não conferem"
            )
        }),

        handleSubmit: (values, { props }) => {
            const { email, name, password } = values;
            const { signUpRequest } = props;
            signUpRequest(email, name, password);
        }
    })
)(SignUp);

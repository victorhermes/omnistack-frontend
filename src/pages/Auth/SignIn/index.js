import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/store/ducks/auth";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Gif from "~/elips.svg";
import Button from "~/styles/components/Button";
import Error from "~/styles/components/Error";
import { Container, SignForm, Checkbox } from "../styles";

const SignIn = ({
    handleSubmit,
    errors,
    values,
    handleChange,
    auth,
    email
}) => (
    <Container>
        <SignForm onSubmit={handleSubmit}>
            <h1>Hermes</h1>

            <span>E-MAIL</span>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                autoFocus
            />

            {!!errors.email && <Error>{errors.email}</Error>}

            <span>SENHA</span>
            <input
                type="password"
                name="password"
                id="showPassword"
                onChange={handleChange}
                values={values.password}
            />
            {!!errors.password && <Error>{errors.password}</Error>}

            {/* <span>CONFIRMAÇÃO DE SENHA</span>
            <input
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                values={values.passwordConfirm}
            />
            {!!errors.passwordConfirm && (
                <Error>{errors.passwordConfirm}</Error>
            )} */}

            <Checkbox>
                <input
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                />
                <p>Lembrar acesso?</p>
            </Checkbox>

            <Button
                size="big"
                type="submit"
                /*disabled={!values.email || !values.password}*/
            >
                {auth ? <img src={Gif} alt="Carregando..." /> : "ENTRAR"}
            </Button>

            <Link to="/signup"> Criar conta </Link>
            <Link to="/recover"> Recuperar senha</Link>
        </SignForm>
    </Container>
);

const mapStateToProps = state => ({
    auth: state.auth.loading,
    email: state.auth.email
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withFormik({
        mapPropsToValues: () => ({
            email: localStorage.getItem("@Token:email") || "",
            password: "",
            passwordConfirm: "",
            remember: null
        }),

        validateOnChange: true,
        validateOnBlur: false,

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("E-mail inválido")
                .required("Campo obrigatório"),
            password: Yup.string()
                .required("Campo obrigatório")
                .min(1, "Senha muito curta!")
                .max(20, "Senha muito longa!")
            /*.matches(/[a-z]/, "Digita ao menos uma letra minúscula")
                .matches(/[A-Z]/, "Digite ao menos uma letra maiúscula")
                .matches(
                    /[a-zA-Z]+[^a-zA-Z\s]+/,
                    "Ao menos 1 número ou caractere especial (@, !, #, etc)"
                )
            passwordConfirm: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Senhas não conferem"
            )*/
        }),

        handleSubmit: (values, { props }) => {
            const { email, password, remember } = values;
            const { signInRequest } = props;

            signInRequest(email, password, remember);
        }
    })
)(SignIn);

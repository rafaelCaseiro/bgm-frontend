import { useState } from "react";
import { Input } from "../../../Components/Input";
import { Title } from "../../../Components/Title";
import { Container, Form, LinkContent, Logo, PasswordContent } from "../style";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
import { login } from "../../../services/auth";
import { Button } from "../../../Components/Button";
import { PasswordIcon } from "../../../Components/PasswordIcon";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const erroMessageInitialState = {
    message: "",
    username: false,
    password: false,
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(erroMessageInitialState);

  const submitData = async (e) => {
    e.preventDefault();
    setErrorMessage({
      password: false,
      username: false,
    });
    if (!form.password || !form.username) {
      return setErrorMessage({
        password: !form.password,
        username: !form.username,
      });
    }
    setLoading(true);
    const response = await api.post("/auth/signin", form).catch((err) => err);
    setLoading(false);
    if (!response.data) {
      return Swal.fire("Login", "Incorrect e-mail or password!", "error");
    }
    login(response.data.token);
    return navigate("/");
  };

  return (
    <>
      <Title>Login</Title>

      <Container>
        <Form onSubmit={submitData}>
          <Logo src="https://zenbytes-public.sfo2.digitaloceanspaces.com/unesp/logo.jpg" />
          <Input
            label="E-mail"
            placeholder="Type your e-mail"
            isInvalid={!!errorMessage.username}
            item={form}
            setItem={setForm}
            params="username"
            type="input"
          />
          <PasswordContent>
            <Input
              label="Password"
              placeholder="Type your password"
              isInvalid={!!errorMessage.password}
              item={form}
              setItem={setForm}
              params="password"
              type="input"
              inputType={!showPassword && "password"}
            />
            <PasswordIcon
              {...{
                showPassword,
                setShowPassword,
                error: errorMessage.password,
              }}
            />
          </PasswordContent>

          <Button
            bg="default"
            border="default"
            color="white"
            disabled={loading}
          >
            {loading ? (
              <ReactLoading
                style={{
                  fill: "#fff",
                  height: "13px",
                  width: "13px",
                  display: "inline-table",
                }}
                type="spin"
                color="#fff"
                height={19}
                width={19}
              />
            ) : (
              "Login"
            )}
          </Button>
          <LinkContent>
            <Link to="/forgot">Forgot Password?</Link>
          </LinkContent>
        </Form>
      </Container>
    </>
  );
}

import { useState } from "react";
import { Input } from "../../../Components/Input";
import { Title } from "../../../Components/Title";
import { Container, Form, LinkContent, Logo } from "../style";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
import { Button } from "../../../Components/Button";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";

export function Forgot() {
  const navigate = useNavigate();
  const erroMessageInitialState = {
    message: "",
    username: false,
  };

  const [form, setForm] = useState({
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(erroMessageInitialState);

  const submitData = async (e) => {
    e.preventDefault();
    if (!form.username) {
      return setErrorMessage({
        username: !form.username,
      });
    }
    setLoading(true);
    const response = await api.post("/auth/forgot", form).catch((err) => err);
    setLoading(false);
    if (!response.data) {
      return Swal.fire("Forgot Password", response.message, "error");
    }
    Swal.fire(
      "Forgot Password",
      "Password remind was successful sent!",
      "success"
    );
    setForm({
      username: "",
    });
    return navigate("/login");
  };

  return (
    <>
      <Title></Title>

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
              "Send Password Reminder"
            )}
          </Button>
          <LinkContent>
            <Link to="/login">Login</Link>
          </LinkContent>
        </Form>
      </Container>
    </>
  );
}

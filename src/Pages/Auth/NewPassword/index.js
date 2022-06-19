import { useState } from "react";
import { Input } from "../../../Components/Input";
import { Container, Form, LinkContent, Logo, PasswordContent } from "../style";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
import { Button } from "../../../Components/Button";
import { PasswordIcon } from "../../../Components/PasswordIcon";
import ReactLoading from "react-loading";
import { Link, useNavigate, useParams } from "react-router-dom";

export function NewPassword() {
  const navigate = useNavigate();

  const { token } = useParams();

  const erroMessageInitialState = {
    password: false,
  };

  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(erroMessageInitialState);

  const submitData = async (e) => {
    e.preventDefault();
    if (!form.password) {
      return setErrorMessage({
        password: !form.password,
      });
    }
    setLoading(true);
    const response = await api
      .put("/auth/createpassword/" + token, form)
      .catch((err) => err);
    setLoading(false);
    if (!response.data) {
      return Swal.fire("Create Password", "Expired or invalid token", "error");
    }
    Swal.fire("Create Password", "Password created successfully", "success");
    navigate("/login");
  };

  return (
    <>
      <Container>
        <Form onSubmit={submitData}>
          <Logo src="https://zenbytes-public.sfo2.digitaloceanspaces.com/unesp/logo.jpg" />

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
              "Create Password"
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

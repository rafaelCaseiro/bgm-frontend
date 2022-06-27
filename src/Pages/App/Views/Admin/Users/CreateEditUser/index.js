import { useState } from "react";
import { useCallback, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../../../../../Components/Button";
import { Icons } from "../../../../../../Components/Icons";
import { Input } from "../../../../../../Components/Input";
import { SubHeader } from "../../../../../../Components/SubHeader";
import Profile from "../../../../../../contexts/profile";
import { api } from "../../../../../../services/api";
import {
  Block,
  BlockBody,
  BlockHeader,
  Col,
  Row,
  Separator,
} from "../../../../../../styles";
import { translate } from "../../../../../../utils/globalFunctions";
import ReactLoading from "react-loading";

import { useNavigate, useParams } from "react-router-dom";
import {
  CheckboxItems,
  Content,
} from "../../../../../../Components/Input/style";

export function CreateEditUser(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    code: "",
    responsibility: "",
    phoneNumber: "",
    status: true,
    roles: ["user"],
    customer: null,
    _id: "",
  });

  const [getUser, setGetUser] = useState(true);

  const [loading, setLoading] = useState(true);

  const resendToken = useCallback(async () => {
    const response = await Swal.fire({
      title: translate("Resend token", profile.translate),
      text: translate("Do you want to confirm?", profile.translate),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0451e8",
      cancelButtonColor: "#d33",
      confirmButtonText: translate("Yes, resend token!", profile.translate),
      showLoaderOnConfirm: true,
      preConfirm: async () =>
        await api.get("user/sendtoken/" + user._id).catch((err) => ({
          err: true,
          data: { message: err.response.data.message },
        })),
    });

    if (response.value) {
      Swal.fire(
        "Resend token",
        response.value.data.message,
        response.value.err ? "error" : "success"
      );
    }
  }, [user._id, profile]);

  const saveUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!params.id) {
          const response = await Swal.fire({
            title: translate("Create User", profile.translate),
            text: translate(
              "Do you want to confirm user creation",
              profile.translate
            ),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0451e8",
            cancelButtonColor: "#d33",
            confirmButtonText: translate(
              "Yes, Create User!",
              profile.translate
            ),
            showLoaderOnConfirm: true,
            preConfirm: async () =>
              await api.post("user", user).catch((err) => ({
                err: true,
                data: { message: err.response.data.message },
              })),
          });
          if (response.value) {
            Swal.fire(
              translate("Create User", profile.translate),
              response.value.data.message,
              response.value.err ? "error" : "success"
            );
            navigate("/basicregistration/user/edit/" + response.value.data.id, {
              replace: true,
            });
            setGetUser(true, { replace: true });
          }
        } else {
          const response = await Swal.fire({
            title: translate("Edit User", profile.translate),
            text: translate(
              "Do you want to confirm user edit",
              profile.translate
            ),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0451e8",
            cancelButtonColor: "#d33",
            confirmButtonText: translate("Yes, Edit User", profile.translate),
            showLoaderOnConfirm: true,
            preConfirm: async () =>
              await api.put("user/" + params.id, user).catch((err) => ({
                err: true,
                data: { message: err.response.data.message },
              })),
          });
          if (response.value) {
            Swal.fire(
              translate("Edit User", profile.translate),
              response.value.data.message,
              response.value.err ? "error" : "success"
            );
            setGetUser(true);
          }
        }
      } catch (e) {
        Swal.fire(
          translate("Edit User", profile.translate),
          e.message,
          "error"
        );
      }
    },
    [params, user, navigate, profile]
  );

  useEffect(() => {
    const loadUser = async () => {
      if (params.id) {
        const responseUser = await api
          .get(`user/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseUser.data) {
          setLoading(false);
          return navigate("/404");
        }
        setUser(responseUser.data);
      }

      setLoading(false);
    };
    if (getUser) {
      setGetUser(false);
      loadUser();
    }
  }, [getUser, params, navigate]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("User", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Users", profile.language),
            to: "/basicregistration/user/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "User",
              profile.language
            ),
          },
        ]}
        icon={<Icons type="users" size="24" color="#fff" />}
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in User data", profile.translate)}
          <Input
            type="switch"
            item={user}
            setItem={setUser}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveUser(e)}>
            <>
              <Row>
                <Col>
                  <Input
                    type="input"
                    item={user}
                    setItem={setUser}
                    params="name"
                    label={translate("Name", profile.language)}
                    placeholder={translate("Name", profile.language)}
                    capitalize={true}
                    required={true}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    inputType="email"
                    item={user}
                    setItem={setUser}
                    params="username"
                    label="E-mail"
                    placeholder="E-mail"
                    required={true}
                  />
                </Col>
                {user._id && (
                  <Col>
                    <Button
                      type="button"
                      onClick={resendToken}
                      disabled={loading}
                      bg="default"
                      border="default"
                      color="white"
                      style={{ marginTop: "21px", width: "100%" }}
                    >
                      {loading ? (
                        <ReactLoading
                          style={{
                            fill: "#fff",
                            height: "15px",
                            width: "15px",
                            display: "inline-table",
                          }}
                          type="spin"
                          color="#fff"
                          height={19}
                          width={19}
                        />
                      ) : (
                        <Icons type="send" size={15} color="#fff" />
                      )}
                      &nbsp; {translate("Resend Token", profile.language)}
                    </Button>
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <Input
                    type="input"
                    mask="phoneNumber"
                    item={user}
                    setItem={setUser}
                    params="phoneNumber"
                    label={translate("Phone Number", profile.language)}
                    placeholder={translate("Phone Number", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    item={user}
                    setItem={setUser}
                    params="responsibility"
                    label={translate("responsibility", profile.language)}
                    placeholder={translate("Responsibility", profile.language)}
                  />
                </Col>

                <Col>
                  <Content>
                    <label>
                      {translate("Select the role", profile.language)}
                    </label>
                    <CheckboxItems>
                      <Input
                        type="radiobox"
                        label={translate("User", profile.language)}
                        item={user}
                        setItem={setUser}
                        params="roles.0"
                        value="user"
                      />
                      <Input
                        type="radiobox"
                        label={translate("Admin", profile.language)}
                        item={user}
                        setItem={setUser}
                        params="roles.0"
                        value="admin"
                      />
                    </CheckboxItems>
                  </Content>
                </Col>
              </Row>
            </>
            <Separator />
            <Row>
              <Col style={{ alignItems: "center" }}>
                <Button
                  notFull
                  type="submit"
                  bg="default"
                  border="default"
                  color="white"
                >
                  {translate("Save", profile.language)}
                </Button>
              </Col>
            </Row>
          </form>
        </BlockBody>
      </Block>
    </>
  );
}

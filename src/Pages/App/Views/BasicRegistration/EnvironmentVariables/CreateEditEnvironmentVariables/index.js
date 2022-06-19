import { useState } from "react";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../../../../../Components/Button";
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

import { useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../Components/Table/style";

export function CreateEditEnvironmentVariables(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [environmentVariables, setEnvironmentVariables] = useState({
    nome: "",
    dados: [
      {
        idadeIni: "",
        idadeFim: "",
        umidade: "",
        temperatura: "",
        velocidadeAr: "",
        densidade: "",
      },
    ],
    customer: null,
    status: true,
  });

  const [getEnvironmentVariables, setGetEnvironmentVariables] = useState(true);

  const addHandler = () => {
    setEnvironmentVariables({
      ...environmentVariables,
      dados: [
        ...environmentVariables.dados,
        {
          idadeIni:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .idadeIni,
          idadeFim:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .idadeFim,
          umidade:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .umidade,
          temperatura:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .temperatura,
          velocidadeAr:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .velocidadeAr,
          densidade:
            environmentVariables.dados[environmentVariables.dados.length - 1]
              .densidade,
        },
      ],
    });
  };

  const removeHandler = (index) => {
    setEnvironmentVariables((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.dados.splice(index, 1);
      return newState;
    });
  };

  const saveEnvironmentVariables = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(environmentVariables));

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Environment Variables", profile.translate),
          text: translate(
            "Do you want to confirm Environment Variables creation",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Create Environment Variables!",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("environmentvariables", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Environment Variables", profile.translate),
              translate(
                "Error saving Environment Variables",
                profile.translate
              ),
              "error"
            );
          }
          Swal.fire(
            translate("Create Environment Variables", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/environmentvariables/edit/" +
              response.value.data.id,
            {
              replace: true,
            }
          );
          setGetEnvironmentVariables(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Environment Variables", profile.translate),
          text: translate(
            "Do you want to confirm Environment Variables edit",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Edit Environment Variables",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api
              .put("environmentvariables/" + params.id, query)
              .catch((err) => ({
                err: true,
                data: { message: err.response.data.message },
              })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Environment Variables", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          setGetEnvironmentVariables(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Environment Variables", profile.translate),
        translate("Error saving Environment Variables", profile.translate),
        "error"
      );
      setGetEnvironmentVariables(true);
    }
  };

  useEffect(() => {
    const loadEnvironmentVariables = async () => {
      if (params.id) {
        const responseEnvironmentVariables = await api
          .get(`environmentvariables/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseEnvironmentVariables.data) {
          return Swal.fire(
            translate("Edit Environment Variables", profile.translate),
            translate(
              "Error to search EnvironmentVariabless",
              profile.translate
            ),
            "error"
          );
        }

        setEnvironmentVariables(responseEnvironmentVariables.data);
      }
    };
    if (getEnvironmentVariables) {
      setGetEnvironmentVariables(false);
      loadEnvironmentVariables();
    }
  }, [getEnvironmentVariables, params, navigate, profile]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Environment Variables", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Environment Variabless List", profile.language),
            to: "/basicregistration/environmentvariables/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Environment Variables",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome
            type="solid"
            name="thermometer-empty"
            size="24"
            color="text"
          />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Environment Variables data", profile.translate)}
          <Input
            type="switch"
            item={environmentVariables}
            setItem={setEnvironmentVariables}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveEnvironmentVariables(e)}>
            <Row>
              <Col>
                <Input
                  type="input"
                  item={environmentVariables}
                  setItem={setEnvironmentVariables}
                  params="nome"
                  required
                  label={translate(
                    "Environment Variables Name",
                    profile.language
                  )}
                />
              </Col>

              <Col>
                <Input
                  item={environmentVariables}
                  setItem={setEnvironmentVariables}
                  params={`customer`}
                  type="autocomplete"
                  label={translate("Customer", profile.language)}
                  paramsGet={["name"]}
                  paramsLabel={["name"]}
                  select={"name"}
                  model={"customer"}
                  placeholder={translate(
                    "Type the customer name",
                    profile.language
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TableContent style={{ width: "100%" }}>
                  <Header>
                    <tr>
                      <th style={{ width: 50 }}>
                        {translate("index", profile.language)}
                      </th>

                      <th>{translate("Age", profile.language)}*</th>
                      <th>{translate("Humidity(%)", profile.language)}*</th>
                      <th>{translate("Density(m²)", profile.language)}*</th>
                      <th>{translate("Temperature(Cº)", profile.language)}*</th>
                      <th>
                        {translate("Air Velocity(m/s²)", profile.language)}*
                      </th>
                      <th style={{ width: 50 }}></th>
                    </tr>
                  </Header>
                  <Body>
                    {environmentVariables.dados.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={environmentVariables}
                            setItem={setEnvironmentVariables}
                            params={`dados.${index}.idadeFim`}
                            placeholder={``}
                            required
                          />
                        </td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={environmentVariables}
                            setItem={setEnvironmentVariables}
                            params={`dados.${index}.umidade`}
                            placeholder={``}
                            required
                          />
                        </td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={environmentVariables}
                            setItem={setEnvironmentVariables}
                            params={`dados.${index}.temperatura`}
                            placeholder={``}
                            required
                          />
                        </td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={environmentVariables}
                            setItem={setEnvironmentVariables}
                            params={`dados.${index}.velocidadeAr`}
                            placeholder={``}
                            required
                          />
                        </td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={environmentVariables}
                            setItem={setEnvironmentVariables}
                            params={`dados.${index}.densidade`}
                            placeholder={``}
                            required
                          />
                        </td>

                        <td>
                          {index === environmentVariables.dados.length - 1 ? (
                            <Button
                              type="button"
                              bg="success"
                              border="success"
                              color="white"
                              onClick={addHandler}
                            >
                              <FontAwesome
                                type="solid"
                                color="white"
                                name="plus"
                                size={19}
                              />
                            </Button>
                          ) : (
                            <Button
                              bg="danger"
                              border="danger"
                              color="white"
                              type="button"
                              onClick={() => removeHandler(index)}
                            >
                              <FontAwesome
                                type="solid"
                                color="white"
                                name="minus"
                                size={19}
                              />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Body>
                </TableContent>
              </Col>
            </Row>
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
                  &nbsp;
                </Button>
              </Col>
            </Row>
          </form>
        </BlockBody>
      </Block>
    </>
  );
}

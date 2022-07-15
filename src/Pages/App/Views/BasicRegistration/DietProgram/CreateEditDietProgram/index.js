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

export function CreateEditDietProgram(props) {
  const { profile } = useContext(Profile);

  const options = [
    {
      value: "idade",
      label: translate("Age", profile.language),
    },
    {
      value: "peso",
      label: translate("Body Weight", profile.language),
    },
  ];

  const params = useParams();

  const navigate = useNavigate();

  const [dietProgram, setDietProgram] = useState({
    nome: "",
    dietas: [
      {
        dieta: "",
        value: "",
        fim: true,
      },
    ],
    condicao: "idade",
    customer: null,
    status: true,
  });

  const [getDietProgram, setGetDietProgram] = useState(true);

  const [diets, setDiets] = useState([]);

  const addHandler = () => {
    setDietProgram({
      ...dietProgram,
      dietas: [
        {
          dieta: "",
          value: "",
          fim: false,
        },
        ...dietProgram.dietas,
      ],
    });
  };

  const removeHandler = (index) => {
    setDietProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.dietas.splice(index, 1);
      return newState;
    });
  };

  const saveDietProgram = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(dietProgram));

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Diet Program", profile.language),
          text: translate(
            "Do you want to confirm Diet Program creation?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Create Diet Program",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("dietprogram", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Diet Program", profile.language),
              translate("Error saving Diet Program", profile.language),
              "error"
            );
          }
          Swal.fire(
            translate("Create Diet Program", profile.language),
            translate(response.value.data.message, profile.language),
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/dietprogram/edit/" + response.value.data.id,
            {
              replace: true,
            }
          );
          setGetDietProgram(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Diet Program", profile.language),
          text: translate(
            "Do you want to confirm Diet Program edit?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Edit Diet Program",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.put("dietprogram/" + params.id, query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Diet Program", profile.language),
            translate(response.value.data.message, profile.language),
            response.value.err ? "error" : "success"
          );
          setGetDietProgram(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Diet Program", profile.language),
        translate("Error saving Diet Program", profile.language),
        "error"
      );
      setGetDietProgram(true);
    }
  };

  useEffect(() => {
    const loadDietProgram = async () => {
      const responseDiet = await api.post("filter/list", {
        model: "diet",
        select: "nome customer",
        sort: "nome",
      });
      setDiets(responseDiet.data);
      if (params.id) {
        const responseDietProgram = await api
          .get(`dietprogram/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseDietProgram.data) {
          return Swal.fire(
            translate("Edit Diet Program", profile.language),
            translate("Error to search DietPrograms", profile.language),
            "error"
          );
        }

        setDietProgram(responseDietProgram.data);
      }
    };
    if (getDietProgram) {
      setGetDietProgram(false);
      loadDietProgram();
    }
  }, [getDietProgram, params, navigate, profile]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Diet Program", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Diet Program List", profile.language),
            to: "/basicregistration/dietprogram/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Diet Program",
              profile.language
            ),
          },
        ]}
        icon={<FontAwesome type="solid" name="bars" size="24" color="text" />}
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Diet Program data", profile.language)}
          <Input
            type="switch"
            item={dietProgram}
            setItem={setDietProgram}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveDietProgram(e)}>
            <Row>
              <Col>
                <Input
                  type="input"
                  item={dietProgram}
                  setItem={setDietProgram}
                  params="nome"
                  required
                  label={translate("Diet Program Name", profile.language)}
                />
              </Col>

              <Col>
                <Input
                  item={dietProgram}
                  setItem={setDietProgram}
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
              <Col>
                <Input
                  type="select"
                  item={dietProgram}
                  setItem={setDietProgram}
                  params="condicao"
                  label={translate("Condiction", profile.language)}
                  options={options}
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

                      <th>{translate("Condition", profile.language)}</th>
                      <th>{translate("Diet", profile.language)}</th>
                      <th style={{ width: 50 }}></th>
                    </tr>
                  </Header>
                  <Body>
                    {dietProgram.dietas.map(({ fim }, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {fim ? (
                            translate("End", profile.language)
                          ) : (
                            <Input
                              inputType="number"
                              type="inputOnly"
                              item={dietProgram}
                              setItem={setDietProgram}
                              params={`dietas.${index}.value`}
                              placeholder={
                                options.filter(
                                  ({ value }) => value === dietProgram.condicao
                                )[0].label
                              }
                            />
                          )}
                        </td>
                        <td>
                          <Input
                            type="selectOnly"
                            item={dietProgram}
                            setItem={setDietProgram}
                            params={`dietas.${index}.dieta`}
                            placeholder={translate(
                              "Select Diet",
                              profile.language
                            )}
                            options={diets.map(({ _id, nome }) => ({
                              value: _id,
                              label: nome,
                            }))}
                          />
                        </td>
                        <td>
                          {fim ? (
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

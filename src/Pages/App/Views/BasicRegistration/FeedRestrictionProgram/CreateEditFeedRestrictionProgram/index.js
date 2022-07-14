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

export function CreateEditFeedRestrictionProgram(props) {
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

  const [feedRestrictionProgram, setFeedRestrictionProgram] = useState({
    nome: "",
    condicoes: [
      {
        condicao: "",
        value: "",
        ofertado: "",
        fim: true,
      },
    ],
    condicao: "idade",
    customer: "",
    status: true,
  });

  const [getFeedRestrictionProgram, setGetFeedRestrictionProgram] =
    useState(true);

  const addHandler = () => {
    setFeedRestrictionProgram({
      ...feedRestrictionProgram,
      condicoes: [
        {
          condicao: "",
          value: "",
          ofertado: "",
          fim: false,
        },
        ...feedRestrictionProgram.condicoes,
      ],
    });
  };

  const removeHandler = (index) => {
    setFeedRestrictionProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.condicoes.splice(index, 1);
      return newState;
    });
  };

  const saveFeedRestrictionProgram = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(feedRestrictionProgram));

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Feed Restriction Program", profile.language),
          text: translate(
            "Do you want to confirm Feed Restriction Program creation?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Create Feed Restriction Program",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("feedrestrictionprogram", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Feed Restriction Program", profile.language),
              translate(
                "Error saving Feed Restriction Program",
                profile.language
              ),
              "error"
            );
          }
          Swal.fire(
            translate("Create Feed Restriction Program", profile.language),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/feedrestrictionprogram/edit/" +
              response.value.data.id,
            {
              replace: true,
            }
          );
          setGetFeedRestrictionProgram(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Feed Restriction Program", profile.language),
          text: translate(
            "Do you want to confirm Feed Restriction Program edit?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Edit Feed Restriction Program",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api
              .put("feedrestrictionprogram/" + params.id, query)
              .catch((err) => ({
                err: true,
                data: { message: err.response.data.message },
              })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Feed Restriction Program", profile.language),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          setGetFeedRestrictionProgram(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Feed Restriction Program", profile.language),
        translate("Error saving Feed Restriction Program", profile.language),
        "error"
      );
      setGetFeedRestrictionProgram(true);
    }
  };

  useEffect(() => {
    const loadFeedRestrictionProgram = async () => {
      if (params.id) {
        const responseFeedRestrictionProgram = await api
          .get(`feedrestrictionprogram/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseFeedRestrictionProgram.data) {
          return Swal.fire(
            translate("Edit Feed Restriction Program", profile.language),
            translate(
              "Error to search Feed Restriction Programs",
              profile.language
            ),
            "error"
          );
        }

        setFeedRestrictionProgram(responseFeedRestrictionProgram.data);
      }
    };
    if (getFeedRestrictionProgram) {
      setGetFeedRestrictionProgram(false);
      loadFeedRestrictionProgram();
    }
  }, [getFeedRestrictionProgram, params, navigate, profile]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Feed Restriction Program", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Feed Restriction Program List", profile.language),
            to: "/basicregistration/feedrestrictionprogram/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Feed Restriction Program",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="cutlery" size="24" color="text" />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Feed Restriction Program data", profile.language)}
          <Input
            type="switch"
            item={feedRestrictionProgram}
            setItem={setFeedRestrictionProgram}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveFeedRestrictionProgram(e)}>
            <Row>
              <Col>
                <Input
                  type="input"
                  item={feedRestrictionProgram}
                  setItem={setFeedRestrictionProgram}
                  params="nome"
                  required
                  label={translate(
                    "Feed Restriction Program Name",
                    profile.language
                  )}
                />
              </Col>

              <Col>
                <Input
                  item={feedRestrictionProgram}
                  setItem={setFeedRestrictionProgram}
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
                  item={feedRestrictionProgram}
                  setItem={setFeedRestrictionProgram}
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
                      <th>{translate("Offered Feed", profile.language)}</th>
                      <th style={{ width: 50 }}></th>
                    </tr>
                  </Header>
                  <Body>
                    {feedRestrictionProgram.condicoes.map(({ fim }, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {fim ? (
                            translate("End", profile.language)
                          ) : (
                            <Input
                              inputType="number"
                              type="inputOnly"
                              item={feedRestrictionProgram}
                              setItem={setFeedRestrictionProgram}
                              params={`condicoes.${index}.value`}
                              placeholder={
                                options.filter(
                                  ({ value }) =>
                                    value === feedRestrictionProgram.condicao
                                )[0].label
                              }
                            />
                          )}
                        </td>
                        <td>
                          <Input
                            inputType="number"
                            type="inputOnly"
                            item={feedRestrictionProgram}
                            setItem={setFeedRestrictionProgram}
                            params={`condicoes.${index}.ofertado`}
                            placeholder={translate(
                              "Percentage",
                              profile.language
                            )}
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

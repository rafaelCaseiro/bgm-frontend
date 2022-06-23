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
import {
  convertNumberToString,
  translate,
} from "../../../../../../utils/globalFunctions";

import { useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { Tab, Tabs } from "@material-ui/core";
import { Icons } from "../../../../../../Components/Icons";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

export function CreateEditAnimalProfile(props) {
  ChartJS.register(...registerables);

  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [animalProfile, setAnimalProfile] = useState({
    coefEnerg: "",
    taxaProt: "",
    protMatur: "",
    lipProtMatur: "",
    taxaProtAjust: "",
    taxaProtPenas: "",
    protPenasMatur: "",
    coefA: "",
    coefB: "",
    bodyFatA: "",
    bodyFatB: "",
    mineralA: "",
    MineralB: "",
    idadeIni: "",
    pesoIni: "",
    idadeFinal: "",
    pesoFinal: "",
    customer: null,
    status: true,
  });

  const [getAnimalProfile, setGetAnimalProfile] = useState(true);

  const [tab, setTab] = useState(0);

  const [simulations, setSimulations] = useState([]);

  const [simulation, setSimulation] = useState([]);

  const [calibrarion, setCalibrarion] = useState({
    simulation: "",
    conditions: [
      {
        age: "",
        obsWeight: "",
        estWeight: "",
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: translate("", profile.language),
      },
    },
  };

  const add = () => {
    setCalibrarion((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.conditions.push({
        age: "",
        obsWeight: "",
        estWeight: "",
      });
      return newState;
    });
  };

  const remove = (index) => {
    setCalibrarion((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.conditions.splice(index, 1);
      return newState;
    });
  };

  const calibrate = async () => {
    try {
      const query = JSON.parse(JSON.stringify(calibrarion));
      query.conditions = query.conditions.map(({ age, obsWeight }) => ({
        age,
        obsWeight,
        estWeight:
          simulation?.filter((item) => +age === +item.age)[0]?.Weight || 0,
      }));
      const response = await api.post("animalprofile/" + params.id, query);
    } catch (e) {
      Swal.fire(
        translate("Calibrate Animal Profile", profile.translate),
        translate("Error calibrating Animal Profile", profile.translate),
        "error"
      );
    }
  };

  const saveAnimalProfile = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(animalProfile));

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Animal Profile", profile.translate),
          text: translate(
            "Do you want to confirm Animal Profile creation",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Create Animal Profile!",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("animalprofile", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Animal Profile", profile.translate),
              translate("Error saving Animal Profile", profile.translate),
              "error"
            );
          }
          Swal.fire(
            translate("Create Animal Profile", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/animalprofile/edit/" + response.value.data.id,
            {
              replace: true,
            }
          );
          setGetAnimalProfile(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Animal Profile", profile.translate),
          text: translate(
            "Do you want to confirm Animal Profile edit",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Edit Animal Profile",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.put("animalprofile/" + params.id, query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Animal Profile", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          setGetAnimalProfile(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Animal Profile", profile.translate),
        translate("Error saving Animal Profile", profile.translate),
        "error"
      );
      setGetAnimalProfile(true);
    }
  };

  useEffect(() => {
    const loadAnimalProfile = async () => {
      if (params.id) {
        const responseAnimalProfile = await api
          .get(`animalprofile/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseAnimalProfile.data) {
          return Swal.fire(
            translate("Edit Animal Profile", profile.translate),
            translate("Error to search AnimalProfiles", profile.translate),
            "error"
          );
        }
        setAnimalProfile(responseAnimalProfile.data);
        const responseSimulations = await api.post("filter/list", {
          model: "simulation",
          sort: "nome",
          select: "nome customer",
        });
        setSimulations(responseSimulations.data);
      }
    };
    if (getAnimalProfile) {
      setGetAnimalProfile(false);
      loadAnimalProfile();
    }
  }, [getAnimalProfile, params, navigate, profile]);

  useEffect(() => {
    const getSimulation = async () => {
      const response = await api.get("simulation/" + calibrarion.simulation);
      setSimulation(response.data.response.individuo);
    };
    if (calibrarion.simulation) {
      getSimulation();
    }
  }, [calibrarion.simulation]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Animal Profile", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Animal Profiles List", profile.language),
            to: "/basicregistration/animalprofile/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Animal Profile",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="kiwi-bird" size="24" color="text" />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Animal Profile", profile.translate)}
          <Input
            type="switch"
            item={animalProfile}
            setItem={setAnimalProfile}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <Tabs
            value={tab}
            indicatorColor="default"
            textColor="default"
            variant="scrollable"
            scrollButtons="on"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={translate("Data", profile.language)} />
            <Tab label={translate("Calibration", profile.language)} />
          </Tabs>
          {tab === 0 && (
            <form onSubmit={(e) => saveAnimalProfile(e)}>
              <Row>
                <Col>
                  <Input
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="nome"
                    required
                    label={translate("Animal Profile Name", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    item={animalProfile}
                    setItem={setAnimalProfile}
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
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="pesoIni"
                    required
                    label={translate("Peso Initial (g)", profile.language)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="taxaProt"
                    required
                    label={translate(
                      "Protein dep. Ratio (d)",
                      profile.language
                    )}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="protMatur"
                    required
                    label={translate("Maturity Protein (g)", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="lipProtMatur"
                    required
                    label={translate(
                      "Lipid / Protein ratio at Maturity",
                      profile.language
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="taxaProtPenas"
                    required
                    label={translate(
                      "Feather Protein dep. Ratio (d)",
                      profile.language
                    )}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="protPenasMatur"
                    required
                    label={translate(
                      "Feather Maturity Protein (g)",
                      profile.language
                    )}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="coefA"
                    required
                    label={translate(
                      "Coef. a (Water / Protein)",
                      profile.language
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="coefB"
                    required
                    label={translate(
                      "Coef. b (Water / Protein)",
                      profile.language
                    )}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="mineralA"
                    required
                    label={translate("Mineral a (g)", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    inputType="number"
                    type="input"
                    item={animalProfile}
                    setItem={setAnimalProfile}
                    params="MineralB"
                    required
                    label={translate("Mineral b (g)", profile.language)}
                  />
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
          )}
          {tab === 1 && (
            <>
              <Row>
                <Col size={1}>
                  <Input
                    type="select"
                    label={translate("Simulation", profile.language)}
                    placeholder={translate(
                      "Select Simulation",
                      profile.language
                    )}
                    item={calibrarion}
                    setItem={setCalibrarion}
                    params="simulation"
                    options={simulations
                      .filter(({ customer }) =>
                        animalProfile.customer
                          ? customer === animalProfile.customer || !customer
                          : true
                      )
                      .map(({ _id, nome }) => ({
                        value: _id,
                        label: nome,
                      }))}
                  />
                </Col>
                <Col size={3}>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  {calibrarion.conditions.map((item, index) => (
                    <Row key={index}>
                      <Col>
                        <Input
                          type="inputOnly"
                          placeholder={translate("Age", profile.language)}
                          item={calibrarion}
                          setItem={setCalibrarion}
                          params={`conditions.${index}.age`}
                          disabled={!calibrarion.simulation}
                        />
                      </Col>
                      <Col>
                        <Input
                          type="inputOnly"
                          placeholder={translate(
                            "Observed Live Weight (g)",
                            profile.language
                          )}
                          item={calibrarion}
                          setItem={setCalibrarion}
                          params={`conditions.${index}.obsWeight`}
                          disabled={!calibrarion.simulation}
                        />
                      </Col>
                      <Col>
                        <Input
                          type="inputOnly"
                          placeholder={translate(
                            "Estimated Live Weight (g)",
                            profile.language
                          )}
                          item={calibrarion}
                          setItem={setCalibrarion}
                          params={`conditions.${index}.estWeight`}
                          disabled={true}
                          value={convertNumberToString(
                            simulation?.filter(
                              ({ age }) => age === +item.age
                            )[0]?.Weight || 0,
                            0
                          )}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        {index === calibrarion.conditions.length - 1 && (
                          <Button
                            bg="success"
                            color="white"
                            border="success"
                            style={{ width: 50 }}
                            onClick={add}
                          >
                            <Icons type="plus" color="white" size="19" />
                          </Button>
                        )}

                        {index > 0 && (
                          <Button
                            bg="danger"
                            color="white"
                            border="danger"
                            style={{ width: 50 }}
                            onClick={() => remove(index)}
                          >
                            <Icons type="trash" color="white" size="19" />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Line
                options={options}
                data={{
                  labels: [0, ...calibrarion.conditions.map(({ age }) => age)],
                  datasets: [
                    {
                      label: translate(
                        "Observed Live Weight (g)",
                        profile.language
                      ),
                      data: [
                        0,
                        ...calibrarion.conditions.map(
                          ({ obsWeight }) => obsWeight
                        ),
                      ],
                      borderColor: "rgb(9, 64, 148)",
                      backgroundColor: "rgba(9, 64, 148, 0.5)",
                    },
                    {
                      label: translate(
                        "Estimated Live Weight (g)",
                        profile.language
                      ),
                      data: [
                        0,
                        ...calibrarion.conditions.map(
                          (item) =>
                            simulation?.filter(
                              ({ age }) => age === +item.age
                            )[0]?.Weight || 0
                        ),
                      ],
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
              <Separator />
              <Row>
                <Col style={{ alignItems: "center" }}>
                  <Button
                    notFull
                    type="button"
                    bg="default"
                    border="default"
                    color="white"
                    onClick={calibrate}
                  >
                    {translate("Calibrate", profile.language)}
                    &nbsp;
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </BlockBody>
      </Block>
    </>
  );
}

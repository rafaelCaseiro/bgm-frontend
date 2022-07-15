import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FontAwesome } from "../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../Components/SubHeader";
import { Block, BlockBody, Col, Row, Separator } from "../../../../../styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { InputData } from "./InputData";
import { api } from "../../../../../services/api";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../Components/Table/style";
import Profile from "../../../../../contexts/profile";
import Swal from "sweetalert2";
import {
  convertNumberToString,
  translate,
} from "../../../../../utils/globalFunctions";
import { Button } from "../../../../../Components/Button";
import Loading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Input } from "../../../../../Components/Input";

export function CreateEditSimulation(props) {
  ChartJS.register(...registerables);
  const { profile } = useContext(Profile);

  const tabRef = useRef();

  const params = useParams();

  const navigate = useNavigate();

  const [tab, setTab] = useState(0);

  const [tabKey, setTabKey] = useState("");

  const [customers, setCustomers] = useState([]);

  const [dietPrograms, setDietPrograms] = useState([]);

  const [environmentVariables, setEnvironmentVariables] = useState([]);

  const [feedRestrictionPrograms, setFeedRestrictionPrograms] = useState([]);

  const [animalProfiles, setAnimalProfiles] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [loadingSave, setLoadingSave] = useState(false);

  const [getData, setGetData] = useState(true);

  const [isGenerated, setIsGenerated] = useState(false);

  const [input, setInput] = useState({
    nome: "",
    simulationType: "feedFormulator",
    outputType: "basic",
    outputItems: {
      bodyComposition: {
        type: "custom",
        label: "Body composition",
        checked: true,
        showColumns: false,
        graphData: "Weight",
        columns: {
          Weight: { label: "Weight (g)", checked: true, decimals: 2 },
          Feather: { label: "Feather weight (g)", checked: true, decimals: 2 },
          ProteinBody: {
            label: "Body protein (g)",
            checked: true,
            decimals: 2,
          },
          ProteinFeather: {
            label: "Feather protein (g)",
            checked: true,
            decimals: 2,
          },
          Lipid: { label: "Lipid (g)", checked: true, decimals: 2 },
          Water: { label: "Water (g)", checked: true, decimals: 2 },
          Ash: { label: "Ash (g)", checked: true, decimals: 2 },
        },
      },
      geneticPotencial: {
        type: "custom",
        label: "Genetic Potential",
        checked: true,
        showColumns: false,
        graphData: "DesiredProteinDepositionBody",
        columns: {
          DesiredProteinDepositionBody: {
            label: "Potential of body protein dep. (g)",
            checked: true,
            decimals: 2,
          },
          DesiredProteinDepositionFeather: {
            label: "Potential of feather protein dep. (g)",
            checked: true,
            decimals: 2,
          },
          DesiredLipidDeposition: {
            label: "Potential of lipid dep. (g)",
            checked: true,
            decimals: 2,
          },
        },
      },
      energyPartititoning: {
        type: "custom",
        label: "Energy Partitioning",
        checked: true,
        showColumns: false,
        graphData: "EERequired",
        columns: {
          EERequired: {
            label: "EE requirement (kJ)",
            checked: true,
            decimals: 2,
          },
          EEforMaintenance: {
            label: "EE for maintenance (kJ)",
            checked: true,
            decimals: 2,
          },
          EEforProteinDepositionReq: {
            label: "EE for protein deposition (kJ)",
            checked: true,
            decimals: 2,
          },
          EEforLipidDepositionReq: {
            label: "EE for lipids deposition (kJ)",
            checked: true,
            decimals: 2,
          },
        },
      },
      aminoAcidRequirementsMg: {
        type: "custom",
        label: "Amino Acids Requirements (mg)",
        checked: true,
        showColumns: false,
        graphData: "DesiredLysrequired",
        columns: {
          DesiredLysrequired: { label: "Lysine", checked: true, decimals: 2 },
          DesiredMetrequired: {
            label: "Methionine",
            checked: true,
            decimals: 2,
          },
          DesiredMetCysrequired: {
            label: "Met + Cys",
            checked: true,
            decimals: 2,
          },
          DesiredThrrequired: {
            label: "Threonine",
            checked: true,
            decimals: 2,
          },
          DesiredTrprequired: {
            label: "Tryptophan",
            checked: true,
            decimals: 2,
          },
          DesiredIlerequired: {
            label: "Isoleucine",
            checked: true,
            decimals: 2,
          },
          DesiredLeurequired: { label: "Leucine", checked: true, decimals: 2 },
          DesiredValrequired: { label: "Valine", checked: true, decimals: 2 },
          DesiredPheTyrrequired: {
            label: "Phe + Tyr",
            checked: true,
            decimals: 2,
          },
          DesiredHisrequired: {
            label: "Histidine",
            checked: true,
            decimals: 2,
          },
          DesiredArgrequired: { label: "Arginine", checked: true, decimals: 2 },
        },
      },
      aminoAcidRequirementsPercent: {
        type: "custom",
        label: "Amino Acid Requirements (% diet)",
        checked: true,
        showColumns: false,
        graphData: "DesiredLysrequiredDiet",
        columns: {
          DesiredLysrequiredDiet: {
            label: "Lysine",
            checked: true,
            decimals: 2,
          },
          DesiredMetrequiredDiet: {
            label: "Methionine",
            checked: true,
            decimals: 2,
          },
          DesiredMetCysrequiredDiet: {
            label: "Met + Cys",
            checked: true,
            decimals: 2,
          },
          DesiredThrrequiredDiet: {
            label: "Threonine",
            checked: true,
            decimals: 2,
          },
          DesiredTrprequiredDiet: {
            label: "Tryptophan",
            checked: true,
            decimals: 2,
          },
          DesiredIlerequiredDiet: {
            label: "Isoleucine",
            checked: true,
            decimals: 2,
          },
          DesiredLeurequiredDiet: {
            label: "Leucine",
            checked: true,
            decimals: 2,
          },
          DesiredValrequiredDiet: {
            label: "Valine",
            checked: true,
            decimals: 2,
          },
          DesiredPheTyrrequiredDiet: {
            label: "Phe + Tyr",
            checked: true,
            decimals: 2,
          },
          DesiredHisrequiredDiet: {
            label: "Histidine",
            checked: true,
            decimals: 2,
          },
          DesiredArgrequiredDiet: {
            label: "Arginine",
            checked: true,
            decimals: 2,
          },
        },
      },
      macrominerals: {
        type: "custom",
        label: "Macrominerals",
        checked: true,
        showColumns: false,
        graphData: "STTD_P_req",
        columns: {
          STTD_P_req: {
            label: "Standardized Ileal Digestible Phosphorus (mg)",
            checked: true,
            decimals: 2,
          },
          STTD_P_req_Porc: {
            label: "Standardized Ileal Digestible Phosphorus (%)",
            checked: true,
            decimals: 2,
          },
          total_Ca_req: {
            label: "Total Calcium (mg)",
            checked: true,
            decimals: 2,
          },
          total_Ca_req_Porc: {
            label: "Total Calcium (%)",
            checked: true,
            decimals: 2,
          },
        },
      },
      performance: {
        type: "custom",
        label: "Performance",
        checked: true,
        showColumns: false,
        graphData: "Weight",
        columns: {
          Weight: { label: "Body Weight (g)", checked: true, decimals: 2 },
          Gain: { label: "Body Weight Gain (g)", checked: true, decimals: 2 },
          DesiredFIValue: {
            label: "Desired Feed Intake (g)",
            checked: true,
            decimals: 2,
          },
          FeedIntake: {
            label: "Actual Feed Intake (g)",
            checked: true,
            decimals: 2,
          },
          FeedConversion: {
            label: "Feed Conversion (g)",
            checked: true,
            decimals: 2,
          },
        },
      },
      cutYield: {
        type: "custom",
        label: "Cut yield",
        checked: true,
        showColumns: false,
        graphData: "Weight",
        columns: {
          Weight: { label: "Body Weight (g)", checked: true, decimals: 2 },
          Breast: { label: "Breast (g)", checked: true, decimals: 2 },
          Leg: { label: "Leg (g)", checked: true, decimals: 2 },
          Wing: { label: "Wing (g)", checked: true, decimals: 2 },
        },
      },
      heatProduction: {
        type: "custom",
        label: "Heat Production",
        checked: true,
        showColumns: false,
        graphData: "TotalHeatLossMax",
        columns: {
          TotalHeatLossMax: {
            label: "maximum Heat Production (KJ)",
            checked: true,
            decimals: 2,
          },
          TotalHeatLossMin: {
            label: "minimum Heat Production (KJ)",
            checked: true,
            decimals: 2,
          },
          HeatProduction1: {
            label: "Heat Production (KJ)",
            checked: true,
            decimals: 2,
          },
        },
      },
      performancePotxReal: {
        type: "custom",
        label: "Performance: Potential vs. Real",
        checked: true,
        showColumns: false,
        graphData: "DesiredProteinDepositionBody",
        columns: {
          DesiredProteinDepositionBody: {
            label: "desired Protein Deposition (g)",
            checked: true,
            decimals: 2,
          },
          ProteinDeposition: {
            label: "actual Protein Deposition (g)",
            checked: true,
            decimals: 2,
          },
          DesiredLipidDeposition: {
            label: "desired Lipid Deposition (g)",
            checked: true,
            decimals: 2,
          },
          LipidDeposition: {
            label: "actual Lipid Deposition (g)",
            checked: true,
            decimals: 2,
          },
        },
      },
      basicPerformance: {
        type: "basic",
        label: "Performance",
        checked: true,
        showColumns: false,
        graphData: "Weight",
        columns: {
          Weight: { label: "Body Weight (g)", checked: true, decimals: 2 },
          Gain: { label: "Body Weight Gain (g)", checked: true, decimals: 2 },
          FeedIntake: {
            label: "actual Feed Intake (g)",
            checked: true,
            decimals: 2,
          },
          FeedConversion: {
            label: "Feed Conversion Ratio (g)",
            checked: true,
            decimals: 2,
          },
        },
      },
      requeriment: {
        type: "basic",
        label: "Requirement",
        checked: true,
        showColumns: false,
        graphData: "EERequired",
        columns: {
          EERequired: {
            label: "Effective Energy (Mj)",
            checked: true,
            decimals: 2,
          },
          DesiredLysrequiredDiet: {
            label: "Lysine (%)",
            checked: true,
            decimals: 2,
          },
          DesiredMetCysrequiredDiet: {
            label: "Met + Cys (%)",
            checked: true,
            decimals: 2,
          },
          DesiredThrrequiredDiet: {
            label: "Threonine (%)",
            checked: true,
            decimals: 2,
          },
          DesiredTrprequiredDiet: {
            label: "Tryptophan (%)",
            checked: true,
            decimals: 2,
          },
          DesiredArgrequiredDiet: {
            label: "Arginine (%)",
            checked: true,
            decimals: 2,
          },
          DesiredValrequiredDiet: {
            label: "Valine (%)",
            checked: true,
            decimals: 2,
          },
          STTD_P_req_Porc: {
            label: "Standardized Ileal Digestible Phosphorus (%)",
            checked: true,
            decimals: 2,
          },
          total_Ca_req_Porc: {
            label: "Total Calcium (%)",
            checked: true,
            decimals: 2,
          },
        },
      },
    },
    outputValue: "individuo",
    condition: "age",
    hpStatus: 1,
    pelletFeed: "Mash",
    initialWeight: "",
    feedDigestiblity: 1,
    healthProblem: "coccidia",
    start: 1,
    end: "",
    diet: [],
    ingredients: [],
    customer: "",
    population: 1,
  });

  const [response, setResponse] = useState({});

  const [simulations, setSimulations] = useState([]);

  const [comparison, setComparison] = useState({
    individuo: [],
    populacao: [],
  });

  const saveSimulation = async (e) => {
    try {
      setLoadingSave(true);

      const query = JSON.parse(JSON.stringify(input));
      if (!input.nome) {
        setLoadingSave(false);
        return Swal.fire(
          translate("Error", profile.language),
          translate("Type the simulation name", profile.language),
          "error"
        );
      }
      if (!input.customer) {
        query.customer = null;
      }
      query.response = response;
      if (params.id) {
        const responseSimulation = await Swal.fire({
          title: translate("Edit Simulation", profile.language),
          text: translate(
            "Do you want to confirm Simulation edit?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),

          confirmButtonText: translate(
            "Yes, Edit Simulation",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.put("simulation/" + params.id, query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Simulation", profile.language),
            translate(responseSimulation.value.data.message, profile.language),
            responseSimulation.value.err ? "error" : "success"
          );

          setGetData(true);
        }
      } else {
        const responseSimulation = await Swal.fire({
          title: translate("Create Simulation", profile.language),
          text: translate(
            "Do you want to confirm Simulation creation?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Create Simulation",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("simulation", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });

        if (responseSimulation.value) {
          Swal.fire(
            translate("Create Simulation", profile.language),
            translate(responseSimulation.value.data.message, profile.language),
            responseSimulation.value.err ? "error" : "success"
          );
          navigate(
            "/simulator/simulation/edit/" + responseSimulation.value.data.id,
            {
              replace: true,
            }
          );

          setGetData(true);
        }
      }
      setLoadingSave(false);
    } catch (e) {
      console.log(e);
      Swal.fire(
        translate("Save Simulation", profile.language),
        translate("Error saving Simulation", profile.language),
        "error"
      );
      setLoadingSave(false);
    }
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: tabKey
          ? translate(input.outputItems[tabKey]?.label, profile.language)
          : "",
      },
    },
  };

  const simulate = useCallback(
    async (input, e) => {
      e?.preventDefault();
      try {
        setLoading(true);
        const response = await api.post("simulate", input);
        setResponse(response.data);
        setLoading(false);
        setIsGenerated(true);
        setLoadingData(false);
        window.scrollTo(0, 0);
        tabRef?.current?.click();
      } catch (e) {
        Swal.fire(
          translate("Simulate", profile.language),
          translate(e.message, profile.language),
          "error"
        );
      }
    },
    [profile.language]
  );

  const comparisonHandler = async (e) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.outputItems[tabKey].comparison = e.target.value;
      return newState;
    });
    const responseSimulation = await api.get("simulation/" + e.target.value);
    setComparison(responseSimulation.data.response);
  };

  useEffect(() => {
    const getInitData = async () => {
      setLoadingData(true);
      const responseDietProgram = await api.post("filter/list", {
        model: "dietProgram",
        sort: "nome",
        select: "nome customer dietas",
        populate: { path: "dietas.dieta", select: "nome" },
      });
      setDietPrograms(responseDietProgram.data);
      const responseCustomer = await api.post("filter/list", {
        model: "customer",
        sort: "name",
        select: "name",
      });
      setCustomers(responseCustomer.data);
      const responseEnvironmentVariables = await api.post("filter/list", {
        model: "environmentVariables",
        sort: "nome",
        select: "nome customer",
      });
      setEnvironmentVariables(responseEnvironmentVariables.data);
      const responseFeedRestrictionProgram = await api.post("filter/list", {
        model: "feedRestrictionProgram",
        sort: "nome",
        select: "nome customer",
      });
      setFeedRestrictionPrograms(responseFeedRestrictionProgram.data);
      const responseAnimalProfile = await api.post("filter/list", {
        model: "animalProfile",
        sort: "nome",
        select: "nome customer",
      });
      setAnimalProfiles(responseAnimalProfile.data);
      const responseIngredient = await api.post("filter/list", {
        model: "ingredient",
        sort: "nome",
        select: "nome customer",
      });
      setIngredients(responseIngredient.data);
      const responseSimulations = await api.post("filter/list", {
        model: "simulation",
        sort: "nome",
        select: "nome customer",
      });
      setSimulations(responseSimulations.data);
      if (params.id) {
        const responseSimulation = await api.get("simulation/" + params.id);
        setInput(responseSimulation.data);
        await simulate(responseSimulation.data);
      }

      setLoadingData(false);
    };
    if (getData) {
      setGetData(false);
      getInitData();
    }
  }, [getData, params.id, simulate]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate(
          params.id ? "Edit Simulation" : "New Simulation",
          profile.language
        )}
        route="simulator"
        breadcrumbs={[
          { label: translate("Simulator", profile.language) },
          {
            label: translate(
              params.id ? "Edit Simulation" : "New Simulation",
              profile.language
            ),
          },
        ]}
        otherButtons={
          isGenerated
            ? [
                <Button
                  onClick={saveSimulation}
                  type="button"
                  bg="default"
                  border="default"
                  color="white"
                  style={{ width: "auto" }}
                >
                  {loadingSave ? (
                    <>
                      <Loading
                        style={{
                          fill: "#fff",
                          height: "15px",
                          width: "13px",
                          display: "inline-table",
                        }}
                        type="spin"
                        color="#fff"
                        height={19}
                        width={19}
                      />
                      &nbsp; {translate("Wait", profile.language)}...
                    </>
                  ) : (
                    <>
                      {translate("Save Simulation", profile.language)}
                      &nbsp;{" "}
                      <FontAwesome
                        type="solid"
                        name="save"
                        size="12"
                        color="white"
                      />
                    </>
                  )}
                </Button>,
              ]
            : null
        }
        icon={
          <FontAwesome type="solid" name="area-chart" size={15} color="text" />
        }
      />
      <Block>
        <BlockBody>
          {loadingData ? (
            <Loading
              style={{
                fill: "#094093",
                height: "24px",
                width: "24px",
                display: "inline-table",
              }}
              type="spin"
              color="#fff"
              height={24}
              width={24}
            />
          ) : (
            <>
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
                <Tab label={translate("Input", profile.language)} />
                {Object.keys(input.outputItems)
                  .filter(
                    (key) =>
                      input.outputItems[key].type === input.outputType &&
                      input.outputItems[key].checked
                  )
                  .map((key, index) => (
                    <Tab
                      ref={index === 0 ? tabRef : null}
                      label={translate(
                        input.outputItems[key].label,
                        profile.language
                      )}
                      onClick={() => setTabKey(key)}
                      style={!isGenerated ? { display: "none" } : null}
                    />
                  ))}
              </Tabs>
              {tab === 0 ? (
                <form onSubmit={(e) => simulate(input, e)}>
                  <InputData
                    {...{
                      input,
                      setInput,
                      profile,
                      customers,
                      environmentVariables,
                      dietPrograms,
                      feedRestrictionPrograms,
                      animalProfiles,
                      ingredients,
                      loading,
                      isGenerated,
                    }}
                  />{" "}
                </form>
              ) : (
                <>
                  <Row>
                    <Col>
                      <Input
                        type="select"
                        label={translate("Graph Data", profile.language)}
                        placeholder={translate(
                          "Select Graph Data",
                          profile.language
                        )}
                        item={input}
                        setItem={setInput}
                        params={`outputItems.${tabKey}.graphData`}
                        options={Object.entries(
                          input.outputItems[tabKey].columns
                        ).map(([key, value]) => ({
                          value: key,
                          label: translate(value.label, profile.language),
                        }))}
                      />
                    </Col>
                    <Col>
                      <Input
                        type="select"
                        label={translate("Comparison", profile.language)}
                        placeholder={translate(
                          "Select Simulation",
                          profile.language
                        )}
                        item={input}
                        setItem={setInput}
                        params={`outputItems.${tabKey}.comparison`}
                        onChange={comparisonHandler}
                        options={simulations
                          .filter(({ customer }) =>
                            input.customer
                              ? customer === input.customer._id || !customer
                              : true
                          )
                          .map(({ _id, nome }) => ({
                            value: _id,
                            label: nome,
                          }))}
                      />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>

                  {isGenerated && (
                    <Line
                      options={options}
                      data={{
                        labels: response.individuo
                          .filter(({ age }) => age >= input.start)
                          .map(({ age }) => age),
                        datasets: [
                          {
                            label: translate("Individual", profile.language),
                            data: response.individuo
                              .filter(({ age }) => age >= input.start)
                              .map((item) =>
                                input.outputItems[tabKey]?.graphData
                                  ? item[input.outputItems[tabKey]?.graphData]
                                  : 0
                              ),
                            borderColor: "rgb(9, 64, 148)",
                            backgroundColor: "rgba(9, 64, 148, 0.5)",
                          },
                          {
                            label: translate("Population", profile.language),
                            data: response.populacao
                              ? response.populacao
                                  .filter(({ age }) => age >= input.start)
                                  .map((item) =>
                                    input.outputItems[tabKey]?.graphData
                                      ? item[
                                          input.outputItems[tabKey]?.graphData
                                        ]
                                      : 0
                                  )
                              : [],
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                          },
                          ...(input.outputItems[tabKey].comparison
                            ? [
                                {
                                  label: translate(
                                    "Individual - Comparison",
                                    profile.language
                                  ),
                                  data: comparison.individuo
                                    .filter(({ age }) => age >= input.start)
                                    .map((item) =>
                                      input.outputItems[tabKey]?.graphData
                                        ? item[
                                            input.outputItems[tabKey]?.graphData
                                          ]
                                        : 0
                                    ),
                                  borderColor: "rgb(50, 204, 148)",
                                  backgroundColor: "rgba(50, 204, 148, 0.5)",
                                },
                                {
                                  label: translate(
                                    "Population - Comparison",
                                    profile.language
                                  ),
                                  data: comparison.populacao
                                    ? comparison.populacao
                                        .filter(({ age }) => age >= input.start)
                                        .map((item) =>
                                          input.outputItems[tabKey]?.graphData
                                            ? item[
                                                input.outputItems[tabKey]
                                                  ?.graphData
                                              ]
                                            : 0
                                        )
                                    : [],
                                  borderColor: "rgb(555, 60, 60)",
                                  backgroundColor: "rgba(555, 60, 60, 0.5)",
                                },
                              ]
                            : []),
                        ],
                      }}
                    />
                  )}
                  <Separator style={{ marginTop: 20 }} />
                  <TableContent>
                    <Header>
                      <tr>
                        <th>{translate("Day", profile.language)}</th>
                        {Object.keys(input.outputItems[tabKey].columns)
                          .filter(
                            (key) =>
                              input.outputItems[tabKey].columns[key].checked
                          )
                          .map((key) => (
                            <th>
                              {translate(
                                input.outputItems[tabKey].columns[key].label,
                                profile.language
                              )}
                            </th>
                          ))}
                      </tr>
                    </Header>
                    <Body>
                      {response[input.outputValue]
                        ?.filter(({ age }) => age >= input.start)
                        .map((item) => (
                          <tr key={item.age}>
                            <td>{item.age}</td>
                            {Object.keys(input.outputItems[tabKey].columns)
                              .filter(
                                (key) =>
                                  input.outputItems[tabKey].columns[key].checked
                              )
                              .map((key) => (
                                <td>
                                  {convertNumberToString(
                                    item[key],
                                    input.outputItems[tabKey].columns[key]
                                      .decimals
                                  )}
                                </td>
                              ))}
                          </tr>
                        ))}
                    </Body>
                  </TableContent>
                </>
              )}
            </>
          )}
        </BlockBody>
      </Block>
    </>
  );
}

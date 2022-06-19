import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../Components/SubHeader";
import { Block, BlockBody } from "../../../../../styles";
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

export function CreateEditSimulation(props) {
  const { profile } = useContext(Profile);

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

  const [getData, setGetData] = useState(true);

  const [isGenerated, setIsGenerated] = useState(false);

  const [input, setInput] = useState({
    simulationType: "feedFormulator",
    outputType: "basic",
    outputItems: {
      bodyComposition: {
        type: "custom",
        label: "Body composition",
        checked: true,
        showColumns: false,
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
            label: "Triptophan",
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
    initialWeight: "40",
    feedDigestiblity: 1,
    healthProblem: "coccidia",
    start: 1,
    end: 42,
    diet: [
      {
        PelletFeed: "Mash",
        Phytase: "",
        ingredients: [
          1.0165578181818182, 0.1, 0.1, 65.07303172727273, 29.665275090909088,
          0.29277609090909085, 0.2837571818181818, 0.2701740909090909,
          0.8734124545454546, 1.8525732727272728, 0.4724424545454546,
        ],
      },
    ],
    ingredients: [
      "629a50003386c5b7068a2b77",
      "629a50003386c5b7068a2b8d",
      "629a50003386c5b7068a2b8c",
      "629a50003386c5b7068a2b72",
      "629a50003386c5b7068a2b83",
      "629a50003386c5b7068a2b66",
      "629a50003386c5b7068a2b58",
      "629a50003386c5b7068a2b67",
      "629a50003386c5b7068a2b53",
      "629a50003386c5b7068a2b60",
      "629a50003386c5b7068a2b7d",
    ],
    customer: "",
    population: 1,
  });

  const [response, setResponse] = useState({});

  const simulate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("simulate", input);
      setResponse(response.data);
      setLoading(false);
      setIsGenerated(true);
    } catch (e) {
      Swal.fire(
        translate("Simulate", profile.translate),
        translate(e.message, profile.translate),
        "error"
      );
    }
  };

  useEffect(() => {
    const getInitData = async () => {
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
      setLoadingData(false);
    };
    if (loadingData) {
      setGetData(false);
      getInitData();
    }
  }, [loadingData]);

  useEffect(() => {
    console.log(input.outputValue);
    console.log(response[input.outputValue]);
  }, [input.outputValue, response]);

  /*  useEffect(() => {
    const simulate = async () => {
      const data = {
        initialAge: 1,
        finalAge: 42,
        InitialBWsimulation: 44,
        MatureLipidToProtein: 1.8,
        aW: 2.001,
        bW: 0.909,
        MatureProteinBody: 1380,
        GompertzProteinBody: 0.041,
        MatureProteinFeather: 217,
        EEforMaintenanceK: 1.63,
        MaintAdjust: 1,
        GompertzProteinFeather: 0.039,
        AdustFI: 1,
        diet: [
          {
            initialAge: 1,
            finalAge: 14,
            EEnergy: 11.34,
            CP: 23,
            Lys: 1.4,
            Met: 0.741,
            MetCys: 1.042,
            Thr: 0.941,
            Trp: 0.26,
            Ile: 0.883,
            Leu: 1.724,
            Val: 0.943,
            Phe: 1.022,
            Tyr: 2,
            His: 0.543,
            Arg: 1.426,
            WHC: 0.153,
            MEc: 3.05,
            PelletFeed: 1,
            FinesFeed: 0,
            NPP: 0.45,
            Ca: 0.9,
            Phytase: 500,
            PP: 0.24,
            DM: 90.14,
          },
          {
            initialAge: 15,
            finalAge: 28,
            CP: 21,
            Lys: 1.25,
            Met: 0.667,
            MetCys: 0.946,
            Thr: 0.836,
            Trp: 0.235,
            Ile: 0.801,
            Leu: 1.609,
            Val: 0.861,
            Phe: 0.932,
            Tyr: 2,
            His: 0.5,
            Arg: 1.288,
            WHC: 0.154,
            MEc: 3.15,
            PelletFeed: 1,
            FinesFeed: 0,
            NPP: 0.45,
            Ca: 0.9,
            Phytase: 500,
            PP: 0.23,
            DM: 90.19,
          },
          {
            initialAge: 29,
            finalAge: 42,
            CP: 19.3,
            Lys: 1.2,
            Met: 0.848,
            MetCys: 1.104,
            Thr: 0.844,
            Trp: 0.216,
            Ile: 0.717,
            Leu: 1.488,
            Val: 0.785,
            Phe: 0.84,
            Tyr: 2,
            His: 0.455,
            Arg: 1.147,
            WHC: 0.154,
            MEc: 3.25,
            PelletFeed: 1,
            FinesFeed: 0,
            NPP: 0.45,
            Ca: 0.9,
            Phytase: 500,
            PP: 0.22,
            DM: 90.29,
          },
        ],
        environmentVariables: [
          { Temp: 32, Umity: 41.6, Density: 12, Speedair: 1.5 },
          { Temp: 32, Umity: 41.4, Density: 12, Speedair: 1.5 },
          { Temp: 32, Umity: 39.6, Density: 12, Speedair: 1.5 },
          { Temp: 31, Umity: 41.7, Density: 12, Speedair: 1.5 },
          { Temp: 31, Umity: 42.4, Density: 12, Speedair: 1.5 },
          { Temp: 31, Umity: 42.2, Density: 12, Speedair: 1.5 },
          { Temp: 29, Umity: 41.3, Density: 12, Speedair: 1.5 },
          { Temp: 29, Umity: 40.2, Density: 12, Speedair: 1.5 },
          { Temp: 29, Umity: 40.4, Density: 12, Speedair: 1.5 },
          { Temp: 28, Umity: 40.9, Density: 12, Speedair: 1.5 },
          { Temp: 28, Umity: 40.7, Density: 12, Speedair: 1.5 },
          { Temp: 27, Umity: 39.3, Density: 12, Speedair: 1.5 },
          { Temp: 27, Umity: 37.1, Density: 12, Speedair: 1.5 },
          { Temp: 27, Umity: 39.3, Density: 12, Speedair: 1.5 },
          { Temp: 26, Umity: 39.8, Density: 12, Speedair: 1.5 },
          { Temp: 26, Umity: 41.7, Density: 12, Speedair: 1.5 },
          { Temp: 26, Umity: 43.1, Density: 12, Speedair: 1.5 },
          { Temp: 25, Umity: 44.3, Density: 12, Speedair: 1.5 },
          { Temp: 25, Umity: 46.1, Density: 12, Speedair: 1.5 },
          { Temp: 25, Umity: 47, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 47.8, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 48.4, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 47.4, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 47.2, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 49.7, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 49.2, Density: 12, Speedair: 1.5 },
          { Temp: 24, Umity: 49.3, Density: 12, Speedair: 1.5 },
          { Temp: 23, Umity: 51.7, Density: 12, Speedair: 1.5 },
          { Temp: 23, Umity: 51.4, Density: 12, Speedair: 1.5 },
          { Temp: 23, Umity: 50.6, Density: 12, Speedair: 1.5 },
          { Temp: 23, Umity: 66.5, Density: 12, Speedair: 1.5 },
          { Temp: 23, Umity: 63, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.3, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 59.2, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 59.9, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 59.4, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 56.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.5, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 66.9, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 72.3, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 66.3, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
          { Temp: 22, Umity: 62.7, Density: 12, Speedair: 1.5 },
        ],
      };

      const response = await api.post("simulation", data);
      console.log(response.data);
    };
    simulate();
  }, []); */

  return (
    <>
      <SubHeader
        {...props}
        title={translate("New Simulation", profile.language)}
        route="simulator"
        breadcrumbs={[
          { label: translate("Simulator", profile.language) },
          {
            label: translate("New Simulation", profile.language),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="area-chart" size={15} color="text" />
        }
      />
      <Block>
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
            <Tab label={translate("Input", profile.language)} />
            {Object.keys(input.outputItems)
              .filter(
                (key) =>
                  input.outputItems[key].type === input.outputType &&
                  input.outputItems[key].checked
              )
              .map((key) => (
                <Tab
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
            <form onSubmit={simulate}>
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
                }}
              />{" "}
            </form>
          ) : (
            <TableContent>
              <Header>
                <tr>
                  <th>{translate("Day", profile.language)}</th>
                  {Object.keys(input.outputItems[tabKey].columns)
                    .filter(
                      (key) => input.outputItems[tabKey].columns[key].checked
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
                              input.outputItems[tabKey].columns[key].decimals
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
              </Body>
            </TableContent>
          )}
        </BlockBody>
      </Block>
    </>
  );
}

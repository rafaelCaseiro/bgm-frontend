import React, { useContext, useEffect, useState } from "react";
import { SubHeader } from "../../../../Components/SubHeader";
import { translate } from "../../../../utils/globalFunctions";
import Profile from "../../../../contexts/profile";
import { FontAwesome } from "../../../../Components/FontAwesome";
import { Block, BlockBody, BlockHeader } from "../../../../styles";
import { Tab, Tabs } from "@material-ui/core";
import { Ingredients } from "./Ingredients";
import { api } from "../../../../services/api";
import { Nutrients } from "./Nutirents";
import { Button } from "../../../../Components/Button";
import Swal from "sweetalert2";
import { FeedFormulation } from "./FeedFormulation";
import { NutritionalRequirement } from "./NutritionalRequirement";
import { Errors } from "./Errors";
import Loading from "react-loading";
import { Input } from "../../../../Components/Input";
import { SaveForm } from "./style";

export function FeedFormulator(props) {
  const { profile } = useContext(Profile);

  const [filter, setFilter] = useState({
    ingredient: "",
    ingredientsDefault: true,
    customer: "",
    aminoacid: "",
    simulation: "",
    start: "",
    end: "",
    diet: "",
    applyEnergy: false,
  });

  const [dietName, setDietName] = useState("");

  const [customer, setCustomer] = useState("");

  const [getInit, setGetInit] = useState(true);

  const [diets, setDiets] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const [nutrients, setNutrients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingFormulate, setLoadingFormulate] = useState(false);

  const [loadingSave, setLoadingSave] = useState(false);

  const [simulations, setSimulations] = useState([]);

  const [response, setResponse] = useState({
    errors: [0],
  });

  const [input, setInput] = useState({
    selectedIngredients: [],
    selectedNutrients: [],
  });

  const [error, setError] = useState({
    price: false,
  });

  const [tab, setTab] = useState(0);

  const dietHandler = (e) => {
    if (!e.target.value) {
      setInput({
        selectedIngredients: [],
        selectedNutrients: [],
      });
    }
    setFilter({ ...filter, diet: e.target.value });
    console.log(diets);
    setInput(diets.filter(({ value }) => value === e.target.value)[0].formula);
  };

  const formulateDiet = async () => {
    try {
      setLoadingFormulate(true);

      for (const ingredient of input.selectedIngredients) {
        if (!ingredient.preco) {
          setError({
            price: true,
          });
          return Swal.fire(
            translate("Formulate Diet", profile.language),
            translate("Fill in the required data", profile.language),
            "error"
          );
        }
      }
      const response = await api.post("formulator", input);
      setResponse(response.data);
      setLoadingFormulate(false);
      setTab(2);
    } catch (e) {
      Swal.fire(
        translate("Formulate Diet", profile.language),
        translate("Error Formulating Diet", profile.language),
        "error"
      );
      setLoadingFormulate(false);
    }
  };

  const saveDiet = async (e) => {
    try {
      e.preventDefault();
      setLoadingSave(true);
      const query = {
        nome: dietName,
        formula: response.formula,
        composicao: response.composicao,
        aminoacidos: response.aminoacidos,
        ingredientes: response.feedFormulation.ingredients.map(
          ({ _id, value }) => ({
            ingrediente: _id,
            value,
          })
        ),
      };
      if (customer) {
        query.customer = customer;
      }
      const responseDiet = await Swal.fire({
        title: translate("Create Diet", profile.language),
        text: translate(
          "Do you want to confirm Diet creation",
          profile.language
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0451e8",
        cancelButtonColor: "#d33",
        confirmButtonText: translate("Yes, Create Diet!", profile.language),
        showLoaderOnConfirm: true,
        preConfirm: async () =>
          await api.post("diet", query).catch((err) => ({
            err: true,
            data: { message: err.response.data.message },
          })),
      });
      Swal.fire(
        translate("Create Diet", profile.language),
        translate(responseDiet.value.data.message, profile.language),
        responseDiet.value.err ? "error" : "success"
      );
      setDietName("");
      setLoadingSave(false);
      setGetInit(true);
    } catch (e) {
      Swal.fire(
        translate("Save Diet", profile.language),
        translate("Error saving Diet", profile.language),
        "error"
      );
      setLoadingSave(false);
    }
  };

  const energyHandler = async () => {
    const simToNutr = {
      LysDiet1: {
        nome: "Digestible Lysine (%)",
        nomeDB: "lisinaDig",
        _id: "lisinaDig",
        tipo: "a",
      },
      MetDiet1: {
        nome: "Digestible Methionine (%)",
        nomeDB: "metioninaDig",
        _id: "metioninaDig",
        tipo: "a",
      },
      MetCysDiet1: {
        nome: "Digestible Met + Cys (%)",
        nomeDB: "metCisDig",
        _id: "metCisDig",
        tipo: "a",
      },
      ThrDiet1: {
        nome: "Digestible Treonine (%)",
        nomeDB: "treoninaDig",
        _id: "treoninaDig",
        tipo: "a",
      },
      TrpDiet1: {
        nome: "Digestible Tryptophan (%)",
        nomeDB: "triptofanoDig",
        _id: "triptofanoDig",
        tipo: "a",
      },
      IleDiet1: {
        nome: "Digestible Isoleucine (%)",
        nomeDB: "isoleucinaDig",
        _id: "isoleucinaDig",
        tipo: "a",
      },
      LeuDiet1: {
        nome: "Digestible Leucine (%)",
        nomeDB: "leucinaDig",
        _id: "leucinaDig",
        tipo: "a",
      },
      ValDiet1: {
        nome: "Digestible Valine (%)",
        nomeDB: "valinaDig",
        _id: "valinaDig",
        tipo: "a",
      },
      PheTyrDiet1: {
        nome: "Digestible Phen +Tyr (%)",
        nomeDB: "fenTirDig",
        _id: "fenTirDig",
        tipo: "a",
      },
      HisDiet1: {
        nome: "Digestible Histidine (%)",
        nomeDB: "histidinaDig",
        _id: "histidinaDig",
        tipo: "a",
      },
      ArgDiet1: {
        nome: "Digestible Arginine (%)",
        nomeDB: "argininaDig",
        _id: "argininaDig",
        tipo: "a",
      },
      ATTD_Ca_req_Porc: {
        nome: "Calcium (%)",
        nomeDB: "ca",
        _id: "ca",
        tipo: "c",
      },
      ATTD_P_req_Porc: {
        nome: "Available Phosphorus (%)",
        nomeDB: "pDisp",
        _id: "pDisp",
        tipo: "c",
      },
      EnergyRequiredDiet: {
        nome: "Met. Energia (Kcal/kg)",
        nomeDB: "energiaMetAves",
        _id: "energiaMetAves",
        tipo: "c",
      },
    };
    const response = await api.get("simulation/" + filter.simulation);
    const { individuo } = response.data.response;
    const media = {};
    for (let item in simToNutr) {
      media[simToNutr[item]._id] = 0;
    }
    individuo.forEach(function (item) {
      if (item.age >= filter.start && item.age <= filter.end) {
        for (let obj in simToNutr) {
          media[simToNutr[obj]._id] +=
            obj === "EnergyRequiredDiet"
              ? ((item[obj] * 1000) / 4.184) * 0.85
              : item[obj];
        }
      }
    });
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.selectedNutrients = [];
      return newState;
    });
    for (let item in simToNutr) {
      const value =
        media[simToNutr[item]._id] / (filter.end - filter.start + 1);
      const obj = simToNutr[item];
      obj.min = value.toFixed(item === "EnergyRequiredDiet" ? 0 : 3);
      obj.max = (value * 1.3).toFixed(item === "EnergyRequiredDiet" ? 0 : 3);
      setInput((prevState) => {
        const newState = JSON.parse(JSON.stringify(prevState));
        newState.selectedNutrients.push(obj);
        return newState;
      });
    }
  };

  useEffect(() => {
    const getInitData = async () => {
      try {
        const response = await api.get("formulatorinit");
        setIngredients(response.data.ingredients);
        setNutrients(response.data.nutrients);
        setCustomers(
          response.data.customers.map(({ _id, name }) => ({
            value: _id,
            label: name,
          }))
        );
        setDiets(
          response.data.diets.map(({ _id, nome, formula }) => ({
            value: _id,
            label: nome,
            formula,
          }))
        );
        const responseSimulations = await api.post("filter/list", {
          model: "simulation",
          sort: "nome",
          select: "nome customer",
        });
        setSimulations(responseSimulations.data);
        setLoading(false);
      } catch (e) {
        Swal.fire(
          translate("Load Data", profile.language),
          translate("Error loading Diet", profile.language),
          "error"
        );
        setLoading(false);
      }
    };
    if (getInit) {
      setGetInit(false);
      getInitData();
    }
  }, [getInit, profile.language]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Feed Formulator", profile.language)}
        breadcrumbs={[
          {
            label: translate(
              translate("Feed Formulator", profile.language),
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="sliders" size="24" color="text" />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in diet data", profile.language)}
          <div>
            {response.formula && (
              <SaveForm onSubmit={saveDiet}>
                <Input
                  type="selectOnly"
                  item={customer}
                  setItem={setCustomer}
                  label={translate("Customer", profile.language)}
                  placeholder={translate("Select Customer", profile.language)}
                  options={customers}
                />
                <Input
                  type="inputOnly"
                  placeholder={translate("Diet Name", profile.language) + "*"}
                  required
                  item={dietName}
                  setItem={setDietName}
                />
                <Button
                  notFull={true}
                  color="white"
                  border="success"
                  bg="success"
                  disabled={loadingSave}
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
                      &nbsp; Aguarde...
                    </>
                  ) : (
                    translate("Save Diet", profile.language)
                  )}
                </Button>
              </SaveForm>
            )}
            <Button
              notFull={true}
              color="white"
              border="default"
              bg="default"
              onClick={formulateDiet}
              disabled={loading}
            >
              {loadingFormulate ? (
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
                  &nbsp; Aguarde...
                </>
              ) : (
                translate("Formulate Diet", profile.language)
              )}
            </Button>
          </div>
        </BlockHeader>
        <BlockBody>
          {loading ? (
            <>
              <Loading
                style={{
                  fill: "#094093",
                  height: "20px",
                  width: "20px",
                  display: "inline-table",
                }}
                type="spin"
                color="#094093"
                height={20}
                width={20}
              />
            </>
          ) : (
            <>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
                onChange={(e, value) => {
                  setTab(value);
                }}
              >
                <Tab label={translate("Ingredients", profile.language)} />
                <Tab label={translate("Nutrients", profile.language)} />

                <Tab
                  style={!response.formula ? { display: "none" } : null}
                  label={translate("Feed Formulation", profile.language)}
                />
                <Tab
                  style={!response.formula ? { display: "none" } : null}
                  label={translate("Nutritional Requirement", profile.language)}
                />
                <Tab
                  style={!response.errors[0] ? { display: "none" } : null}
                  label={translate("Errors", profile.language)}
                />
              </Tabs>
              {tab === 0 && (
                <Ingredients
                  filter={filter}
                  setFilter={setFilter}
                  profile={profile}
                  diets={diets}
                  customers={customers}
                  ingredients={ingredients}
                  input={input}
                  setInput={setInput}
                  error={error}
                  dietHandler={dietHandler}
                />
              )}
              {tab === 1 && (
                <Nutrients
                  filter={filter}
                  setFilter={setFilter}
                  profile={profile}
                  diets={diets}
                  customers={customers}
                  nutrients={nutrients}
                  input={input}
                  setInput={setInput}
                  simulations={simulations}
                  error={error}
                  energyHandler={energyHandler}
                />
              )}
              {tab === 2 && (
                <FeedFormulation profile={profile} response={response} />
              )}
              {tab === 3 && (
                <NutritionalRequirement profile={profile} response={response} />
              )}
              {tab === 4 && <Errors profile={profile} response={response} />}
            </>
          )}
        </BlockBody>
      </Block>
    </>
  );
}

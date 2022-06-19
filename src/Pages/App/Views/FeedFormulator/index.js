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
            translate("Formulate Diet", profile.translate),
            translate("Fill in the required data", profile.translate),
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
        translate("Formulate Diet", profile.translate),
        translate("Error Formulating Diet", profile.translate),
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
        title: translate("Create Diet", profile.translate),
        text: translate(
          "Do you want to confirm Diet creation",
          profile.translate
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0451e8",
        cancelButtonColor: "#d33",
        confirmButtonText: translate("Yes, Create Diet!", profile.translate),
        showLoaderOnConfirm: true,
        preConfirm: async () =>
          await api.post("diet", query).catch((err) => ({
            err: true,
            data: { message: err.response.data.message },
          })),
      });
      Swal.fire(
        translate("Create Diet", profile.translate),
        translate(responseDiet.value.data.message, profile.translate),
        responseDiet.value.err ? "error" : "success"
      );
      setDietName("");
      setLoadingSave(false);
      setGetInit(true);
    } catch (e) {
      Swal.fire(
        translate("Save Diet", profile.translate),
        translate("Error saving Diet", profile.translate),
        "error"
      );
      setLoadingSave(false);
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
        setLoading(false);
      } catch (e) {
        Swal.fire(
          translate("Load Data", profile.translate),
          translate("Error loading Diet", profile.translate),
          "error"
        );
        setLoading(false);
      }
    };
    if (getInit) {
      setGetInit(false);
      getInitData();
    }
  }, [getInit, profile.translate]);

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
          {translate("Fill in diet data", profile.translate)}
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
                  error={error}
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

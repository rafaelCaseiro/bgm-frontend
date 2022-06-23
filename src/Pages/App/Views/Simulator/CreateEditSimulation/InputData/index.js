import React from "react";
import Loading from "react-loading";
import { Button } from "../../../../../../Components/Button";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { ButtonContent, Separator } from "../../../../../../styles";
import { translate } from "../../../../../../utils/globalFunctions";
import { FeedFormulatorInput } from "./FeedFormulatorInput";
import { IngredientsInput } from "./IngredientsInput";
import { InputAndOutputType } from "./InputAndOutputType";
import { NutrientsInput } from "./NutrientsInput";
import { SimulationData } from "./SimulationData";

export function InputData({
  input,
  setInput,
  profile,
  customers,
  animalProfiles,
  feedRestrictionPrograms,
  dietPrograms,
  environmentVariables,
  ingredients,
  loading,
  isGenerated,
}) {
  const dietConfig = [
    { label: "Final Age (d)", key: "finalAge" },
    { label: "Mash or Pellet", key: "PelletFeed" },
    { label: "% Fines", key: "FinesFeed" },
    { label: "Phytase (FTU/kg)", key: "Phytase" },
  ];

  const addDiet = () =>
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.diet.push({
        PelletFeed: "Mash",
        ingredients: [""],
        Phytase: "",
      });
      return newState;
    });

  const removeDiet = (index) =>
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.diet.splice(index, 1);
      return newState;
    });

  return (
    <>
      <InputAndOutputType
        profile={profile}
        customers={customers}
        input={input}
        setInput={setInput}
        isGenerated={isGenerated}
      />
      <Separator />
      {
        <SimulationData
          animalProfiles={animalProfiles}
          feedRestrictionPrograms={feedRestrictionPrograms}
          environmentVariables={environmentVariables}
          profile={profile}
          input={input}
          setInput={setInput}
        />
      }
      <Separator />
      {input.simulationType === "feedFormulator" && (
        <FeedFormulatorInput
          dietPrograms={dietPrograms}
          profile={profile}
          input={input}
          setInput={setInput}
          dietConfig={dietConfig}
        />
      )}
      {input.simulationType === "nutrients" && (
        <NutrientsInput
          input={input}
          profile={profile}
          setInput={setInput}
          dietConfig={dietConfig}
          addDiet={addDiet}
          removeDiet={removeDiet}
        />
      )}
      {input.simulationType === "ingredients" && (
        <IngredientsInput
          input={input}
          profile={profile}
          setInput={setInput}
          dietConfig={dietConfig}
          addDiet={addDiet}
          removeDiet={removeDiet}
          ingredients={ingredients}
        />
      )}
      <Separator />
      <ButtonContent>
        <Button
          type="submit"
          bg="default"
          border="default"
          color="white"
          style={{ width: "auto" }}
        >
          {loading ? (
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
            <>
              {translate("Simulate", profile.language)}
              &nbsp;{" "}
              <FontAwesome type="solid" name="gears" size="12" color="white" />
            </>
          )}
        </Button>
      </ButtonContent>
    </>
  );
}

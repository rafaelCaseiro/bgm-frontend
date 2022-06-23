import React from "react";
import { Button } from "../../../../../../../Components/Button";
import { FontAwesome } from "../../../../../../../Components/FontAwesome";
import { Input } from "../../../../../../../Components/Input";
import { CheckboxItems } from "../../../../../../../Components/Input/style";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../../Components/Table/style";
import {
  convertNumberToString,
  translate,
} from "../../../../../../../utils/globalFunctions";
import { InputTable, Td } from "../../style";

export function IngredientsInput({
  input,
  setInput,
  dietConfig,
  addDiet,
  removeDiet,
  profile,
  ingredients,
}) {
  const addIngredient = () => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.ingredients.push("");
      newState.diet.forEach((diet, index) => {
        newState.diet[index].ingredients.push("");
      });
      return newState;
    });
  };

  const removeIngredrient = (index) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.ingredients.splice(index, 1);
      newState.diet.forEach((diet, indexDiet) => {
        newState.diet[indexDiet].ingredients.splice(index, 1);
      });
      return newState;
    });
  };

  return (
    <TableContent>
      <Header>
        <tr>
          <th style={{ width: 250 }}>
            {translate("Diet Parameters", profile.language)}
          </th>
          {input.diet.map((item, index) => (
            <th>
              <div style={{ display: "flex", alignItems: "center" }}>
                {translate("Diet", profile.language)} {index + 1}&nbsp;
                <Button
                  type="button"
                  size="sm"
                  bg="danger"
                  border="danger"
                  color="white"
                  onClick={() => removeDiet(index)}
                  style={{ width: 30 }}
                >
                  <FontAwesome
                    type="solid"
                    name="minus"
                    color="white"
                    size={12}
                  />
                </Button>
              </div>
            </th>
          ))}
          <th style={{ width: 50 }}>
            <Button
              type="button"
              size="sm"
              bg="default"
              border="default"
              color="white"
              onClick={addDiet}
            >
              <FontAwesome type="solid" name="plus" color="white" size={12} />
            </Button>
          </th>
        </tr>
      </Header>
      <Body>
        {dietConfig.map(({ label, key }) =>
          key === "FinesFeed" &&
          !input.diet.filter(
            ({ PelletFeed }) => PelletFeed === "Pellet"
          )[0] ? null : (
            <tr key={key}>
              <Td>{translate(label, profile.language)}</Td>
              {input.diet.map((item, index) =>
                key === "PelletFeed" ? (
                  <td style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <CheckboxItems>
                      <Input
                        type="radiobox"
                        label="Mash"
                        item={input}
                        setItem={setInput}
                        params={`diet.${index}.${key}`}
                        value="Mash"
                      />
                      <Input
                        type="radiobox"
                        label="Pellet"
                        item={input}
                        setItem={setInput}
                        params={`diet.${index}.${key}`}
                        value="Pellet"
                      />
                    </CheckboxItems>
                  </td>
                ) : key === "FinesFeed" &&
                  input.diet[index].PelletFeed === "Mash" ? null : (
                  <Td>
                    <InputTable
                      type="inputOnly"
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`diet.${index}.${key}`}
                      placeholder={translate(
                        `Type the ${label}`,
                        profile.language
                      )}
                    />
                  </Td>
                )
              )}
            </tr>
          )
        )}
      </Body>
      <Header>
        <tr>
          <th style={{ width: 250 }}>
            {translate(`Ingredients`, profile.language)}
          </th>
          {input.diet.map((item, index) => (
            <th key={`Diet${index}`}>
              {translate(`Diet`, profile.language)} {index + 1}
            </th>
          ))}
          <th style={{ width: 50 }}>
            <Button
              type="button"
              size="sm"
              bg="default"
              border="default"
              color="white"
              onClick={addIngredient}
            >
              <FontAwesome type="solid" name="plus" color="white" size={12} />
            </Button>
          </th>
        </tr>
      </Header>
      <Body>
        {input.ingredients.map(({ ingredient }, index) => (
          <tr key={ingredient + index}>
            <Td>
              <Input
                style={{
                  borderRadius: 0,
                  borderColor: "white",
                  height: 25,
                  padding: 0,
                }}
                type="selectOnly"
                item={input}
                setItem={setInput}
                params={`ingredients.${index}`}
                placeholder={translate(
                  `Select the ingredient`,
                  profile.language
                )}
                options={ingredients
                  .filter(({ customer }) =>
                    input.customer
                      ? customer === input.customer || !customer
                      : true
                  )
                  .map(({ _id, nome }) => ({ value: _id, label: nome }))}
              />
            </Td>
            {input.diet.map((item, indexDiet) => (
              <Td>
                <InputTable
                  type="inputOnly"
                  inputType="number"
                  item={input}
                  setItem={setInput}
                  params={`diet.${indexDiet}.ingredients.${index}`}
                  placeholder={translate(`Type the (%)`, profile.language)}
                />
              </Td>
            ))}
            <Td isButton={true}>
              <Button
                type="button"
                bg="danger"
                border="danger"
                onClick={() => removeIngredrient(index)}
                style={{
                  padding: 4,
                  width: 20,
                }}
              >
                <FontAwesome
                  name="minus"
                  type="solid"
                  color="white"
                  size={10}
                />
              </Button>
            </Td>
          </tr>
        ))}
        <tr>
          <th></th>
          {input.diet.map(({ ingredients }) => (
            <th>
              {convertNumberToString(
                ingredients
                  .map((ingredient) => +ingredient || 0)
                  .reduce((a, b) => a + b, 0),
                2
              )}
            </th>
          ))}
        </tr>
      </Body>
    </TableContent>
  );
}

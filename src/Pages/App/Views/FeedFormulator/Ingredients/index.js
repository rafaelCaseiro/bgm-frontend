import React from "react";
import { FontAwesome } from "../../../../../Components/FontAwesome";
import { Input } from "../../../../../Components/Input";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../Components/Table/style";
import { Col, Row } from "../../../../../styles";
import { translate } from "../../../../../utils/globalFunctions";
import { InputTable, Td } from "../../Simulator/CreateEditSimulation/style";
import { BoxItem, BoxSelector } from "../style";

export function Ingredients({
  filter,
  setFilter,
  profile,
  diets,
  customers,
  ingredients,
  input,
  setInput,
  error,
  dietHandler,
}) {
  const addIngredient = (ingredient) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.selectedIngredients.push({
        min: "",
        max: "",
        ...ingredient,
      });
      return newState;
    });
  };

  const removeIngredient = (index) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.selectedIngredients.splice(index, 1);
      return newState;
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Input
            item={filter}
            setItem={setFilter}
            params="ingredient"
            type="input"
            label={translate("Look for Ingredient", profile.language)}
            placeholder={translate(
              "Type the ingredient name",
              profile.language
            )}
          />
          {filter.ingredient && (
            <FontAwesome
              onClick={() => setFilter({ ...filter, ingredient: "" })}
              name="close"
              size={15}
              type="solid"
              hover={true}
              style={{
                position: "absolute",
                right: 15,
                top: 33,
                cursor: "pointer",
              }}
            />
          )}
        </Col>
        <Col style={{ paddingTop: 28 }}>
          <Input
            type="checkbox"
            label={translate("Show default ingredients", profile.language)}
            item={filter}
            setItem={setFilter}
            params="ingredientsDefault"
          />
        </Col>
        <Col>
          <Input
            type="select"
            item={filter}
            setItem={setFilter}
            params="customer"
            label={translate("Customer", profile.language)}
            placeholder={translate("Select Customer", profile.language)}
            options={customers}
          />
          {filter.customer && (
            <FontAwesome
              onClick={() => setFilter({ ...filter, customer: "" })}
              name="close"
              size={15}
              type="solid"
              hover={true}
              style={{
                position: "absolute",
                right: 25,
                top: 33,
                cursor: "pointer",
              }}
            />
          )}
        </Col>

        <Col>
          <Input
            type="select"
            value={filter.diet}
            onChange={dietHandler}
            label={translate("Saved Diets", profile.language)}
            placeholder={translate("Select  Diet", profile.language)}
            options={diets}
          />
          {filter.diet && (
            <FontAwesome
              onClick={() => {
                setInput({ selectedIngredients: [], selectedNutrients: [] });
                setFilter({ ...filter, diet: "" });
              }}
              name="close"
              size={15}
              type="solid"
              hover={true}
              style={{
                position: "absolute",
                right: 25,
                top: 33,
                cursor: "pointer",
              }}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <label>{translate("Ingredient List", profile.language)}</label>
          <BoxSelector>
            {ingredients
              .filter(({ nome }) => {
                if (filter.ingredient) {
                  return (
                    nome
                      .toLowerCase()
                      .indexOf(filter.ingredient.toLowerCase()) > -1
                  );
                }
                return true;
              })
              .filter(({ customer }) => {
                if (filter.customer) {
                  return customer === filter.customer;
                }
                return true;
              })
              .filter((item) => {
                if (!filter.ingredientsDefault) {
                  return !item.default;
                }
                return true;
              })
              .filter(
                ({ _id }) =>
                  input.selectedIngredients.map(({ _id }) => _id).indexOf(_id) <
                  0
              )
              .map(({ nome, _id, preco }) => (
                <BoxItem
                  style={{ width: "100%" }}
                  key={_id}
                  onClick={() => addIngredient({ nome, _id, preco })}
                >
                  <span>{nome}</span>
                  <FontAwesome
                    style={{ marginTop: 2 }}
                    name="circle-chevron-right"
                    size={15}
                    type="solid"
                    color="default"
                  />
                </BoxItem>
              ))}
          </BoxSelector>
        </Col>
        <Col>
          <label>{translate("Selected Ingredients", profile.language)}</label>
          <TableContent>
            <Header>
              <tr>
                <th>{translate("Name", profile.language)}</th>
                <th style={{ width: 80 }}>
                  {translate("Min", profile.language)}
                </th>
                <th style={{ width: 80 }}>
                  {translate("Max", profile.language)}
                </th>
                <th style={{ width: 90 }}>
                  {translate("Price", profile.language)}
                </th>
                <th style={{ width: 20 }}></th>
              </tr>
            </Header>
            <Body>
              {input.selectedIngredients.map(({ nome, _id }, index) => (
                <tr key={_id}>
                  <Td>
                    <div style={{ paddingRight: 5 }}>{nome}</div>
                  </Td>
                  <Td>
                    <InputTable
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`selectedIngredients.${index}.min`}
                      type="inputOnly"
                      placeholder={"%"}
                    />
                  </Td>
                  <Td>
                    <InputTable
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`selectedIngredients.${index}.max`}
                      type="inputOnly"
                      placeholder={"%"}
                    />
                  </Td>
                  <Td>
                    <InputTable
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`selectedIngredients.${index}.preco`}
                      type="inputOnly"
                      placeholder={"$"}
                      error={
                        !input.selectedIngredients[index].preco && error.price
                      }
                    />
                  </Td>
                  <Td>
                    <FontAwesome
                      onClick={() => removeIngredient(index)}
                      style={{ paddingLeft: 5, cursor: "pointer" }}
                      hover={true}
                      name="trash"
                      size={12}
                      color="danger"
                      type="solid"
                    />
                  </Td>
                </tr>
              ))}
            </Body>
          </TableContent>
        </Col>
      </Row>
    </>
  );
}

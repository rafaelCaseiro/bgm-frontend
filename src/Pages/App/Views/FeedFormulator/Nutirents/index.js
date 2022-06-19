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

export function Nutrients({
  filter,
  setFilter,
  profile,
  diets,
  customers,
  nutrients,
  input,
  setInput,
}) {
  const addNutrient = (nutrient) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.selectedNutrients.push({
        min: "",
        max: "",
        ...nutrient,
      });
      return newState;
    });
  };

  const removeNutrient = (index) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.selectedNutrients.splice(index, 1);
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
            params="nutrient"
            type="input"
            label={translate("Look for Nutrient", profile.language)}
            placeholder={translate("Type the nutrient name", profile.language)}
          />
          {filter.nutrient && (
            <FontAwesome
              onClick={() => setFilter({ ...filter, nutrient: "" })}
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
            label={translate(`Check this option to apply the energy, 
            amino acid, Ca and avP estimated in a simulation previously saved, 
            profile.language`)}
            item={filter}
            setItem={setFilter}
            params="applyEnergy"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label>{translate("Nutrient List", profile.language)}</label>
          <BoxSelector>
            {nutrients
              .filter(({ nome }) => {
                if (filter.nutrient) {
                  return (
                    nome.toLowerCase().indexOf(filter.nutrient.toLowerCase()) >
                    -1
                  );
                }
                return true;
              })
              .filter(
                ({ nomeDB }) =>
                  input.selectedNutrients
                    .map(({ nomeDB }) => nomeDB)
                    .indexOf(nomeDB) < 0
              )
              .map(({ nome, nomeDB, preco }) => (
                <BoxItem
                  style={{ width: "100%" }}
                  key={nomeDB}
                  onClick={() => addNutrient({ nome, nomeDB, preco })}
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
          <label>{translate("Selected Nutrients", profile.language)}</label>
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
                <th style={{ width: 20 }}></th>
              </tr>
            </Header>
            <Body>
              {input.selectedNutrients.map(({ nome, _id }, index) => (
                <tr key={_id}>
                  <Td>
                    <div style={{ paddingRight: 5 }}>{nome}</div>
                  </Td>
                  <Td>
                    <InputTable
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`selectedNutrients.${index}.min`}
                      type="inputOnly"
                      placeholder={"%"}
                    />
                  </Td>
                  <Td>
                    <InputTable
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`selectedNutrients.${index}.max`}
                      type="inputOnly"
                      placeholder={"%"}
                    />
                  </Td>

                  <Td>
                    <FontAwesome
                      onClick={() => removeNutrient(index)}
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

import React from "react";
import { Input } from "../../../../../../../Components/Input";
import { CheckboxItems } from "../../../../../../../Components/Input/style";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../../Components/Table/style";
import { Col, Row } from "../../../../../../../styles";
import { translate } from "../../../../../../../utils/globalFunctions";
import { InputTable, Td } from "../../style";

export function FeedFormulatorInput({
  input,
  setInput,
  dietPrograms,
  dietConfig,
  profile,
}) {
  const dietProgramHandler = (e) => {
    const { value } = e.target;
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.dietProgram = value;
      if (value) {
        newState.diet = dietPrograms
          .filter(({ _id }) => _id === value)[0]
          .dietas.map(({ dieta }) => ({
            nome: dieta.nome,
            PelletFeed: "Mash",
            ingredients: [""],
          }));
      } else {
        newState.diet = [{ PelletFeed: "Mash", ingredients: [""] }];
      }

      return newState;
    });
  };

  return (
    <>
      <Row>
        <Col style={{ marginBottom: 0 }}>
          <Input
            type="select"
            label={translate("Diet Program", profile.language)}
            onChange={dietProgramHandler}
            value={input.dietProgram}
            placeholder={translate("Select the Diet Program", profile.language)}
            required={true}
            options={dietPrograms
              .filter(({ customer }) =>
                input.customer ? customer === input.customer || !customer : true
              )
              .map(({ _id, nome }) => ({ value: _id, label: nome }))}
          />
        </Col>
        <Col />
      </Row>
      {input.dietProgram && (
        <TableContent>
          <Header>
            <tr>
              <th style={{ width: 250 }}>
                {translate("Parameters", profile.language)}
              </th>
              {input.diet.map((item, index) => (
                <th>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.nome}
                  </div>
                </th>
              ))}
            </tr>
          </Header>
          <Body>
            {dietConfig
              .filter(({ key }) => key !== "finalAge")
              .map(({ label, key }) =>
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
                        input.diet[index].PelletFeed === "Mash" ? (
                        <Td></Td>
                      ) : (
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
        </TableContent>
      )}
    </>
  );
}

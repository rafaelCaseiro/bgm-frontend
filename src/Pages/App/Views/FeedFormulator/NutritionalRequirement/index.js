import React from "react";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../Components/Table/style";
import {
  convertNumberToString,
  translate,
} from "../../../../../utils/globalFunctions";
import { Container, Td } from "./style";

export function NutritionalRequirement({ profile, response }) {
  return (
    <Container>
      <TableContent>
        <Header>
          <tr>
            <th>{translate("Nutrient", profile.language)}</th>
            <th>{translate("Portion", profile.language)}</th>
            <th>{translate("Min Required", profile.language)}</th>
            <th>{translate("Max Required", profile.language)}</th>
            <th>{translate("Dif/Min Required", profile.language)}</th>
            <th>{translate("Dif/Max Required", profile.language)}</th>
          </tr>
        </Header>
        <Body>
          {response?.nutritionalRequirement?.map(
            ({ nome, min, max, difMin, difMax, value }) => (
              <tr>
                <Td>{translate(nome, profile.language)}</Td>
                <Td>{convertNumberToString(value, 3)}</Td>
                <Td>{convertNumberToString(min, 3)}</Td>
                <Td>{convertNumberToString(max, 3)}</Td>
                <Td>
                  {convertNumberToString(difMin, 3).replace("-", "") === "0,000"
                    ? "-"
                    : convertNumberToString(difMin, 3)}
                </Td>
                <Td>
                  {convertNumberToString(difMax, 3).replace("-", "") === "0,000"
                    ? "-"
                    : convertNumberToString(difMax, 3)}
                </Td>
              </tr>
            )
          )}
        </Body>
      </TableContent>
    </Container>
  );
}

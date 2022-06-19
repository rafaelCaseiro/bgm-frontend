import React from "react";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../../Components/Table/style";
import {
  convertNumberToString,
  translate,
} from "../../../../../../../utils/globalFunctions";
import { Container, Td } from "./style";

export function Ingredients({ profile, diet }) {
  return (
    <Container>
      <TableContent style={{ width: 550 }}>
        <Header>
          <tr>
            <th>{translate("Ingredient", profile.language)}</th>
            <th>{translate("Percentage", profile.language)}</th>
            <th>{translate("Price/kg", profile.language)}</th>
          </tr>
        </Header>
        <Body>
          {diet.ingredientes?.map(({ ingrediente, preco, value }) => (
            <tr>
              <Td>{ingrediente?.nome}</Td>
              <Td>{convertNumberToString(value, 2)}</Td>
              <Td>{convertNumberToString(preco, 2)}</Td>
            </tr>
          ))}
        </Body>
        <Header>
          <tr>
            <th>{translate("Total", profile.language)}</th>
            <th>
              {convertNumberToString(
                diet.ingredientes
                  ?.map(({ value }) => value)
                  .reduce((a, b) => a + b, 0),
                2
              )}
            </th>
            <th>
              {convertNumberToString(
                diet.ingredientes
                  ?.map(({ preco }) => preco)
                  .reduce((a, b) => a + b, 0),
                2
              )}
            </th>
          </tr>
        </Header>
      </TableContent>
    </Container>
  );
}

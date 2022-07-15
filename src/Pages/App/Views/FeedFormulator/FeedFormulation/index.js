import React from "react";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../Components/Table/style";
import {
  compareValues,
  convertNumberToString,
  translate,
} from "../../../../../utils/globalFunctions";
import { Container, Td } from "./style";

export function FeedFormulation({ profile, response }) {
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
          {response?.feedFormulation?.ingredients
            ?.sort(compareValues("value", "desc"))
            .map(({ nome, preco, value }) => (
              <tr>
                <Td>{nome}</Td>
                <Td>{convertNumberToString(value, 3)}</Td>
                <Td>{convertNumberToString(preco, 3)}</Td>
              </tr>
            ))}
        </Body>
        <Header>
          <tr>
            <th>{translate("Total", profile.language)}</th>
            <th>
              {convertNumberToString(response?.feedFormulation?.percentual, 3)}
            </th>
            <th>
              {convertNumberToString(
                response?.feedFormulation?.objetivoValue,
                3
              )}
            </th>
          </tr>
        </Header>
      </TableContent>
    </Container>
  );
}

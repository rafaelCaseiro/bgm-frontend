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
          {response?.feedFormulation?.ingredients?.map(
            ({ nome, preco, value }) => (
              <tr>
                <Td>{nome}</Td>
                <Td>{convertNumberToString(value, 2)}</Td>
                <Td>{convertNumberToString(preco, 2)}</Td>
              </tr>
            )
          )}
        </Body>
        <Header>
          <tr>
            <th>{translate("Total", profile.language)}</th>
            <th>
              {convertNumberToString(response?.feedFormulation?.percentual, 2)}
            </th>
            <th>
              {convertNumberToString(
                response?.feedFormulation?.objetivoValue,
                2
              )}
            </th>
          </tr>
        </Header>
      </TableContent>
    </Container>
  );
}

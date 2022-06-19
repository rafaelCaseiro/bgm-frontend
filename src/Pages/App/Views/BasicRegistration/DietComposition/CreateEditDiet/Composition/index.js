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

export function Composition({ profile, diet }) {
  return (
    <Container>
      <TableContent style={{ width: 550 }}>
        <Header>
          <tr>
            <th>{translate("Nutrient", profile.language)}</th>
            <th>{translate("Amount", profile.language)}</th>
          </tr>
        </Header>
        <Body>
          {diet.composicao?.map(({ nome, valor }) => (
            <tr>
              <Td>{nome}</Td>
              <Td>{convertNumberToString(valor, 3)}</Td>
            </tr>
          ))}
        </Body>
      </TableContent>
    </Container>
  );
}

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

export function Aminoacids({ profile, diet }) {
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
          {diet.aminoacidos?.map(({ nome, valor }) => (
            <tr>
              <Td>{translate(nome, profile.language)}</Td>
              <Td>{convertNumberToString(valor, 3)}</Td>
            </tr>
          ))}
        </Body>
      </TableContent>
    </Container>
  );
}

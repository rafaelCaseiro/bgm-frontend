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

export function Errors({ profile, response }) {
  return (
    <Container>
      <TableContent style={{ width: 550 }}>
        <Header>
          <tr>
            <th>{translate("Type", profile.language)}</th>
            <th>{translate("Name", profile.language)}</th>
            <th>{translate("Error", profile.language)}</th>
            <th>{translate("Required", profile.language)}</th>
            <th>{translate("Value", profile.language)}</th>
          </tr>
        </Header>
        <Body>
          {response?.errors?.map(({ nome, tipo, value, erro, exigencia }) => (
            <tr>
              <Td>{translate(tipo, profile.language)}</Td>
              <Td>{nome}</Td>
              <Td>{translate(erro, profile.language)}</Td>
              <Td>{exigencia}</Td>
              <Td>{convertNumberToString(value, 2)}</Td>
            </tr>
          ))}
        </Body>
      </TableContent>
    </Container>
  );
}

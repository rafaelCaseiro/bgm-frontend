import React from "react";
//import { Button } from "../../../../../../../Components/Button";
import { Col, Row } from "../../../../../../../styles";
import {
  convertDateToString,
  translate,
} from "../../../../../../../utils/globalFunctions";

export function Data({ profile, diet, id }) {
  return (
    <Row>
      <Col size={2}>
        <label>{translate("Date", profile.language)}</label>
        <strong>{convertDateToString(diet.data)}</strong>
      </Col>
      <Col size={2}>
        <label>{translate("Customer", profile.language)}</label>
        <strong>{diet.customer?.name}</strong>
      </Col>
      {/* <Col size={1}>
        <Button notFull={true} color="white" bg="default" border="default">
          {translate("Copy Diet", profile.language)}
        </Button>
      </Col> */}
    </Row>
  );
}

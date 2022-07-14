import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { Input } from "../../../../../../Components/Input";
import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import Profile from "../../../../../../contexts/profile";

import {
  getRoutePath,
  translate,
} from "../../../../../../utils/globalFunctions";

const tableParams = [
  {
    key: "nome",
    label: "Name",
    filter: "text",
    placeholder: "Type the Name",
  },
  {
    key: "customer",
    label: "Cliente",
    filter: "text",
    params: "name",
    placeholder: "Type the Customer",
  },
  {
    key: "status",
    type: "status",
    label: "Status",
    filter: "status",
    style: { width: 100 },
  },
];

export function ListIngredients(props) {
  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const path = getRoutePath(location, params);

  const { profile } = useContext(Profile);

  const [showDefault, setShowDefault] = useState(params.id === "true");

  const showDefaultHandle = (e) => {
    setShowDefault(e.target.checked);
    navigate(
      path
        .replace(":page", params.page)
        .replace(":limit", params.limit)
        .replace(":sort", params.sort)
        .replace(":query", params.query)
        .replace(":id", e.target.checked)
    );
  };

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Ingredients", profile.language)}
        route="ingredient"
        newLabel={translate("New Ingredient", profile.language)}
        newLink="/basicregistration/ingredient/create"
        otherButtons={[
          <Input
            type="checkbox"
            label={translate("Show default ingredients", profile.language)}
            style={{ width: 150 }}
            onChange={showDefaultHandle}
            value={showDefault}
          />,
        ]}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Ingredients", profile.language),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="database" size="24" color="#fff" />
        }
      />

      <Table
        cols={tableParams}
        editLink={"/basicregistration/ingredient/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"ingredients/" + params.id}
        {...props}
      />
    </>
  );
}

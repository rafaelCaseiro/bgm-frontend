import React, { useContext } from "react";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import Profile from "../../../../../../contexts/profile";

import { translate } from "../../../../../../utils/globalFunctions";

export function ListEnvironmentVariables(props) {
  const { profile } = useContext(Profile);

  const tableParams = [
    {
      key: "nome",
      label: translate("Name", profile.language),
      filter: "text",
      placeholder: translate("Type the name", profile.language),
    },
    {
      key: "customer",
      label: translate("Customer", profile.language),
      filter: "text",
      params: "name",
      placeholder: translate("Type the customer name", profile.language),
    },

    {
      key: "status",
      type: "status",
      label: "Status",
      filter: "status",
      style: { width: 100 },
    },
  ];
  return (
    <>
      <SubHeader
        {...props}
        title={translate("Environment Variables", profile.language)}
        route="feed Restriction Program"
        newLabel={translate("New Environment Variables", profile.language)}
        newLink="/basicregistration/environmentvariables/create"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Environment Variables List", profile.language),
          },
        ]}
        icon={
          <FontAwesome
            type="solid"
            name="thermometer-empty"
            size="24"
            color="#fff"
          />
        }
      />

      <Table
        cols={tableParams}
        editLink={"/basicregistration/environmentvariables/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"environmentvariables/"}
        {...props}
      />
    </>
  );
}

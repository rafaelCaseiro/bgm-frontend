import React, { useContext } from "react";
import { FontAwesome } from "../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../Components/SubHeader";
import { Table } from "../../../../../Components/Table";
import Profile from "../../../../../contexts/profile";

import { translate } from "../../../../../utils/globalFunctions";

export function ListSimulations(props) {
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
        title={translate("Simulation", profile.language)}
        route="simulation"
        newLabel={translate("New Simulation", profile.language)}
        newLink="/simulator/simulation/create"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Simulation List", profile.language),
          },
        ]}
        icon={<FontAwesome type="solid" name="bars" size="24" color="#fff" />}
      />

      <Table
        cols={tableParams}
        editLink={"/simulator/simulation/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"simulation/"}
        {...props}
      />
    </>
  );
}

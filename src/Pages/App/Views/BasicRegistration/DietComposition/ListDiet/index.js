import React, { useContext } from "react";

import { FontAwesome } from "../../../../../../Components/FontAwesome";

import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import Profile from "../../../../../../contexts/profile";

import { translate } from "../../../../../../utils/globalFunctions";

export function ListDiet(props) {
  const { profile } = useContext(Profile);

  const tableParams = [
    {
      key: "nome",
      label: translate("Name", profile.language),
      filter: "text",
      placeholder: "type the Name",
    },
    {
      key: "customer",
      label: translate("Customer", profile.language),
      filter: "text",
      params: "name",
      placeholder: "type the Name",
    },
    {
      key: "data",
      label: translate("Date", profile.language),
      filter: "date",
      type: "date",
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
        title={translate("Diet Composition", profile.language)}
        route="diet"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Diet List", profile.language),
          },
        ]}
        icon={
          <FontAwesome
            type="solid"
            name="balance-scale"
            size="24"
            color="#fff"
          />
        }
      />

      <Table
        cols={tableParams}
        editLink={"/basicregistration/diet/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"diet"}
        {...props}
      />
    </>
  );
}

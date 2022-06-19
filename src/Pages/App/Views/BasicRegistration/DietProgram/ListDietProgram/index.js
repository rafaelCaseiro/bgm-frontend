import React, { useContext } from "react";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import Profile from "../../../../../../contexts/profile";

import { translate } from "../../../../../../utils/globalFunctions";

export function ListDietPrograms(props) {
  const { profile } = useContext(Profile);

  const options = [
    {
      value: "idade",
      label: translate("Age", profile.language),
    },
    {
      value: "peso",
      label: translate("Body Weight", profile.language),
    },
  ];

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
      key: "condicao",
      label: translate("Condiction", profile.language),
      filter: "select",
      options: options,
      type: "custom",
      response: ({ condicao }) =>
        options.filter(({ value }) => value === condicao)[0].label,
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
        title={translate("Diet Program", profile.language)}
        route="feed Restriction Program"
        newLabel={translate("New Diet Program", profile.language)}
        newLink="/basicregistration/dietprogram/create"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Diet Program List", profile.language),
          },
        ]}
        icon={<FontAwesome type="solid" name="bars" size="24" color="#fff" />}
      />

      <Table
        cols={tableParams}
        editLink={"/basicregistration/dietprogram/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"dietprogram/"}
        {...props}
      />
    </>
  );
}

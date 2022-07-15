import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import Profile from "../../../../../../contexts/profile";
import { useContext } from "react";
import { translate } from "../../../../../../utils/globalFunctions";

export function ListCustomers(props) {
  const { profile } = useContext(Profile);

  const tableParams = [
    {
      key: "name",
      label: translate("Name", profile.language),
      filter: "text",
      placeholder: translate("type the Name", profile.language),
      mobile: {
        type: "title",
      },
    },

    {
      key: "city",
      label: translate("City", profile.language),
      filter: "text",
      placeholder: translate("Type the City", profile.language),
      mobile: {
        type: "item",
      },
    },
    {
      key: "state",
      label: translate("State", profile.language),
      filter: "text",
      placeholder: translate("Type the State", profile.language),
      mobile: {
        type: "item",
      },
    },
    {
      key: "status",
      type: "status",
      label: "Status",
      filter: "status",
      mobile: {
        type: "status",
      },
    },
  ];

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Customers", profile.language)}
        route="customer"
        newLabel={translate("New Customer", profile.language)}
        newLink="/basicregistration/customer/create"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Customers", profile.language),
          },
        ]}
        icon={
          <FontAwesome
            type="solid"
            name="address-book"
            size="24"
            color="#fff"
          />
        }
      />
      <Table
        cols={tableParams}
        editLink={"/basicregistration/customer/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"customer"}
        {...props}
      />
    </>
  );
}

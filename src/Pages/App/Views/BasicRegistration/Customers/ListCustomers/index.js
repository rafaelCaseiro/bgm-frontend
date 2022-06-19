import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import Profile from "../../../../../../contexts/profile";
import { useContext } from "react";
import { translate } from "../../../../../../utils/globalFunctions";

export function ListCustomers(props) {
  const tableParams = [
    {
      key: "name",
      label: "Name",
      filter: "text",
      placeholder: "type the Name",
      mobile: {
        type: "title",
      },
    },

    {
      key: "city",
      label: "City",
      filter: "text",
      placeholder: "Type the City",
      mobile: {
        type: "item",
      },
    },
    {
      key: "state",
      label: "State",
      filter: "text",
      placeholder: "Type the State",
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

  const { profile } = useContext(Profile);

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

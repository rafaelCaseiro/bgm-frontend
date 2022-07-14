import { SubHeader } from "../../../../../../Components/SubHeader";
import { Table } from "../../../../../../Components/Table";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import Profile from "../../../../../../contexts/profile";
import { useContext } from "react";
import { translate } from "../../../../../../utils/globalFunctions";

export function ListUsers(props) {
  const tableParams = [
    {
      key: "name",
      label: "Name",
      filter: "text",
      placeholder: "Type the Name",
      mobile: {
        type: "title",
      },
    },
    {
      key: "username",
      label: "E-mail",
      filter: "text",
      placeholder: "Type the E-mail",
      mobile: {
        type: "small",
      },
    },

    {
      key: "responsibility",
      label: "Responsibility",
      filter: "text",
      placeholder: "Type the Responsibility",
      mobile: {
        type: "small",
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
        title={translate("Users", profile.language)}
        route="user"
        newLabel={translate("New User", profile.language)}
        newLink="/basicregistration/user/create"
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Users", profile.language),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="user-circle" size="24" color="#fff" />
        }
      />
      <Table
        cols={tableParams}
        editLink={"/basicregistration/user/edit/"}
        emptyText={translate("No items found!", profile.language)}
        route={"user"}
        {...props}
      />
    </>
  );
}

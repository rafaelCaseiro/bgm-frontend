import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../../Components/SubHeader";
import { translate } from "../../../../../../utils/globalFunctions";
import Profile from "../../../../../../contexts/profile";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../../../../../services/api";
import { Block, BlockBody, BlockHeader } from "../../../../../../styles";
import { Input } from "../../../../../../Components/Input";
import { Tab, Tabs } from "@material-ui/core";
import { Data } from "./Data";
import { Ingredients } from "./Ingredients";
import { Composition } from "./Composition";
import { Aminoacids } from "./Aminoacids";

export function CreateEditDiet(props) {
  const params = useParams();
  const { profile } = useContext(Profile);
  const [diet, setDiet] = useState({
    nome: "",
    ingredientes: [],
    formula: {},
    composicao: [],
    aminoacidos: [],
    data: "",
    customer: {},
    status: true,
  });

  const [getDiet, setGetDiet] = useState(true);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    const loadDiet = async () => {
      if (params.id) {
        const responseDiet = await api
          .get(`diet/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseDiet.data) {
          return Swal.fire(
            translate("Edit Diet", profile.translate),
            translate("Error to search Diet", profile.translate),
            "error"
          );
        }

        setDiet(responseDiet.data);
      }
    };
    if (getDiet) {
      setGetDiet(false);
      loadDiet();
    }
  }, [params, profile, getDiet]);
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
          {
            label: translate("Diet Composition", profile.language),
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
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Diet data", profile.translate)}
          <Input
            type="switch"
            item={diet}
            setItem={setDiet}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            onChange={(e, value) => {
              setTab(value);
            }}
          >
            <Tab label={translate("Ingredients", profile.language)} />
            <Tab label={translate("Composition", profile.language)} />
            <Tab label={translate("Aminoacids", profile.language)} />
            <Tab label={translate("Data", profile.language)} />
          </Tabs>
          {tab === 0 && <Ingredients profile={profile} diet={diet} />}
          {tab === 1 && <Composition profile={profile} diet={diet} />}
          {tab === 2 && <Aminoacids profile={profile} diet={diet} />}
          {tab === 3 && <Data profile={profile} diet={diet} id={params.id} />}
        </BlockBody>
      </Block>
    </>
  );
}

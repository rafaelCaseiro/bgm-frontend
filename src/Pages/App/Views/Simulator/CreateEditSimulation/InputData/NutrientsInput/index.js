import React from "react";
import { Button } from "../../../../../../../Components/Button";
import { FontAwesome } from "../../../../../../../Components/FontAwesome";
import { Input } from "../../../../../../../Components/Input";
import { CheckboxItems } from "../../../../../../../Components/Input/style";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../../Components/Table/style";
import { translate } from "../../../../../../../utils/globalFunctions";
import { InputTable, Td } from "../../style";

export function NutrientsInput({
  input,
  setInput,
  dietConfig,
  addDiet,
  removeDiet,
  profile,
}) {
  const nutrients = [
    { label: "Metabolizable Energy (Kcal/kg)", key: "MEc" },
    { label: "Crude Protein (CP) (%)", key: "CP" },
    { label: "Digestible Lysine (%)", key: "Lys" },
    { label: "Digestible Methionine (%)", key: "Met" },
    { label: "Digestible Met + Cys (%)", key: "MetCys" },
    { label: "Digestible Treonine (%)", key: "Thr" },
    { label: "Digestible Tryptophan (%)", key: "Trp" },
    { label: "Digestible Arginine (%)", key: "Arg" },
    { label: "Digestible Valine (%)", key: "Val" },
    { label: "Digestible Isoleucine (%)", key: "Ile" },
    { label: "Digestible Leucine (%)", key: "Leu" },
    { label: "Digestible Histidine (%)", key: "His" },
    { label: "Digestible Phen +Tyr (%)", key: "PheTyr" },
    { label: "Available Phosphorus (%)", key: "NPP" },
    { label: "Phytic Phosphorus", key: "PP" },
    { label: "Calcium (%)", key: "Ca" },
    { label: "Dry Matter (%)", key: "DM" },
    { label: "WaterHC", key: "WHC" },
  ];

  return (
    <TableContent>
      <Header>
        <tr>
          <th style={{ width: 250 }}>
            {translate("Diet Parameters", profile.language)}
          </th>
          {input.diet.map((item, index) => (
            <th>
              <div style={{ display: "flex", alignItems: "center" }}>
                {translate("Diet", profile.language)} {index + 1}&nbsp;
                <Button
                  type="button"
                  size="sm"
                  bg="danger"
                  border="danger"
                  color="white"
                  onClick={() => removeDiet(index)}
                  style={{ width: 30 }}
                >
                  <FontAwesome
                    type="solid"
                    name="minus"
                    color="white"
                    size={12}
                  />
                </Button>
              </div>
            </th>
          ))}
          <th style={{ width: 50 }}>
            <Button
              type="button"
              size="sm"
              bg="default"
              border="default"
              color="white"
              onClick={addDiet}
            >
              <FontAwesome type="solid" name="plus" color="white" size={12} />
            </Button>
          </th>
        </tr>
      </Header>
      <Body>
        {dietConfig.map(({ label, key }) =>
          key === "FinesFeed" &&
          !input.diet.filter(
            ({ PelletFeed }) => PelletFeed === "Pellet"
          )[0] ? null : (
            <tr key={key}>
              <Td>{translate(label, profile.language)}</Td>
              {input.diet.map((item, index) =>
                key === "PelletFeed" ? (
                  <td style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <CheckboxItems>
                      <Input
                        type="radiobox"
                        label="Mash"
                        item={input}
                        setItem={setInput}
                        params={`diet.${index}.${key}`}
                        value="Mash"
                      />
                      <Input
                        type="radiobox"
                        label="Pellet"
                        item={input}
                        setItem={setInput}
                        params={`diet.${index}.${key}`}
                        value="Pellet"
                      />
                    </CheckboxItems>
                  </td>
                ) : key === "FinesFeed" &&
                  input.diet[index].PelletFeed === "Mash" ? null : (
                  <Td>
                    <InputTable
                      type="inputOnly"
                      inputType="number"
                      item={input}
                      setItem={setInput}
                      params={`diet.${index}.${key}`}
                      placeholder={translate(
                        `Type the ${label}`,
                        profile.language
                      )}
                    />
                  </Td>
                )
              )}
            </tr>
          )
        )}
      </Body>
      <Header>
        <tr>
          <th style={{ width: 250 }}>
            {translate(`Nutrients`, profile.language)}
          </th>
          {input.diet.map((item, index) => (
            <th>
              {" "}
              {translate(`Diet`, profile.language)} {index + 1}
            </th>
          ))}
        </tr>
      </Header>
      <Body>
        {nutrients.map(({ label, key }) => (
          <tr>
            <Td>{translate(label, profile.language)}</Td>
            {input.diet.map((item, index) => (
              <Td>
                <InputTable
                  type="inputOnly"
                  inputType="number"
                  item={input}
                  setItem={setInput}
                  params={`diet.${index}.${key}`}
                  placeholder={
                    translate(`Type the value of `, profile.language) +
                    translate(label, profile.language)
                  }
                />
              </Td>
            ))}
          </tr>
        ))}
      </Body>
    </TableContent>
  );
}

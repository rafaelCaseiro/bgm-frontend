import React from "react";
import { FontAwesome } from "../../../../../../../Components/FontAwesome";
import { Input } from "../../../../../../../Components/Input";
import {
  CheckboxItems,
  Content,
} from "../../../../../../../Components/Input/style";
import { Col, Row } from "../../../../../../../styles";
import { translate } from "../../../../../../../utils/globalFunctions";
import { ShowColumns } from "../../style";

export function InputAndOutputType({
  input,
  setInput,
  customers,
  profile,
  isGenerated,
}) {
  const showColumnsHandler = (key) => {
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.outputItems[key].showColumns =
        !newState.outputItems[key].showColumns;
      return newState;
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Content>
            <label>
              {translate("Select the Simulation type", profile.language)}
            </label>
            <CheckboxItems>
              <Input
                type="radiobox"
                label={translate("Feed Formulator", profile.language)}
                item={input}
                setItem={setInput}
                params="simulationType"
                value="feedFormulator"
              />
              <Input
                type="radiobox"
                label={translate("Input Nutrients", profile.language)}
                item={input}
                setItem={setInput}
                params="simulationType"
                value="nutrients"
              />
              <Input
                type="radiobox"
                label={translate("Input Ingredients", profile.language)}
                item={input}
                setItem={setInput}
                params="simulationType"
                value="ingredients"
              />
            </CheckboxItems>
          </Content>
        </Col>
        <Col>
          <Content>
            <label>
              {translate("Select the Output Type", profile.language)}
            </label>
            <CheckboxItems>
              <Input
                type="radiobox"
                label={translate("Basic", profile.language)}
                item={input}
                setItem={setInput}
                params="outputType"
                value="basic"
              />
              <Input
                type="radiobox"
                label={translate("Customized", profile.language)}
                item={input}
                setItem={setInput}
                params="outputType"
                value="custom"
              />
            </CheckboxItems>
          </Content>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="select"
            item={input}
            setItem={setInput}
            params="customer"
            label={translate("Customer", profile.language)}
            placeholder={translate("Select the customer", profile.language)}
            options={customers.map(({ _id, name }) => ({
              value: _id,
              label: name,
            }))}
          />
        </Col>
        <Col>
          <Input
            type="input"
            item={input}
            setItem={setInput}
            params="nome"
            label={translate("Simulation Name", profile.language)}
            required={isGenerated}
          />
        </Col>

        {+input.population > 1 && (
          <Col>
            <Content>
              <label>
                {translate("Select the Output values type", profile.language)}
              </label>
              <CheckboxItems>
                <Input
                  type="radiobox"
                  label={translate("Individual", profile.language)}
                  item={input}
                  setItem={setInput}
                  params="outputValue"
                  value="individuo"
                />
                <Input
                  type="radiobox"
                  label={translate("Population", profile.language)}
                  item={input}
                  setItem={setInput}
                  params="outputValue"
                  value="populacao"
                />
              </CheckboxItems>
            </Content>{" "}
          </Col>
        )}
      </Row>
      <Content>
        <label>{translate("Select the Output Items", profile.language)}</label>
        {(input.outputType === "custom"
          ? [
              ["bodyComposition", "geneticPotencial", "energyPartititoning"],
              [
                "aminoAcidRequirementsMg",

                "aminoAcidRequirementsPercent",

                "macrominerals",
              ],
              ["performance", "cutYield", "heatProduction"],
              ["performancePotxReal", null, null],
            ]
          : [["basicPerformance", "requeriment", null]]
        ).map((row, index) => (
          <Row key={"row" + index}>
            {row.map((key) => (
              <Col key={key}>
                {key && (
                  <>
                    <Input
                      type="checkbox"
                      label={translate(
                        input.outputItems[key].label,
                        profile.language
                      )}
                      item={input}
                      setItem={setInput}
                      params={`outputItems.${key}.checked`}
                    />
                    {input.outputItems[key].checked && (
                      <ShowColumns
                        type="button"
                        bg="white"
                        border="white"
                        size="sm"
                        onClick={() => showColumnsHandler(key)}
                      >
                        <FontAwesome
                          name={
                            input.outputItems[key].showColumns
                              ? "minus"
                              : "plus"
                          }
                          type="solid"
                          size={8}
                          color="default"
                        />
                      </ShowColumns>
                    )}
                    {input.outputItems[key].showColumns && (
                      <CheckboxItems
                        direction="column"
                        style={{ paddingLeft: 20 }}
                      >
                        {Object.keys(input.outputItems[key].columns).map(
                          (param) => (
                            <Input
                              type="checkbox"
                              label={translate(
                                input.outputItems[key].columns[param].label,
                                profile.language
                              )}
                              item={input}
                              setItem={setInput}
                              params={`outputItems.${key}.columns.${param}.checked`}
                            />
                          )
                        )}
                      </CheckboxItems>
                    )}
                  </>
                )}
              </Col>
            ))}
          </Row>
        ))}
      </Content>
    </>
  );
}

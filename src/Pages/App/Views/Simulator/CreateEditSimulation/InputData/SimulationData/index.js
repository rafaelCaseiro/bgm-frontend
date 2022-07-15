import React from "react";
import { Input } from "../../../../../../../Components/Input";
import {
  CheckboxItems,
  Content,
} from "../../../../../../../Components/Input/style";
import { Col, Row } from "../../../../../../../styles";
import { translate } from "../../../../../../../utils/globalFunctions";

export function SimulationData({
  input,
  setInput,
  animalProfiles,
  feedRestrictionPrograms,
  environmentVariables,
  profile,
}) {
  return (
    <>
      <Row>
        <Col>
          <Input
            type="select"
            label={translate("Animal Profile", profile.language)}
            item={input}
            setItem={setInput}
            params="animalProfile"
            placeholder={translate(
              "Select the Animal Profile",
              profile.language
            )}
            required={true}
            options={animalProfiles
              .filter(({ customer }) =>
                input.customer ? customer === input.customer || !customer : true
              )
              .map(({ _id, nome }) => ({ value: _id, label: nome }))}
          />
        </Col>
        <Col>
          <Input
            type="select"
            label={translate("Feed Restriction Program", profile.language)}
            item={input}
            setItem={setInput}
            params="feedRestrictionProgram"
            placeholder={translate(
              "Select the Feed Restriction Program",
              profile.language
            )}
            options={feedRestrictionPrograms
              .filter(({ customer }) =>
                input.customer ? customer === input.customer || !customer : true
              )
              .map(({ _id, nome }) => ({ value: _id, label: nome }))}
          />
        </Col>
        <Col>
          <Input
            type="select"
            label={translate("Environment", profile.language)}
            item={input}
            setItem={setInput}
            params="environment"
            placeholder={translate("Select the Environment", profile.language)}
            required={true}
            options={environmentVariables
              .filter(({ customer }) =>
                input.customer ? customer === input.customer || !customer : true
              )
              .map(({ _id, nome }) => ({ value: _id, label: nome }))}
          />
        </Col>
        <Col>
          <Input
            type="input"
            inputType="number"
            label={translate("One Day Old Weight(g)", profile.language)}
            item={input}
            setItem={setInput}
            params="initialWeight"
            placeholder={translate("Initial Weight", profile.language)}
            required={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="select"
            label={translate("Condition", profile.language)}
            item={input}
            setItem={setInput}
            params="condition"
            required={true}
            options={[
              { value: "age", label: translate("Age (d)", profile.language) },
              {
                value: "weight",
                label: translate("Weight (g)", profile.language),
              },
            ]}
          />
        </Col>
        <Col>
          <Input
            type="input"
            inputType="number"
            label={translate(`Population`, profile.language)}
            item={input}
            setItem={setInput}
            params="population"
            placeholder="population"
            required={true}
          />
        </Col>
        <Col>
          <Input
            type="input"
            inputType="number"
            label={translate(`Initial Condition`, profile.language)}
            item={input}
            setItem={setInput}
            params="start"
            placeholder={translate(
              input.condition === "age"
                ? "Initial Age (d)"
                : "Initial Weight (g)",
              profile.language
            )}
            required={true}
          />
        </Col>
        <Col>
          <Input
            type="input"
            inputType="number"
            label={translate(`Final Condition`, profile.language)}
            item={input}
            setItem={setInput}
            params="end"
            placeholder={translate(
              input.condition === "age" ? "Final Age (d)" : "Final Weight (g)",
              profile.language
            )}
            required={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="input"
            inputType="number"
            label={translate(`Feed Digestiblity`, profile.language)}
            item={input}
            setItem={setInput}
            params="feedDigestiblity"
            required={true}
          />
        </Col>
        <Col>
          <Content>
            <label>{translate(`Health Problem`, profile.language)}</label>
            <CheckboxItems>
              <Input
                type="radiobox"
                label={translate("Coccidia", profile.language)}
                item={input}
                setItem={setInput}
                params="healthProblem"
                value="coccidia"
              />
              <Input
                type="radiobox"
                label={translate("General", profile.language)}
                item={input}
                setItem={setInput}
                params="healthProblem"
                value="general"
              />
            </CheckboxItems>
          </Content>
        </Col>
        {input.healthProblem === "general" && (
          <Col>
            <Input
              type="input"
              inputType="number"
              label={translate(`Health Status`, profile.language)}
              item={input}
              setItem={setInput}
              params="hpStatus"
              max={1}
              min={0}
              required={true}
            />
          </Col>
        )}
        <Col>
          {input.simulationType === "feedFormulator" ||
          input.simulationType === "ingredients" ? (
            <Input
              type="select"
              label={translate("Mash or Pellet?", profile.language)}
              item={input}
              setItem={setInput}
              params="pelletFeed"
              required={true}
              options={[{ value: "Mash" }, { value: "Pellet" }]}
            />
          ) : null}
        </Col>
        <Col>
          {(input.simulationType === "feedFormulator" ||
            input.simulationType === "ingredients") &&
          input.pelletFeed === "Pellet" ? (
            <Input
              type="input"
              label={translate("% Fines", profile.language)}
              item={input}
              setItem={setInput}
              params="percFines"
              placeholder="% Fines"
              min={0}
              max={100}
              required={true}
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
}

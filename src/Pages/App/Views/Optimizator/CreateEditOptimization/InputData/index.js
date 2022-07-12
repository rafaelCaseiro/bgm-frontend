import React from "react";
import Loading from "react-loading";
import { Button } from "../../../../../../Components/Button";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import { Input } from "../../../../../../Components/Input";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../Components/Table/style";
import { ButtonContent, Col, Row, Separator } from "../../../../../../styles";
import {
  convertNumberToString,
  translate,
} from "../../../../../../utils/globalFunctions";
import { InputTable } from "./style";

export function InputData({
  customers,
  simulations,
  input,
  setInput,
  profile,
  loading,
  optimize,
}) {
  const dietComponents = {
    lisinaDig: translate("Digestible Lysine (%)", profile.language),
    relIdeal: translate("Balanced Protein (%)", profile.language),
    energiaMetAves: translate(
      "Metabolizable Energy (kcal/kg)",
      profile.language
    ),
  };

  const simulationHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setInput((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.data.diets = simulations
        .filter(({ _id }) => _id === value)[0]
        .dietProgram.dietas.map(() => ({ min: "", max: "" }));
      newState.data.simulation = value;
      console.log(newState);
      return newState;
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Input
            type="select"
            item={input}
            setItem={setInput}
            params="data.customer"
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
            type="select"
            onChange={simulationHandler}
            value={input.data.simulation}
            required
            label={translate("Simulation", profile.language)}
            placeholder={translate("Select the Simulation", profile.language)}
            options={simulations
              .filter(({ customer }) =>
                input.data.customer
                  ? customer === input.data.customer || !customer
                  : true
              )
              .map(({ _id, nome }) => ({ value: _id, label: nome }))}
          />
        </Col>
        <Col>
          <Input
            type="select"
            item={input}
            setItem={setInput}
            params="data.dComponent"
            required
            label={translate("Diet Component", profile.language)}
            placeholder={translate(
              "Select the Diet Component",
              profile.language
            )}
            options={Object.entries(dietComponents).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </Col>
      </Row>
      <Separator />
      {input.data.simulation && input.data.dComponent ? (
        <>
          <TableContent className="table-center table-no-padding">
            <Header>
              <tr>
                <th>{translate("Diets", profile.language)}</th>
                <th>{translate("End Age", profile.language)}</th>
                <th>{dietComponents[input.data.dComponent]}</th>
                <th>{translate("Minimum", profile.language)}</th>
                <th>{translate("Maximum", profile.language)}</th>
              </tr>
            </Header>
            <Body>
              {simulations
                .filter(({ _id }) => input.data.simulation === _id)[0]
                .dietProgram.dietas.map(({ dieta, value, fim }, index) => (
                  <tr>
                    <td>{dieta.nome}</td>
                    <td>
                      {fim
                        ? translate("End of Program", profile.language)
                        : value}
                    </td>
                    <td>
                      {input.data.dComponent === "energiaMetAves"
                        ? convertNumberToString(
                            dieta.composicao.filter(
                              ({ nomeDB }) => nomeDB === "energiaMetAves"
                            )[0].valor * 1000,
                            0
                          )
                        : convertNumberToString(
                            dieta.aminoacidos.filter(
                              ({ nomeDB }) => nomeDB === "lisinaDig"
                            )[0].valor,
                            3
                          )}
                    </td>
                    <td>
                      <InputTable
                        inputType="number"
                        type="inputOnly"
                        placeholder="(%)"
                        item={input}
                        setItem={setInput}
                        params={`data.diets.${index}.min`}
                        required
                      />
                    </td>
                    <td>
                      <InputTable
                        inputType="number"
                        type="inputOnly"
                        placeholder="(%)"
                        item={input}
                        setItem={setInput}
                        params={`data.diets.${index}.max`}
                        required
                      />
                    </td>
                  </tr>
                ))}
            </Body>
          </TableContent>
        </>
      ) : null}

      <TableContent className="table-center table-no-padding">
        <Header>
          <tr>
            <th colSpan={8}>
              {translate("Economic values ($/kg)", profile.language)}
            </th>
          </tr>
          <tr>
            <th style={{ width: 145 }}></th>
            <th>{translate("Live Body Weight", profile.language)}</th>
            <th>{translate("Carcass", profile.language)}</th>
            <th>{translate("Breast", profile.language)}</th>
            <th>{translate("Thigh", profile.language)}</th>
            <th>{translate("Drumstick", profile.language)}</th>
            <th>{translate("Wing", profile.language)}</th>
            <th>{translate("Remaining", profile.language)}</th>
          </tr>
        </Header>
        <Body>
          <tr>
            <th>{translate("Live Body Weight", profile.language)}</th>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.liveWeight"
                required
              />
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th>{translate("Carcass", profile.language)}</th>
            <td>-</td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.carcass"
                required
              />
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.remainingCarcass"
                required
              />
            </td>
          </tr>
          <tr>
            <th>{translate("Cuts", profile.language)}</th>
            <td>-</td>

            <td>-</td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.breast"
                required
              />
            </td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.thigh"
                required
              />
            </td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.drum"
                required
              />
            </td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.wing"
                required
              />
            </td>
            <td>
              <InputTable
                inputType="number"
                type="inputOnly"
                placeholder="($/kg)"
                item={input}
                setItem={setInput}
                params="price.remainingCuts"
                required
              />
            </td>
          </tr>
        </Body>
      </TableContent>
      <Separator style={{ marginTop: 20 }} />
      <ButtonContent>
        <Button
          type="button"
          onClick={optimize}
          bg="default"
          border="default"
          color="white"
          style={{ width: "auto" }}
        >
          {loading ? (
            <>
              <Loading
                style={{
                  fill: "#fff",
                  height: "15px",
                  width: "13px",
                  display: "inline-table",
                }}
                type="spin"
                color="#fff"
                height={19}
                width={19}
              />
              &nbsp; Aguarde...
            </>
          ) : (
            <>
              {translate("Optimize", profile.language)}
              &nbsp;{" "}
              <FontAwesome type="solid" name="gears" size="12" color="white" />
            </>
          )}
        </Button>
      </ButtonContent>
    </>
  );
}

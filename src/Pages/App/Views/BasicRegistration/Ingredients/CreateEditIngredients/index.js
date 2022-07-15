import { useState } from "react";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../../../../../Components/Button";
import { Input } from "../../../../../../Components/Input";
import { SubHeader } from "../../../../../../Components/SubHeader";
import Profile from "../../../../../../contexts/profile";
import { api } from "../../../../../../services/api";
import {
  Block,
  BlockBody,
  BlockHeader,
  Col,
  Row,
  Separator,
} from "../../../../../../styles";
import {
  convertNumberToString,
  translate,
} from "../../../../../../utils/globalFunctions";

import { useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../../Components/FontAwesome";
import {
  Body,
  Header,
  TableContent,
} from "../../../../../../Components/Table/style";
import { InputTable, Td } from "../../../Simulator/CreateEditSimulation/style";

export function CreateEditIngredient(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState({
    nome: "",
    preco: "",
    composicao: {
      fibraBruta: "",
      fdn: "",
      fda: "",
      materiaSeca: "",
      proteinaBrutaPB: "",
      coefDigPBAves: "",
      pBDigestivelAves: "",
      energiaBruta: "",
      energiaMetAves: "",
      energiaMetVerdAves: "",
      energiaEfetivaAves: "",
      gordura: "",
      coefDigGordura: "",
      gorduraDigAves: "",
      materiaOrganica: "",
      materiaMineral: "",
      potassio: "",
      sodio: "",
      cloro: "",
      balancoEletrolico: "",
      pTotal: "",
      pDisp: "",
      ca: "",
      crudFiber: "",
      waterHC: "",
    },
    aminoacidos: {
      lisinaTotal: "",
      metioninaTotal: "",
      metCisTotal: "",
      treoninaTotal: "",
      triptofanoTotal: "",
      argininaTotal: "",
      gliSerTotal: "",
      valinaTotal: "",
      isoleucinaTotal: "",
      leucinaTotal: "",
      histidinaTotal: "",
      felaninaTotal: "",
      fenTirTotal: "",
      lisinaDig: "",
      metioninaDig: "",
      metCisDig: "",
      treoninaDig: "",
      triptofanoDig: "",
      argininaDig: "",
      gliSerDig: "",
      valinaDig: "",
      isoleucinaDig: "",
      leucinaDig: "",
      histidinaDig: "",
      felaninaDig: "",
      fenTirDig: "",
    },
    status: true,
    customer: {
      name: "",
    },
  });

  const elementarComposition = [
    { label: "Crude Fiber (%)", key: "crudFiber" },
    {
      label: "WaterHC",
      key: "waterHC",
      calc: true,
      value:
        1 /
        (-80.86 +
          0.97 * ingredient.composicao.materiaSeca +
          0.18 * ingredient.composicao.crudFiber),
    },
    { label: "Dry Matter (%)", key: "materiaSeca" },
    { label: "Crude Protein (CP) (%)", key: "proteinaBrutaPB" },
    { label: "Coef. Dig. CP (%)", key: "coefDigPBAves" },
    {
      label: "Digestible CP (%)",
      key: "pBDigestivelAves",
      value:
        (ingredient.composicao.proteinaBrutaPB *
          ingredient.composicao.coefDigPBAves) /
        100,
    },
    { label: "Gross Energy (Kcal/kg)", key: "energiaBruta" },
    { label: "Metabolizable Energy (Kcal/kg)", key: "energiaMetAves" },
    { label: "True Met. Energy (Kcal/kg)", key: "energiaMetVerdAves" },
    {
      label: "Effective Energy (MJ/kg)",
      key: "energiaEfetivaAves",
      calc: true,
      value:
        (-0.0467 * ingredient.composicao.pBDigestivelAves * 10 -
          0.038 *
            (ingredient.composicao.materiaOrganica * 10 -
              (ingredient.composicao.pBDigestivelAves * 10 +
                ingredient.composicao.gorduraDigAves * 10 +
                (ingredient.composicao.energiaMetAves * 0.004187 -
                  ingredient.composicao.pBDigestivelAves * 10 * 0.0182 -
                  ingredient.composicao.gorduraDigAves * 10 * 0.0396) /
                  0.0172)) +
          0.036 * ingredient.composicao.gorduraDigAves * 10) /
          10 +
        ingredient.composicao.energiaMetAves * 0.004187,
    },
    { label: "Fat (%)", key: "gordura" },
    { label: "Coef. Dig. Fat (%)", key: "coefDigGordura" },
    {
      label: "Digestible Fat (%)",
      key: "gorduraDigAves",
      calc: true,
      value:
        (ingredient.composicao.gordura * ingredient.composicao.coefDigGordura) /
        100,
    },
    { label: "Organic Matter (OM) (%)", key: "materiaOrganica" },
    { label: "Mineral (%)", key: "materiaMineral" },
    { label: "Potassium (%)", key: "potassio" },
    { label: "Sodium (%)", key: "sodio" },
    { label: "Chloride (%)", key: "cloro" },
    {
      label: "Eletrolitic Balance (mEq/kg)",
      key: "balancoEletrolico",
      value:
        (ingredient.composicao.potassio
          ? (ingredient.composicao.potassio * 10000) / 39.0983
          : 0) +
          (ingredient.composicao.sodio
            ? (ingredient.composicao.sodio * 10000) / 22.98977
            : 0) -
          (ingredient.composicao.cloro
            ? (ingredient.composicao.cloro * 10000) / 35.4527
            : 0) || 0,
      calc: true,
    },
    { label: "Total Phosphorus (%)", key: "pTotal" },
    { label: "Available Phosphorus (%)", key: "pDisp" },
    { label: "Calcium (%)", key: "ca" },
  ];

  const aminoacids = [
    { label: "Digestible Lysine (%)", key: "lisinaDig" },
    { label: "Digestible Methionine (%)", key: "metioninaDig" },
    { label: "Digestible Met + Cys (%)", key: "metCisDig" },
    { label: "Digestible Treonine (%)", key: "treoninaDig" },
    { label: "Digestible Tryptophan (%)", key: "triptofanoDig" },
    { label: "Digestible Arginine (%)", key: "argininaDig" },
    { label: "Digestible Gli + Ser (%)", key: "gliSerDig" },
    { label: "Digestible Valine (%)", key: "valinaDig" },
    { label: "Digestible Isoleucine (%)", key: "isoleucinaDig" },
    { label: "Digestible Leucine (%)", key: "leucinaDig" },
    { label: "Digestible Histidine (%)", key: "histidinaDig" },
    { label: "Digestible Phenilalanine (%)", key: "felaninaDig" },
    { label: "Digestible Phen +Tyr (%)", key: "fenTirDig" },
  ];

  const [getIngredient, setGetIngredient] = useState(true);

  const saveIngredient = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(ingredient));
      elementarComposition
        .filter(({ calc }) => calc)
        .forEach(({ key, value }) => {
          query.composicao[key] = value;
        });

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Ingredient", profile.language),
          text: translate(
            "Do you want to confirm ingredient creation?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Create Ingredient",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("ingredient", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Ingredient", profile.language),
              translate("Error saving Ingredient", profile.language),
              "error"
            );
          }
          Swal.fire(
            translate("Create Ingredient", profile.language),
            translate(response.value.data.message, profile.language),
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/ingredient/edit/" + response.value.data.id,
            {
              replace: true,
            }
          );
          setGetIngredient(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Ingredient", profile.language),
          text: translate(
            "Do you want to confirm ingredient edit?",
            profile.language
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          cancelButtonText: translate("Cancel", profile.language),
          confirmButtonText: translate(
            "Yes, Edit Ingredient",
            profile.language
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.put("ingredient/" + params.id, query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Ingredient", profile.language),
            translate(response.value.data.message, profile.language),
            response.value.err ? "error" : "success"
          );
          setGetIngredient(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Ingredient", profile.language),
        translate("Error saving ingredient", profile.language),
        "error"
      );
      setGetIngredient(true);
    }
  };

  useEffect(() => {
    const loadIngredient = async () => {
      if (params.id) {
        const responseIngredient = await api
          .get(`ingredient/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseIngredient.data) {
          return Swal.fire(
            translate("Edit Ingredient", profile.language),
            translate("Error to search ingredients", profile.language),
            "error"
          );
        }

        setIngredient(responseIngredient.data);
      }
    };
    if (getIngredient) {
      setGetIngredient(false);
      loadIngredient();
    }
  }, [getIngredient, params, navigate, profile]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Ingredient", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Ingredients", profile.language),
            to: "/basicregistration/ingredient/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Ingredient",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="database" size="24" color="text" />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Ingredient data", profile.language)}
          <Input
            type="switch"
            item={ingredient}
            setItem={setIngredient}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveIngredient(e)}>
            <Row>
              <Col>
                <Input
                  type="input"
                  item={ingredient}
                  setItem={setIngredient}
                  params="nome"
                  label={translate("Ingredient Name", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={ingredient}
                  setItem={setIngredient}
                  params="preco"
                  label={translate("Price", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  item={ingredient}
                  setItem={setIngredient}
                  params={`customer`}
                  type="autocomplete"
                  label={translate("Customer", profile.language)}
                  paramsGet={["name"]}
                  paramsLabel={["name"]}
                  select={"name"}
                  model={"customer"}
                  placeholder={translate(
                    "Type the customer name",
                    profile.language
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TableContent style={{ width: "100%" }}>
                  <Header>
                    <tr>
                      <th>
                        {translate("Elementar Composition", profile.language)}
                      </th>

                      <th>{translate("Value", profile.language)}</th>
                    </tr>
                  </Header>
                  <Body>
                    {elementarComposition.map(({ label, key, calc, value }) => (
                      <tr key={key}>
                        <Td>{translate(label, profile.language)}</Td>
                        <Td>
                          {calc ? (
                            <div
                              style={{
                                paddingLeft: 15,
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}
                            >
                              {convertNumberToString(value, 3)}
                            </div>
                          ) : (
                            <InputTable
                              type="inputOnly"
                              inputType="number"
                              item={ingredient}
                              setItem={setIngredient}
                              params={`composicao.${key}`}
                              placeholder={translate(
                                `Type the value`,
                                profile.language
                              )}
                            />
                          )}
                        </Td>
                      </tr>
                    ))}
                  </Body>
                </TableContent>
              </Col>
              <Col>
                <TableContent style={{ width: "100%" }}>
                  <Header>
                    <tr>
                      <th>{translate("Aminoacids", profile.language)}</th>

                      <th>{translate("Value", profile.language)}</th>
                    </tr>
                  </Header>
                  <Body>
                    {aminoacids.map(({ label, key }) => (
                      <tr>
                        <Td>{translate(label, profile.language)}</Td>
                        <Td>
                          <InputTable
                            type="inputOnly"
                            inputType="number"
                            item={ingredient}
                            setItem={setIngredient}
                            params={`aminoacidos.${key}`}
                            placeholder={translate(
                              `Type the value`,
                              profile.language
                            )}
                          />
                        </Td>
                      </tr>
                    ))}
                  </Body>
                </TableContent>
              </Col>
            </Row>
            <Separator />
            <Row>
              <Col style={{ alignItems: "center" }}>
                <Button
                  notFull
                  type="submit"
                  bg="default"
                  border="default"
                  color="white"
                >
                  {translate("Save", profile.language)}
                  &nbsp;
                </Button>
              </Col>
            </Row>
          </form>
        </BlockBody>
      </Block>
    </>
  );
}

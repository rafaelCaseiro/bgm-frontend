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
import { translate } from "../../../../../../utils/globalFunctions";

import { useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../../Components/FontAwesome";

export function CreateEditAnimalProfile(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [animalProfile, setAnimalProfile] = useState({
    coefEnerg: "",
    taxaProt: "",
    protMatur: "",
    lipProtMatur: "",
    taxaProtAjust: "",
    taxaProtPenas: "",
    protPenasMatur: "",
    coefA: "",
    coefB: "",
    bodyFatA: "",
    bodyFatB: "",
    mineralA: "",
    MineralB: "",
    idadeIni: "",
    pesoIni: "",
    idadeFinal: "",
    pesoFinal: "",
    customer: null,
    status: true,
  });

  const [getAnimalProfile, setGetAnimalProfile] = useState(true);

  const saveAnimalProfile = async (e) => {
    try {
      e.preventDefault();
      const query = JSON.parse(JSON.stringify(animalProfile));

      if (!params.id) {
        const response = await Swal.fire({
          title: translate("Create Animal Profile", profile.translate),
          text: translate(
            "Do you want to confirm Animal Profile creation",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Create Animal Profile!",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.post("animalprofile", query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          if (response.value.err) {
            return Swal.fire(
              translate("Save Animal Profile", profile.translate),
              translate("Error saving Animal Profile", profile.translate),
              "error"
            );
          }
          Swal.fire(
            translate("Create Animal Profile", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          navigate(
            "/basicregistration/animalprofile/edit/" + response.value.data.id,
            {
              replace: true,
            }
          );
          setGetAnimalProfile(true);
        }
      } else {
        const response = await Swal.fire({
          title: translate("Edit Animal Profile", profile.translate),
          text: translate(
            "Do you want to confirm Animal Profile edit",
            profile.translate
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0451e8",
          cancelButtonColor: "#d33",
          confirmButtonText: translate(
            "Yes, Edit Animal Profile",
            profile.translate
          ),
          showLoaderOnConfirm: true,
          preConfirm: async () =>
            await api.put("animalprofile/" + params.id, query).catch((err) => ({
              err: true,
              data: { message: err.response.data.message },
            })),
        });
        if (response.value) {
          Swal.fire(
            translate("Edit Animal Profile", profile.translate),
            response.value.data.message,
            response.value.err ? "error" : "success"
          );
          setGetAnimalProfile(true);
        }
      }
    } catch (e) {
      Swal.fire(
        translate("Edit Animal Profile", profile.translate),
        translate("Error saving Animal Profile", profile.translate),
        "error"
      );
      setGetAnimalProfile(true);
    }
  };

  useEffect(() => {
    const loadAnimalProfile = async () => {
      if (params.id) {
        const responseAnimalProfile = await api
          .get(`animalprofile/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseAnimalProfile.data) {
          return Swal.fire(
            translate("Edit Animal Profile", profile.translate),
            translate("Error to search AnimalProfiles", profile.translate),
            "error"
          );
        }

        setAnimalProfile(responseAnimalProfile.data);
      }
    };
    if (getAnimalProfile) {
      setGetAnimalProfile(false);
      loadAnimalProfile();
    }
  }, [getAnimalProfile, params, navigate, profile]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Animal Profile", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Animal Profiles List", profile.language),
            to: "/basicregistration/animalprofile/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Animal Profile",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="kiwi-bird" size="24" color="text" />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Animal Profile data", profile.translate)}
          <Input
            type="switch"
            item={animalProfile}
            setItem={setAnimalProfile}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveAnimalProfile(e)}>
            <Row>
              <Col>
                <Input
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="nome"
                  required
                  label={translate("Animal Profile Name", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  item={animalProfile}
                  setItem={setAnimalProfile}
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
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="pesoIni"
                  required
                  label={translate("Peso Initial (g)", profile.language)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="taxaProt"
                  required
                  label={translate("Protein dep. Ratio (d)", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="protMatur"
                  required
                  label={translate("Maturity Protein (g)", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="lipProtMatur"
                  required
                  label={translate(
                    "Lipid / Protein ratio at Maturity",
                    profile.language
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="taxaProtPenas"
                  required
                  label={translate(
                    "Feather Protein dep. Ratio (d)",
                    profile.language
                  )}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="protPenasMatur"
                  required
                  label={translate(
                    "Feather Maturity Protein (g)",
                    profile.language
                  )}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="coefA"
                  required
                  label={translate(
                    "Coef. a (Water / Protein)",
                    profile.language
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="coefB"
                  required
                  label={translate(
                    "Coef. b (Water / Protein)",
                    profile.language
                  )}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="mineralA"
                  required
                  label={translate("Mineral a (g)", profile.language)}
                />
              </Col>
              <Col>
                <Input
                  inputType="number"
                  type="input"
                  item={animalProfile}
                  setItem={setAnimalProfile}
                  params="MineralB"
                  required
                  label={translate("Mineral b (g)", profile.language)}
                />
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

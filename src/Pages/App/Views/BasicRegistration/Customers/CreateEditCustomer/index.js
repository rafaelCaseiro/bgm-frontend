import { useState } from "react";
import { useCallback, useContext, useEffect } from "react";
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

export function CreateEditCustomer(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    cnpj: "",
    state: "",
    city: "",
    phoneNumber: "",
    email: "",
    responsable: "",
    user: null,
    status: true,
    _id: "",
  });

  const [getCustomer, setGetCustomer] = useState(true);

  const saveCustomer = async (e) => {
    e.preventDefault();

    if (!params.id) {
      const response = await Swal.fire({
        title: translate("Create Customer", profile.language),
        text: translate(
          "Do you want to confirm customer creation?",
          profile.language
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0451e8",
        cancelButtonColor: "#d33",
        cancelButtonText: translate("Cancel", profile.language),
        confirmButtonText: translate("Yes, Create Customer", profile.language),
        showLoaderOnConfirm: true,
        preConfirm: async () =>
          await api.post("customer", customer).catch((err) => ({
            err: true,
            data: { message: err.response.data.message },
          })),
      });
      if (response.value) {
        if (response.value.err) {
          return navigate("/404");
        }
        Swal.fire(
          translate("Create Customer", profile.language),
          translate(response.value.data.message, profile.language),
          response.value.err ? "error" : "success"
        );
        navigate("/basicregistration/customer/edit/" + response.value.data.id, {
          replace: true,
        });
        setGetCustomer(true);
      }
    } else {
      const response = await Swal.fire({
        title: translate("Edit Customer", profile.language),
        text: translate(
          "Do you want to confirm customer edit?",
          profile.language
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0451e8",
        cancelButtonColor: "#d33",
        cancelButtonText: translate("Cancel", profile.language),
        confirmButtonText: translate("Yes, Edit Customer", profile.language),
        showLoaderOnConfirm: true,
        preConfirm: async () =>
          await api.put("customer/" + params.id, customer).catch((err) => ({
            err: true,
            data: { message: err.response.data.message },
          })),
      });
      if (response.value) {
        Swal.fire(
          translate("Edit Customer", profile.language),
          translate(response.value.data.message, profile.language),
          response.value.err ? "error" : "success"
        );
        setGetCustomer(true);
      }
    }
  };

  useEffect(() => {
    const loadCustomer = async () => {
      if (params.id) {
        const responseCustomer = await api
          .get(`customer/${params.id}`)
          .catch(() => ({ data: false }));
        if (!responseCustomer.data) {
          return navigate("/404");
        }
        setCustomer(responseCustomer.data);
      }
    };
    if (getCustomer) {
      setGetCustomer(false);
      loadCustomer();
    }
  }, [getCustomer, params, navigate]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate("Customer", profile.language)}
        breadcrumbs={[
          { label: translate("Basic Registration", profile.language) },
          {
            label: translate("Customers", profile.language),
            to: "/basicregistration/customer/1/30/index/{}",
          },
          {
            label: translate(
              (params.id ? "Edit " : "Create ") + "Customer",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome
            type="solid"
            name="address-book"
            size="24"
            color="text"
          />
        }
      />
      <Block className="animate__animated animate__fadeInUp">
        <BlockHeader>
          {translate("Fill in Customer data", profile.language)}
          <Input
            type="switch"
            item={customer}
            setItem={setCustomer}
            params="status"
            label="status"
            labelPlacement="start"
          />
        </BlockHeader>
        <BlockBody>
          <form onSubmit={(e) => saveCustomer(e)}>
            <>
              <Row>
                <Col>
                  <Input
                    type="input"
                    item={customer}
                    setItem={setCustomer}
                    params="name"
                    label={translate("Name", profile.language)}
                    placeholder={translate("Name", profile.language)}
                    required={true}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    inputType="email"
                    item={customer}
                    setItem={setCustomer}
                    params="email"
                    label="E-mail"
                    placeholder="E-mail"
                    required={true}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    item={customer}
                    setItem={setCustomer}
                    params="state"
                    label={translate("State", profile.language)}
                    placeholder={translate("State", profile.language)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    type="input"
                    item={customer}
                    setItem={setCustomer}
                    params="city"
                    label={translate("City", profile.language)}
                    placeholder={translate("City", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    mask="phoneNumber"
                    item={customer}
                    setItem={setCustomer}
                    params="phoneNumber"
                    label={translate("Phone Number", profile.language)}
                    placeholder={translate("Phone Number", profile.language)}
                  />
                </Col>
                <Col>
                  <Input
                    type="input"
                    item={customer}
                    setItem={setCustomer}
                    params="responsible"
                    label={translate("Responsible", profile.language)}
                    placeholder={translate("Responsible", profile.language)}
                  />
                </Col>
              </Row>
            </>
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
                </Button>
              </Col>
            </Row>
          </form>
        </BlockBody>
      </Block>
    </>
  );
}

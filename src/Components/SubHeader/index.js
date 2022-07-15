import { format } from "date-fns";
import React, { useCallback, useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../services/api";
import { Button } from "../Button";
import saveAs from "file-saver";
import ReactLoading from "react-loading";
import {
  Breadcrumbs,
  Container,
  Main,
  Separator,
  Title,
  Toolbar,
} from "./style";
import { getRoutePath, translate } from "../../utils/globalFunctions";
import Profile from "../../contexts/profile";

export function SubHeader({
  title,
  breadcrumbs,
  icon,
  toolbar,
  route,
  newLabel,
  newLink,
  subHeaderData,
  exportReport,
  otherButtons,
}) {
  const { profile } = useContext(Profile);

  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const path = getRoutePath(location, params);

  const [loadExport, setLoadExport] = useState(false);

  const exportPDF = useCallback(async () => {
    setLoadExport(true);
    const response = await api
      .get(`export/pdf/${route}`, {
        params: { ...params },
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
        },
      })
      .catch((err) => err);
    setLoadExport(false);
    if (!response.data) {
      return Swal.fire("Erro", response.message, "error");
    }
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });
    saveAs(
      blob,
      `Relatório-de-${title}-${format(new Date(), "yyyy-MM-dd-hh:mm:ss")}.pdf`
    );
    document.getElementById("root").click();
  }, [title, params, route]);

  const toobarConfig = {
    exportPDF: (
      <span key="pdf" onClick={exportPDF}>
        Exportar PDF
      </span>
    ),
    exportReport: (
      <span key="pdf" onClick={exportReport}>
        Exportar Relatório
      </span>
    ),
  };

  const onClear = () => {
    navigate(
      path
        .replace(":page", "1")
        .replace(":limit", params.limit)
        .replace(":sort", params.sort)
        .replace(":query", "{}")
        .replace(":id", params.id)
    );
  };

  return (
    <Container>
      <Main className="animate__animated animate__fadeInLeft">
        <Title>{title}</Title>
        <Breadcrumbs>
          {icon}
          {breadcrumbs.map(({ label, to }, index) => (
            <React.Fragment key={label + index}>
              <Separator />
              {to ? (
                <Link key={label + index} to={to}>
                  {label}
                </Link>
              ) : (
                <span key={label + index}>{label}</span>
              )}
            </React.Fragment>
          ))}
          {params?.query && params?.query !== "{}" ? (
            <>
              <Separator />
              <Button
                notFull={true}
                bg="warning"
                border="warning"
                style={{ height: "20px", fontSize: "10px" }}
                color="white"
                onClick={subHeaderData?.onClear || onClear}
              >
                Limpar Filtro
              </Button>
            </>
          ) : null}
        </Breadcrumbs>
      </Main>
      <Toolbar className="animate__animated animate__fadeInRight">
        {otherButtons &&
          otherButtons.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        {toolbar && (
          <Button
            type="button"
            bg="white"
            color="black"
            border="white"
            dropdown={toolbar.map((key, index) => (
              <React.Fragment key={key + index}>
                {toobarConfig[key]}
              </React.Fragment>
            ))}
            loading={loadExport.toString()}
          >
            {loadExport
              ? [
                  "Aguarde",
                  <>&nbsp;</>,
                  <ReactLoading
                    type="spin"
                    color="#009870"
                    height={15}
                    width={15}
                  />,
                ]
              : "Opções"}
          </Button>
        )}
        {newLink && (
          <Button
            type="button"
            bg="primary"
            color="white"
            border="primary"
            to={newLink}
          >
            {newLabel}
          </Button>
        )}

        <Button
          bg="white"
          color="text"
          border="text"
          onClick={() => navigate(-1)}
        >
          {translate("Back", profile.language)}
        </Button>
      </Toolbar>
    </Container>
  );
}

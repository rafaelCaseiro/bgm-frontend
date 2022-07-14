import { Tab, Tabs } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Loading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesome } from "../../../../../Components/FontAwesome";
import { SubHeader } from "../../../../../Components/SubHeader";
import Profile from "../../../../../contexts/profile";
import { api } from "../../../../../services/api";
import { Block, BlockBody } from "../../../../../styles";
import { translate } from "../../../../../utils/globalFunctions";
import { InputData } from "./InputData";

export function CreateEditOptimization(props) {
  const { profile } = useContext(Profile);

  const params = useParams();

  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState(0);

  const [customers, setCustomers] = useState([]);

  const [simulations, setSimulations] = useState([]);

  const [input, setInput] = useState({
    data: {
      simulation: "",
      customer: "",
      dComponent: "",
      flockOut: "",
      diets: [],
    },
    price: {
      liveWeight: "",
      breast: "",
      thigh: "",
      drum: "",
      wing: "",
      carcass: "",
      remainingCarcass: "",
      remainingCuts: "",
    },
  });

  const [getData, setGetData] = useState(true);

  const [resultados, setResultados] = useState([]);

  const [index, setIndex] = useState(0);

  const [exp, setExp] = useState(0);

  const [responseTimeMs, setResponseTimeMs] = useState(0);

  const [progress, setProgress] = useState(0);

  const [cntr, setCntr] = useState(0);

  const optimize = async () => {
    try {
      const responseFormulas = await api.post("optimizearray", input);
      if (!responseFormulas.data.variacoes[0]) {
        return;
      }
      const simulacoes = responseFormulas.data;
      setExp(simulacoes.variacoes.length);
      function next() {
        if (cntr < simulacoes.variacoes.length) {
          /*  postOtimizacao(
            JSON.parse(JSON.stringify(input)),
            simulacoes.variacoes[cntr++],
            simulacoes,
            cntr
          ).then(next); */
        }
      }

      next();
    } catch (e) {}
  };

  /*   async function postOtimizacao(simulacao, item, simulacoes, cont) {
    item.forEach(function (item, index) {
      simulacao.pDieta.dietas[index].dieta =
        simulacoes.pDieta[index].dietas[item];
    });
    var sendDate = new Date().getTime();
       api.post(simulacao, "otimizacao").then(
      function (res) {
        var receiveDate = new Date().getTime();
        $scope.responseTimeMs =
          $scope.responseTimeMs + (receiveDate - sendDate);
        var media = $scope.responseTimeMs / cont;
        var msRestante = media * $scope.exp - $scope.responseTimeMs;
        if (msRestante > 86400000) {
          $scope.progressTime =
            Math.round(msRestante / 86400000) +
            (Math.round(msRestante / 86400000) > 1
              ? " remaining days"
              : " remaining day");
        } else if (msRestante > 3600000) {
          $scope.progressTime =
            Math.round(msRestante / 3600000) +
            (Math.round(msRestante / 3600000) > 1
              ? " remaining hours"
              : " remaining hour");
        } else if (msRestante > 60000) {
          $scope.progressTime =
            Math.round(msRestante / 60000) +
            (Math.round(msRestante / 60000) > 1
              ? " remaining minutes"
              : " remaining minute");
        } else if (msRestante > 1000) {
          $scope.progressTime =
            Math.round(msRestante / 1000) +
            (Math.round(msRestante / 1000) > 1
              ? " remaining seconds"
              : " remaining second");
        }
        deferred.resolve(res);
        $scope.resultados.push(res);
        $scope.index++;
        $scope.progress =
          Math.round(($scope.index / $scope.exp) * 100 * 100) / 100;
        if ($scope.index === $scope.exp) {
          $scope.otimizacao = {
            individuo: getBestpDieta($scope.resultados, "individuo"),
          };
          console.log($scope.otimizacao);
          $scope.dataToSave = {
            input: JSON.parse(JSON.stringify($scope.post)),
            otimizacao: JSON.parse(JSON.stringify($scope.otimizacao)),
          };
          $scope.aguarde = false;
          $scope.otimizado = true;
          $scope.selectedIndex = 1;
        }
      },
      function (erro) {
        SweetAlert.swal(
          $rootScope.translate("Optimization", $rootScope.identity.idioma),
          $rootScope.translate(erro.data, $rootScope.identity.idioma),
          "error"
        );
        $scope.aguarde = false;
      }
    ); 
    return deferred.promise;
  }

  function getBestpDieta(resultados, obj) {
    var lucroMaximo = 0;
    var lucroMaximoPartes = 0;
    var lucroMaximoCarcass = 0;
    var lucro = 0;
    var response = {};
    resultados.forEach(function (item, index) {
      lucro = item[obj].receita - item[obj].gasto;
      if (lucro > lucroMaximo || index === 0) {
        lucroMaximo = JSON.parse(JSON.stringify(lucro));
        response.pesoVivo = item[obj];
        response.pesoVivo.pDieta = item.pDieta;
        response.pesoVivo.dadosDieta = pDietaOtimizacao(item.pDieta);
      }
      lucro = item[obj].receitaPartes - item[obj].gasto;
      if (lucro > lucroMaximoPartes || index === 0) {
        lucroMaximoPartes = JSON.parse(JSON.stringify(lucro));
        response.partes = item[obj];
        response.partes.pDieta = item.pDieta;
        response.partes.dadosDieta = pDietaOtimizacao(item.pDieta);
      }
      lucro = item[obj].receitaCarcass - item[obj].gasto;
      if (lucro > lucroMaximoCarcass || index === 0) {
        lucroMaximoCarcass = JSON.parse(JSON.stringify(lucro));
        response.carcass = item[obj];
        response.carcass.pDieta = item.pDieta;
        response.carcass.dadosDieta = pDietaOtimizacao(item.pDieta);
      }
    });
    for (var value in response) {
      response[value].ingredientesList = getListIngredientes(
        response[value].pDieta
      );
    }
    return response;
  } */

  useEffect(() => {
    const getInitData = async () => {
      setLoadingData(true);

      const responseCustomer = await api.post("filter/list", {
        model: "customer",
        sort: "name",
        select: "name",
      });
      setCustomers(responseCustomer.data);

      const responseSimulations = await api.post("filter/list", {
        model: "simulation",
        sort: "nome",
        select: "nome customer",
        populate: {
          path: "dietProgram",
          select: "dietas",
          populate: {
            path: "dietas.dieta",
            select: "nome aminoacidos composicao",
          },
        },
      });
      setSimulations(responseSimulations.data);
      if (params.id) {
        const responseSimulation = await api.get("simulation/" + params.id);
        setInput(responseSimulation.data);
      }

      setLoadingData(false);
    };
    if (getData) {
      setGetData(false);
      getInitData();
    }
  }, [getData, params.id]);

  return (
    <>
      <SubHeader
        {...props}
        title={translate(
          params.id ? "Edit Optimization" : "New Optimization",
          profile.language
        )}
        route="optimization"
        breadcrumbs={[
          { label: translate("Optimizator", profile.language) },
          {
            label: translate(
              params.id ? "Edit Optimization" : "New Optimization",
              profile.language
            ),
          },
        ]}
        icon={
          <FontAwesome type="solid" name="spinner" size={15} color="text" />
        }
      />
      <Block>
        <BlockBody>
          {loadingData ? (
            <Loading
              style={{
                fill: "#094093",
                height: "24px",
                width: "24px",
                display: "inline-table",
              }}
              type="spin"
              color="#fff"
              height={24}
              width={24}
            />
          ) : (
            <>
              <Tabs
                value={tab}
                indicatorColor="default"
                textColor="default"
                variant="scrollable"
                scrollButtons="on"
                onChange={(e, value) => {
                  setTab(value);
                }}
              >
                <Tab label={translate("Input", profile.language)} />
              </Tabs>
              {tab === 0 && (
                <InputData
                  {...{
                    customers,
                    simulations,
                    input,
                    setInput,
                    profile,
                    loading,
                    optimize,
                  }}
                />
              )}
            </>
          )}
        </BlockBody>
      </Block>
    </>
  );
}

import StringMask from "string-mask";

export const hasPermission = (userProfile, module, to) =>
  (userProfile.roles && userProfile.roles.indexOf("admin") > -1) ||
  (userProfile.modules && userProfile.modules[to].indexOf(module) > -1);

export const imgPreview = (img) => {
  try {
    return URL.createObjectURL(img);
  } catch (e) {
    return null;
  }
};

export const cpfMask = (value) => {
  return value.length > 14
    ? value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    : value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

export const phoneNumberMask = (value) => {
  return value.length > 13
    ? value
        .replace(/\D/g, "")
        .replace(/(\d{0})(\d)/, "$1($2")
        .replace(/(\d{2})(\d)/, "$1)$2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    : value
        .replace(/\D/g, "")
        .replace(/(\d{0})(\d)/, "$1($2")
        .replace(/(\d{2})(\d)/, "$1)$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
};

export const percentage = (value) => {
  try {
    return value
      .replace(/[^0-9.,]*/g, "")
      .replace(/\.{2,}/g, ".")
      .replace(/\.,/g, ",")
      .replace(/\.[0-9]+\./g, ".")
      .replace(/(\d{1})(\d)/, "$1%");
  } catch (e) {
    return null;
  }
};

export const convertStringToDate = (string) => {
  try {
    const array = string.split("/");
    if (!array[2]) return null;
    return new Date(
      parseInt(array[2]),
      parseInt(array[1]) - 1,
      parseInt(array[0])
    );
  } catch (e) {
    return null;
  }
};
export const convertDateToString = (date) => {
  try {
    const dateArray = date.split("-");
    return `${dateArray[2].substr(0, 2)}/${dateArray[1]}/${dateArray[0]}`;
  } catch (e) {
    return null;
  }
};

export const getValue = (item, stringParams) => {
  try {
    if (!stringParams) return item;
    const params = stringParams.split(".");
    if (params.length === 6) {
      return item[params[0]][params[1]][params[2]][params[3]][params[4]][
        params[5]
      ];
    }
    if (params.length === 5) {
      return item[params[0]][params[1]][params[2]][params[3]][params[4]];
    }
    if (params.length === 4) {
      return item[params[0]][params[1]][params[2]][params[3]];
    }
    if (params.length === 3) {
      return item[params[0]][params[1]][params[2]];
    }
    if (params.length === 2) {
      return item[params[0]][params[1]];
    }
    if (params.length === 1) {
      return item[params[0]];
    }
  } catch (e) {
    return null;
  }
};

export const getInitialObject = (model, data) => {
  if (data) {
    Object.keys(data).forEach((key) => {
      if (data[key] && typeof data[key] === "object") {
        Object.keys(data[key]).forEach((key2) => {
          if (data[key][key2] && typeof data[key][key2] === "object") {
            Object.keys(data[key][key2]).forEach((key3) => {
              if (
                data[key][key2][key3] &&
                typeof data[key][key2][key3] === "object"
              ) {
                Object.keys(data[key][key2][key3]).forEach((key4) => {
                  if (
                    data[key][key2][key3][key4] &&
                    typeof data[key][key2][key3][key4] === "object"
                  ) {
                    Object.keys(data[key][key2][key3][key4]).forEach((key5) => {
                      model[key][key2][key3][key4][key5] =
                        data[key][key2][key3][key4][key5];
                    });
                  } else {
                    model[key][key2][key3][key4] = data[key][key2][key3][key4];
                  }
                });
              } else {
                model[key][key2][key3] = data[key][key2][key3];
              }
            });
          } else {
            model[key][key2] = data[key][key2];
          }
        });
      } else {
        model[key] = data[key];
      }
    });
  }
  return model;
};

export const getColor = (color, opacity = 1) => {
  if (!color) {
    var letters = "0123456789ABCDEF";
    color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    let c = color.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  }
  const o = Math.round,
    r = Math.random,
    s = 255;
  const colors = {
    dark: `rgba(52, 58, 64, ${opacity})`,
    success: `rgba(29, 201, 184, ${opacity})`,
    danger: `rgba(253, 57, 122, ${opacity})`,
    info: `rgba(85, 120, 235, ${opacity})`,
    warning: `rgba(255, 185, 34, ${opacity})`,
    primary: `rgba(0, 152, 111, ${opacity})`,
    random: `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${opacity})`,
  };

  return colors[color];
};

export const getFirstLetter = (name, index) => {
  if (!name) return "";
  const array = name.split(" ");
  let response = array[0].substr(0, 1).toUpperCase();
  if (array.length > 1) {
    response += array[index || array.length - 1].substr(0, 1).toUpperCase();
  }
  return response;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRoutePath = (location, params) => {
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue && paramName !== "*") {
      path = path.replace(encodeURI(paramValue), `:${paramName}`);
    }
  });
  return path;
};

export const translate = (text, language) => {
  let response = "";
  const config = [
    {
      en: "Recovery the Password",
      pt: "Recuperar Senha",
      es: "Recuperar Contrase??a",
    },
    {
      en: "Password sucsessfully created, insert your email and new password!",
      pt: "Senha criada com sucesso, entre com o seu email e sua nova senha!",
      es: "Contrase??a creada con ??xito, ingrese su correo electr??nico y su nueva contrase??a!",
    },
    {
      en: "Select a minimum of two diets",
      pt: "Selecione no m??nimo duas dietas",
      es: "Seleccione al menos dos dietas",
    },
    {
      en: "Confirm this action?",
      pt: "Confirma esta a????o?",
      es: "??Confirmas esta acci??n?",
    },
    {
      en: "Data sucssesfully sent!",
      pt: "Dados enviados com sucesso!",
      es: "??Datos enviados con ??xito!",
    },
    {
      en: "Do you confirm this action?",
      pt: "Confirmar a????o?",
      es: "Confirmar acci??n?",
    },
    { en: "Simulation Data", pt: "Dados Simula????o", es: "Datos de Simulaci??n" },
    {
      en: "Can't list Diet Program",
      pt: "N??o Pode Listar o Programa de Dieta",
      es: "No puedo incluir el programa de dieta",
    },
    {
      en: "Can't list simulations",
      pt: "N??o Pode Listar simula????es",
      es: "No puedo incluir las simulacciones",
    },
    {
      en: "Save Optimization",
      pt: "Salvar Otimiza????o",
      es: "Guardar Optimizaci??n",
    },
    {
      en: "Can't otimizate",
      pt: "N??o foi poss??vel otimizar",
      es: "No se pudo optimizar",
    },

    {
      en: "The Diet Programs will be saved with the same name of the optimization",
      pt: "O Programa de Dieta ser?? salvo com o mesmo nome da otimiza????o",
      es: "El programa de dieta se guardar?? con el mismo nombre que la optimizaci??n",
    },
    {
      en: "Enter the optimization name",
      pt: "Entre com o nome da otimiza????o",
      es: "Ingrese el nombre de la optimizaci??n",
    },
    {
      en: "Do you conrfirm this action?",
      pt: "Confirmar a????o?",
      es: "Confirmar acci??n?",
    },
    {
      en: "Optimization saved successfully",
      pt: "Otimiza????o salva com sucesso",
      es: "Optimizaci??n guardada con ??xito",
    },
    {
      en: "Itens successufully removed!",
      pt: "Itens removidos com sucesso!",
      es: "??Elementos eliminados con ??xito!",
    },
    {
      en: "Save Simulation",
      pt: "Salvar Simulacao",
      es: "Guardar Simulaccion",
    },
    { en: "Saved", pt: "Salvo", es: "Salvado" },
    {
      en: "Selected Items Removed",
      pt: "Itens Selecionados Removidos",
      es: "Elementos seleccionados eliminados",
    },

    { en: "List", pt: "Listar", es: "Lista" },
    {
      en: "Data sucssesfully edited",
      pt: "Dados editados com sucesso!",
      es: "??Datos editados correctamente!",
    },
    {
      en: "Error registering",
      pt: "Erro ao Cadastrar",
      es: "Error al registrarse",
    },
    {
      en: "Filll the required fields!",
      pt: "Preencha os campos obrigat??rios!",
      es: "??Complete los campos obligatorios!",
    },

    {
      en: "Forgot the Password",
      pt: "Esqueci a Senha",
      es: "Olvid?? la Contrase??a",
    },
    {
      en: "Password recovery sucssesfully sent, check your email (inbox and junk mail) and follow the instructions!",
      pt: "Recupera????o de senha enviado com sucesso, verifique sua caixa de email (entrada e lixo eletr??nico) e siga as intru????es!",
      es: "La recuperaci??n de la contrase??a se envi?? correctamente, verifique su correo electr??nico (entrada y correo basura) y siga las instrucciones.",
    },

    { en: "Minimum", pt: "M??nimo", es: "M??nimo" },
    { en: "Maximum", pt: "M??ximo", es: "M??ximo" },
    {
      en: "Registration of Feed Restriction Program",
      pt: "Cadastro do Programa de Restri????o Alimentar",
      es: "Registro de Programa de Restriccion Alimenticia",
    },
    { en: "Overall Report", pt: "Relat??rio Geral", es: "Informe General" },
    { en: "Edit Diet", pt: "Editar Dieta", es: "Editar Dieta" },
    {
      en: "Number of individuals",
      pt: "N??mero de indiv??duos",
      es: "Numero de individuos",
    },
    { en: "Name", pt: "Nome", es: "Nombre" },
    { en: "Results", pt: "Resultados", es: "Resultados" },
    { en: "Warning", pt: "Aviso", es: "advertencia" },
    { en: "Type the name", pt: "Digite o nome", es: "Escribe el nombre" },
    {
      en: "Successful calibration, do you want to save a new Animal Profile?",
      pt: "Calibra????o efetuada com sucesso, voc?? quer salvar um novo Perfil Animal?",
      es: "Calibraci??n exitosa, ??desea guardar un nuevo perfil de animal?",
    },
    {
      en: "The existed diets will not be affected by changes on ingredients. You need to re-formulate diets that includes updated ingredients.",
      pt: "As dietas existentes n??o ser??o afetadas por altera????es no ingredientes. Voc?? precisa reformular as dietas que incluem ingredientes atualizados.",
      es: "Las dietas existentes no se ver??n afectadas por cambios en ingredientes. Necesita reformular las dietas que incluyen ingrediente actualizados.",
    },
    { en: "found", pt: "encontrados", es: "encontrados" },
    { en: "View", pt: "Visualizar", es: "Ver" },
    { en: "Gross Profit", pt: "Lucro", es: "Lucro" },
    {
      en: "ECONOMIC OPTIMIZATION",
      pt: "OTIMIZA????O ECONOMICA",
      es: "OPTIMIZACION ECONOMICA",
    },
    {
      en: "CUTS - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "CORTES - RESULTADOS DE RENDIMENTO E AVALIA????O ECONOMICA",
      es: "CORTE - RESUESTA PRODUCTIVA ESPERADA y AN??LISIS ECON??MICOS",
    },
    { en: "Diet Name", pt: "Nome da Dieta", es: "Nombre de la Dieta" },
    { en: "Optimizations", pt: "Otimiza????o", es: "Optimizaciones" },
    {
      en: "Balanced Protein (%)",
      pt: "Prote??na Balanceada (%)",
      es: "Prote??na Balanceada (%)",
    },
    {
      en: "Heat Production",
      pt: "Produ????o de Calor",
      es: "Producci??n de Calor",
    },
    { en: "Performance", pt: "Desempenho", es: "Desempe??o" },
    {
      en: "Amino Acids Requirements (% diet)",
      pt: "Amino??cidos (% diet)",
      es: "Amino??cidos (% diet)",
    },
    {
      en: "Amino Acids Requirements (mg/Day)",
      pt: "Amino??cidos (mg/Day)",
      es: "Amino??cidos (mg/Day)",
    },
    {
      en: "Amino Acids Requirements (mg)",
      pt: "Exig??ncia de Amino??cidos (mg)",
      es: "Exig??ncia de Amino??cidos (mg)",
    },
    {
      en: "Energy Partitioning",
      pt: "Parti????o da Energia",
      es: "Particion de Energia",
    },
    {
      en: "Body Composition",
      pt: "Composi????o Corporal",
      es: "Composici??n Corporal",
    },
    { en: "Initial Age", pt: "Idade Inicial", es: "Edad Inicial" },
    { en: "Final Age", pt: "Idade Final", es: "Edad Final" },
    { en: "Environment", pt: "Ambiente", es: "Ambientales" },
    { en: "Update", pt: "Calibrar", es: "Calibrar" },
    { en: "Calibration", pt: "Calibra????o", es: "Calibraci??n" },
    {
      en: "Lipid / Protein maturity",
      pt: "Lipideo / Prote??na a maturidade",
      es: "Lipideo / Prote??na a maturidade",
    },
    { en: "Diet", pt: "Dieta", es: "Dieta" },
    {
      en: "Diet Composition",
      pt: "Composi????o de dietas",
      es: "Composici??n de la dieta",
    },
    {
      en: "Registration of Diet Program",
      pt: "Registro do Programa de Dieta",
      es: "Registro de Programa de Dieta",
    },
    {
      en: "New Diet Program",
      pt: "Novo Programa de Dieta",
      es: "Nuevo Programa de Dieta",
    },
    { en: "Crude Fiber", pt: "Fibra Bruta", es: "Fibra Cruda" },
    { en: "Crude Fiber (%)", pt: "Fibra Bruta (%)", es: "Fibra Cruda (%)" },
    { en: "Amount", pt: "Quantidade", es: "Cantidad" },
    {
      en: "Elementar Composition",
      pt: "Composi????o Elementar",
      es: "Composici??n Elementar",
    },
    { en: "Dif/Max Required", pt: "Dif/Max Exigido", es: "Dif/Max Requerido" },
    { en: "Dif/Min Required", pt: "Dif/Min Exigido", es: "Dif/Min Requerido" },
    { en: "Max Required", pt: "Max Exigido", es: "Max Requerido" },
    { en: "Min Required", pt: "Min Exigido", es: "Min Requerido" },
    { en: "Portion", pt: "Quantidade", es: "Cantidad" },
    { en: "Nutrient", pt: "Nutriente", es: "Nutriente" },
    { en: "Ingredient", pt: "Ingrediente", es: "Ingrediente" },
    { en: "Adminstration", pt: "Administra????o", es: "Administracion" },
    { en: "Name&nbsp", pt: "Nome", es: "Nombre" },
    { en: "Print", pt: "Imprimir", es: "Impresi??n" },
    { en: "Gender", pt: "Sexo", es: "G??nero" },
    {
      en: "Diet Formulator",
      pt: "Formulador de Ra????o",
      es: "Formulador de Raciones",
    },
    { en: "Welcome", pt: "Bem vindo", es: "Bienvenido" },
    { en: "Diets", pt: "Dietas", es: "Dietas" },
    { en: "Diets", pt: "Dietas", es: "Dietas" },
    {
      en: "Power Partitioning",
      pt: "Parti????o de Energia",
      es: "Particionamiento de energ??a",
    },
    {
      en: "Genetic Potential",
      pt: "Potencial Gen??tico",
      es: "Potencial genetico",
    },
    { en: "Cut yield", pt: "Rendimento de corte", es: "Rendimiento de corte" },
    { en: "Macrominerals", pt: "Macrominerais", es: "Macrominerales" },
    {
      en: "Amino Acid Requirements (% diet)",
      pt: "Exig??ncia de Amino??cidos (% diet)",
      es: "Exig??ncia de Amino??cidos (% diet)",
    },
    {
      en: "Requirements for Amino Acids (mg)",
      pt: "Exig??ncia de Amino??cidos (mg)",
      es: "Exig??ncia de Amino??cidos (mg)",
    },
    {
      en: "EE for lipid deposition (KJ)",
      pt: "EE para depos????o de lip??deo (KJ)",
      es: "EE para deposici??n lip??dica (KJ)",
    },
    {
      en: "EE for lipid deposition (Kcal/day)",
      pt: "EE para depos????o de lip??deo (Kcal/dia)",
      es: "EE para deposici??n lip??dica (Kcal/dia)",
    },
    {
      en: "EE for lipids deposition (KJ)",
      pt: "EE para depos????o de lip??deo (KJ)",
      es: "EE para deposici??n lip??dica (KJ)",
    },
    {
      en: "EE for maintenance (KJ)",
      pt: "EE para manten??a (KJ)",
      es: "EE para mantenimiento (KJ)",
    },
    {
      en: "EE for protein deposition (KJ)",
      pt: "EE para deposi????o de prote??na (KJ)",
      es: "EE para la deposici??n de prote??nas (KJ)",
    },
    {
      en: "EE for protein deposition (Kcal/day)",
      pt: "EE para deposi????o de prote??na (Kcal/dia)",
      es: "EE para la deposici??n de prote??nas (Kcal/dia)",
    },
    {
      en: "EE Requirement (KJ)",
      pt: "EE Exig??ncia (KJ)",
      es: "EE Exigencia (KJ)",
    },
    {
      en: "EE Requirement (Kcal/day)",
      pt: "EE Exig??ncia (Kcal/dia)",
      es: "EE Exigencia (Kcal/dia)",
    },
    { en: "Weight (g)", pt: "Peso (g)", es: "Peso (g)" },
    { en: "Graphics", pt: "Gr??ficos", es: "Gr??ficos" },
    { en: "Energy", pt: "Energia", es: "Energ??a" },
    { en: "Select Iten", pt: "Selecionar Iten", es: "Seleccione un Art??culo" },
    {
      en: "Effective Energy(J/d)",
      pt: "Energia Efetiva(J/d)",
      es: "Energ??a Efectiva(J/d)",
    },
    {
      en: "Effective Energy (Mj)",
      pt: "Energia Efetiva (Mj)",
      es: "Energ??a Efectiva (Mj)",
    },
    {
      en: "Metabolizable Energy(cal/d)",
      pt: "Energia Metaboliz??vel(cal/d)",
      es: "Energ??a Metabolizable(cal/d)",
    },
    { en: "Amino Acids", pt: "Amino??cidos", es: "Amino??cidos" },
    { en: "Ash Body(g)", pt: "Cinzas Corporal(g)", es: "Ceniza del Cuerpo(g)" },
    { en: "Ash (%)", pt: "Cinzas (%)", es: "Ceniza (%)" },
    { en: "Water Body(g)", pt: "??gua Corporal(g)", es: "Agua del Cuerpo(g)" },
    { en: "Y Axes", pt: "Eixo Y", es: "Eje Y" },
    { en: "X Axes", pt: "Eixo X", es: "Eje X" },
    {
      en: "Lipid Deposition(g/d)",
      pt: "Deposi????o de Lip??deo(g/d)",
      es: "Deposici??n de l??pidos(g/d)",
    },
    {
      en: "Protein Deposition Body(g/d)",
      pt: "Deposi????o de Prote??na Corporal(g/d)",
      es: "Deposici??n De Prote??nas del Cuerpo(g/d)",
    },
    {
      en: "Feed Convertion(g/d)",
      pt: "Convers??o Alimentar(g/d)",
      es: "Conversi??n de alimentaci??n(g/d)",
    },
    { en: "Gain(g/d)", pt: "Ganho(g/d)", es: "Ganancia(g/d)" },
    {
      en: "EM Intake(Kcal/d)",
      pt: "Consumo de EM (kcal/d)",
      es: "Consumo de EM (kcal/d)",
    },
    {
      en: "Feed Intake(g)",
      pt: "Consumo de Ra????o(g)",
      es: "Consumo de Alimento(g)",
    },
    { en: "Feather(g)", pt: "Pena(g)", es: "Pluma(g)" },
    { en: "Simulation two", pt: "Simula????o dois", es: "Simulaci??n dos" },
    {
      en: "Comparison between two simulations",
      pt: "Conpara????o entre duas simula????es",
      es: "Comparaci??n entre dos simulaciones",
    },
    { en: "Simulation one", pt: "Simula????o um", es: "Simulaci??n uno" },
    {
      en: "Performance: Potential vs. Real",
      pt: "Desempenho: Potencial vs Real",
      es: "Rendimiento: Potencial vs. Real",
    },
    { en: "Simulate", pt: "Simular", es: "Simular" },
    {
      en: "actual Lipid Deposition (g)",
      pt: "Deposi????o de lip??deo atual (g)",
      es: "Deposici??n de l??pidos real (g)",
    },
    {
      en: "desired Lipid Deposition (g)",
      pt: "Deposi????o de lip??deo desejado (g)",
      es: "Deposici??n de l??pidos deseada (g)",
    },
    {
      en: "actual Protein Deposition (g)",
      pt: "Deposi????o de Prote??na atual (g)",
      es: "Deposici??n de prote??nas real (g)",
    },
    {
      en: "desired Protein Deposition (g)",
      pt: "Deposi????o de Prote??na desejado (g)",
      es: "Deposici??n de prote??nas deseada (g)",
    },
    {
      en: "Heat Production (KJ)",
      pt: "Produ????o de Calor (KJ)",
      es: "Producci??n de calor (KJ)",
    },
    {
      en: "minimum Heat Production (KJ)",
      pt: "Produ????o de calor min??ma (KJ)",
      es: "Producci??n min??ma de calor (KJ)",
    },
    {
      en: "maximum Heat Production (KJ)",
      pt: "Produ????o de calor m??xima (KJ)",
      es: "Producci??n m??xima de calor (KJ)",
    },
    { en: "Wing (g)", pt: "Asa (g)", es: "Ala (g)" },
    { en: "Drumstick (g)", pt: "Sobrecoxa (g)", es: "Sobrecoja (g)" },
    { en: "Thigh (g)", pt: "Coxa (g)", es: "Muslo (g)" },
    { en: "Breast (g)", pt: "Peito (g)", es: "Pechuga (g)" },
    { en: "Body Weight (g)", pt: "Peso Vivo (g)", es: "Peso corporal (g)" },
    {
      en: "Feed Conversion (g/g)",
      pt: "Convers??o Alimentar (g/g)",
      es: "Conversi??n de alimentaci??n (g/g)",
    },

    {
      en: "Body Weight Gain (g)",
      pt: "Ganho de Peso (g)",
      es: "Aumento de peso corporal (g)",
    },
    {
      en: "Body Weight Gain (g/day)",
      pt: "Ganho de Peso (g/dia)",
      es: "Aumento de peso corporal (g/dia)",
    },
    {
      en: "Actual Feed Intake (g)",
      pt: "Consumo de ra????o atual (g)",
      es: "Ingesta real de alimento (g)",
    },
    {
      en: "Actual Feed Intake (g/day)",
      pt: "Consumo de ra????o atual (g/dia)",
      es: "Ingesta real de alimento (g/dia)",
    },
    {
      en: "desired Feed Intake (g)",
      pt: "Consumo de ra????o desejado (g)",
      es: "Ingesta de alimento deseada (g)",
    },
    {
      en: "desired Feed Intake (g/day)",
      pt: "Consumo de ra????o desejado (g/dia)",
      es: "Ingesta de alimento deseada (g/dia)",
    },
    { en: "Calcium (%)", pt: "C??lcio (%)", es: "Calcio (%)" },
    { en: "Calcium (g)", pt: "C??lcio (g)", es: "Calcio (g)" },
    {
      en: "av. Phosphorus (%)",
      pt: "F??sforo disp. (%)",
      es: "F??sforo disp. (%)",
    },
    {
      en: "av. Phosphorus (g)",
      pt: "F??sforo disp. (g)",
      es: "F??sforo disp. (g)",
    },
    {
      en: "EE for lipids deposition (Kcal/day)",
      pt: "EE para depos??c??o de lip??deo (Kcal/dia)",
      es: "EE para deposici??n de l??pidos (Kcal/d??a)",
    },
    {
      en: "EE for protein deposition (kJ/day)",
      pt: "EE para deposi????o de prote??na (kJ/dia)",
      es: "EE para la deposici??n de prote??na (kJ/dia)",
    },
    {
      en: "EE for maintenance (kJ/day)",
      pt: "EE para manten??a (kJ/day)",
      es: "EE para mantenimiento (kJ/day)",
    },
    {
      en: "EE for maintenance (Kcal/day)",
      pt: "EE para manten??a (Kcal/dia)",
      es: "EE para mantenimiento (Kcal/dia)",
    },
    {
      en: "EE requirement (kJ/day)",
      pt: "EE exig??ncia (kJ/day)",
      es: "EE requisito (kJ/day)",
    },
    {
      en: "Potential of lipid dep. (g)",
      pt: "Potencial dep. de Lip??deo (g)",
      es: "Potencial dep. lip??dica (g)",
    },
    {
      en: "Potential of feather protein dep. (g)",
      pt: "Potencial de dep. prote??na na pena (g)",
      es: "Potencial deposici??n prote??nas de la pluma (g)",
    },
    {
      en: "Potential of body protein dep. (g)",
      pt: "Potencial dep. prote??na no corpo (g)",
      es: "Potencial dep. prote??nas del cuerpo (g)",
    },
    { en: "Ash (g)", pt: "Cinzas (g)", es: "Ceniza (g)" },
    { en: "Water (g)", pt: "??gua (g)", es: "Agua (g)" },
    { en: "Lipid (g)", pt: "Gordura (g)", es: "Grasa (g)" },
    {
      en: "Feather protein (g)",
      pt: "Prote??na da pena",
      es: "Prote??na de la pluma (g)",
    },
    {
      en: "Body protein (g)",
      pt: "Prote??na corporal (g)",
      es: "Prote??na corporal (g)",
    },
    {
      en: "Feather weight (g)",
      pt: "Peso de pena (g)",
      es: "Peso de la pluma (g)",
    },
    {
      en: "Health Problem",
      pt: "Problema Sanit??rio",
      es: "Problema Sanitario",
    },
    { en: "Health Status", pt: "Status Sanit??rio", es: "Status Sanitario" },
    { en: "Final Condition", pt: "Condi????o Final", es: "Condici??n Final" },
    {
      en: "Initial Condition",
      pt: "Condi????o Inicial",
      es: "Condici??n Inicial",
    },
    { en: "Weight(g)", pt: "Peso(g)", es: "Peso(g)" },
    { en: "Age(d)", pt: "Idade(d)", es: "Edad(d)" },
    {
      en: "Select the environment",
      pt: "Selecionar o ambiente",
      es: "Selecciona el ambiente",
    },
    {
      en: "Select restriction program",
      pt: "Selecionar o programa de restri????o alimentar",
      es: "Seleccione programa de restricci??n alimenticia",
    },
    {
      en: "Feed Restriction Program",
      pt: "Programa de Restri????o Alimentar",
      es: "Programa de Restricci??n Alimenticia",
    },
    {
      en: "Select the diet program",
      pt: "Selecionar o programa de dieta",
      es: "Seleccione el programa de dieta",
    },
    {
      en: "Select the animal profile",
      pt: "Selecionar o perfil animal",
      es: "Selecciona el perfil del anima",
    },
    { en: "Save Simulation", pt: "Salvar Simula????o", es: "Guardar simulaci??n" },
    {
      en: "(Average Individual x Population)",
      pt: "(Indiv??duo m??dio e Popula????o)",
      es: "(Individuo promedio y Poblaci??n)",
    },
    { en: "(Graphs)", pt: "(Gr??ficos)", es: "(Gr??ficos)" },
    { en: "Export", pt: "Exportar", es: "Exportar" },
    { en: "Population", pt: "Popula????o", es: "Poblaci??n" },
    {
      en: "Average Individual",
      pt: "Individuo M??dio",
      es: "Promedio Individual",
    },
    {
      en: "Generating Simulation!",
      pt: "Gerando Simula????o",
      es: "Generando simulaci??n!",
    },
    {
      en: "CUTS - ECONOMIC OPTIMIZATION",
      pt: "Cortes - Otimiza????o economica",
      es: "CORTE - OPTIMIZACION ECONOMICA",
    },
    {
      en: "CARCASS - ECONOMIC OPTIMIZATION",
      pt: "Carca??a - Otimiza????o economica",
      es: "CARCASS - OPTIMIZACI??N ECON??MICA",
    },
    {
      en: "Feed Cost ($/kg)",
      pt: "Custo da dieta",
      es: "Costo de alimentaci??n ($ / kg)",
    },
    {
      en: "CARCASS - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "CARCA??A - RESULTADOS DE DESEMPENHO E VALORES ECONOMICOS",
      es: "CARCASS - RESPUESTA PRODUCTIVA ESPERADA Y AN??LISIS ECON??MICOS",
    },
    {
      en: "Otimized Diet Program",
      pt: "Programa de dieta otimizado",
      es: "Programa de dieta optimizada",
    },
    { en: "Gross Margin (%)", pt: "Margem Bruta (%)", es: "Margen bruto (%)" },
    {
      en: "Gross Profit ($/bird)",
      pt: "Margem Bruta ($/bird)",
      es: "Ganancia bruta ($ / ave)",
    },
    {
      en: "Revenue ($/bird)",
      pt: "Receita ($/bird)",
      es: "Ingresos ($ / ave)",
    },
    { en: "Expense ($/bird)", pt: "Gastos ($/bird)", es: "Gastos ($ / ave)" },
    {
      en: "LIVE BODY WEIGHT - ECONOMIC OPTIMIZATION",
      pt: "PESO VIVO - OTIMIZA????O ECONOMICA",
      es: "PESO VIVO - OPTIMIZACI??N ECON??MICA",
    },
    {
      en: "LIVE BODY WEIGHT - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "PESO VIVO - RESULTADOS DE DESEMPENHO E VALORES ECONOMICOS",
      es: "PESO VIVO - RESPUESTA PRODUCTIVA ESPERADA Y AN??LISIS ECON??MICOS",
    },
    {
      en: "Save New Optimization",
      pt: "Salvar Nova Otimiza????o",
      es: "Guardar nueva optimizaci??n",
    },
    {
      en: "New environment variable",
      pt: "Novo Cadastro de Ambiente",
      es: "Registro de variables ambientales",
    },
    {
      en: "Registration of Environment Variables",
      pt: "Cadastro de Vari??veis de Ambiente",
      es: "Registro de variables ambientales",
    },
    {
      en: "type the environment name",
      pt: "Digite o nome do ambiente",
      es: "escriba el nombre del ambiente",
    },
    {
      en: "Air Velocity(m/s)",
      pt: "Velocidade do Ar(m/s)",
      es: "Velocidad del aire(m/s)",
    },
    { en: "Temperature(C??)", pt: "Temperatura(C??)", es: "Temperatura(C??)" },
    { en: "Density(m??)", pt: "Densidade(m??)", es: "Densidad(m??)" },
    { en: "Density(bird/m??)", pt: "Densidade(ave/m??)", es: "Densidad(ave/m??)" },
    { en: "Humidity(%)", pt: "Umidade(%)", es: "Humedad(%)" },
    {
      en: "Environment Variables",
      pt: "Vari??veis de Ambiente",
      es: "Variables ambientales",
    },
    {
      en: "Environment Data",
      pt: "Dados de Ambiente",
      es: "Datos del ambiente",
    },
    {
      en: "type the diet program name",
      pt: "Digite o nome do programa de dieta",
      es: "Escriba el nombre del programa de dieta",
    },
    { en: "Aminoacids", pt: "Amino??cidos", es: "Amino??cidos" },
    {
      en: "IngredientsElementar Composition",
      pt: "Composi????o Elementar dos Ingredientes",
      es: "Ingredientes Elemental Composition",
    },
    {
      en: "type de animal profile name",
      pt: "Digite o Perfil Animal",
      es: "Escriba el nombre del perfil del animal",
    },
    {
      en: "Observed Live Weight (g)",
      pt: "Peso Vivo Observado (g)",
      es: "Peso Vivo Observado (g)",
    },
    {
      en: "Estimated Live Weight (g)",
      pt: "Peso Vivo Estimado (g)",
      es: "Peso Vivo Estimado (g)",
    },
    {
      en: "Coef. b (Water / Protein)",
      pt: "Coef. b (??gua / Proteina)",
      es: "Coef. b (??gua / Proteina)",
    },
    {
      en: "Coef. a (Water / Protein)",
      pt: "Coef. a (??gua / Proteina)",
      es: "Coef. a (Agua / Proteina)",
    },
    {
      en: "Feather Maturity Protein (g)",
      pt: "Prote??na da Pena ?? Maturidade (g)",
      es: "Prote??na De La Madurez De La Pluma (g)",
    },
    {
      en: "Lipid / Protein ratio at Maturity",
      pt: "Rela????o Lipidio / Proteina ?? Maturidade",
      es: "Relaci??n l??pido / prote??na en la madurez",
    },
    {
      en: "Maturity Protein (g)",
      pt: "Prote??na ?? Maturidade (g)",
      es: "Prote??na De La Madurez (g)",
    },
    { en: "Peso Initial (g)", pt: "Peso Inicial (g)", es: "Peso Inicial (g)" },
    {
      en: "It may take a few minutes!",
      pt: "Pode Levar Alguns Minutos",
      es: "??Puede Tardar Unos Minutos!",
    },
    {
      en: "Animal Profile Data",
      pt: "Dados do Perfil Animal",
      es: "Datos del Perfil Animal",
    },
    { en: "Offered Feed", pt: "Dieta Oferecida", es: "Alimento Ofrecido" },
    {
      en: "Feed Restriction Program Data",
      pt: "Dados do Programa de Restri????o Alimentar",
      es: "Datos del Programa de Restri????o Alimenticia",
    },
    { en: "Phen +Tir", pt: "Fen +Tir", es: "Fen +Tir" },
    { en: "Phe + Tyr", pt: "Fen +Tir", es: "Fen +Tir" },
    {
      en: "Digestible Phen +Tyr (%)",
      pt: "Fen +Tir Digest??vel (%)",
      es: "Fen +Tir Digestible (%)",
    },
    { en: "Histidine", pt: "Histidina", es: "Histidina" },
    {
      en: "Digestible Histidine (%)",
      pt: "Histidina Digest??vel (%)",
      es: "Histidina Digestible (%)",
    },
    { en: "Leucine", pt: "Leucina", es: "Leucina" },
    {
      en: "Digestible Leucine (%)",
      pt: "Leucina Digest??vel (%)",
      es: "Leucina Digestible (%)",
    },
    { en: "Isoleucine", pt: "Isoleucina", es: "Isoleucina" },
    {
      en: "Digestible Isoleucine (%)",
      pt: "Isoleucina Digest??vel (%)",
      es: "Isoleucina Digestible (%)",
    },
    { en: "Phenilalanine", pt: "Fenilalanina", es: "Fenilalanina" },
    {
      en: "Digestible Phenilalanine (%)",
      pt: "Fenilalanina Digest??vel (%)",
      es: "Fenilalanina Digestible (%)",
    },
    { en: "Valine", pt: "Valina", es: "Valina" },
    {
      en: "Digestible Valine (%)",
      pt: "Valina Digest??vel (%)",
      es: "Valina Digestible (%)",
    },
    {
      en: "Valine (%)",
      pt: "Valina (%)",
      es: "Valina (%)",
    },
    { en: "Gli + Ser", pt: "Gli + Ser", es: "Gli + Ser" },
    {
      en: "Digestible Gli + Ser (%)",
      pt: "Gli + Ser Digest??vel (%)",
      es: "Gli + Ser Digestible (%)",
    },
    {
      en: "Gli + Ser (%)",
      pt: "Gli + Ser (%)",
      es: "Gli + Ser (%)",
    },
    { en: "Arginine", pt: "Arginina", es: "Arginina" },
    {
      en: "Digestible Arginine (%)",
      pt: "Arginina Digest??vel (%)",
      es: "Arginina Digestible (%)",
    },
    {
      en: "Arginine (%)",
      pt: "Arginina (%)",
      es: "Arginina (%)",
    },
    { en: "Tryptophan", pt: "Triptofano", es: "Tript??pano" },
    {
      en: "Digestible Tryptophan (%)",
      pt: "Triptofano Digest??vel (%)",
      es: "Tript??pano Digestible (%)",
    },
    {
      en: "Tryptophan (%)",
      pt: "Triptofano (%)",
      es: "Tript??pano (%)",
    },
    { en: "Treonine", pt: "Treonina", es: "Treonina" },
    {
      en: "Digestible Treonine (%)",
      pt: "Treonina Digest??vel (%)",
      es: "Treonina Digestible (%)",
    },
    { en: "Threonine", pt: "Treonina", es: "Treonina" },
    {
      en: "Digestible Threonine (%)",
      pt: "Treonina Digest??vel (%)",
      es: "Treonina Digestible (%)",
    },
    {
      en: "Threonine (%)",
      pt: "Treonina (%)",
      es: "Treonina (%)",
    },
    { en: "Met + Cys", pt: "Met + Cis", es: "Met + Cis" },
    {
      en: "Digestible Met + Cys (%)",
      pt: "Met + Cis Digest??vel (%)",
      es: "Met + Cis Digestible (%)",
    },
    {
      en: "Met + Cys (%)",
      pt: "Met + Cis (%)",
      es: "Met + Cis (%)",
    },
    { en: "Methionine", pt: "Metionina", es: "Metionine" },
    {
      en: "Digestible Methionine (%)",
      pt: "Metionina Digest??vel (%)",
      es: "Metionine Digestible (%)",
    },
    { en: "Digestible (%)", pt: "Digest??vel (%)", es: "Digestible (%)" },
    { en: "Total (%)", pt: "Total (%)", es: "Total (%)" },
    { en: "Lysine", pt: "Lisina", es: "Lisina" },
    { en: "Calcium (%)", pt: "C??lcio (%)", es: "Calcio (%)" },
    { en: "Available P (%)", pt: "P Dispon??vel (%)", es: "P Disponible (%)" },
    { en: "Total Calcium (%)", pt: "C??lcio Total (%)", es: "Calcio Total (%)" },
    {
      en: "Total Calcium (mg)",
      pt: "C??lcio Total (mg)",
      es: "Calcio Total (mg)",
    },
    {
      en: "Available Phosphorus (%)",
      pt: "F??sforo Dispon??vel (%)",
      es: "F??sforo Disponible (%)",
    },
    { en: "Crude Fiber (CF)", pt: "Fibra Bruta (FB)", es: "Fibra Bruta (FB)" },
    { en: "total P (%)", pt: "P total (%)", es: "P total (%)" },
    {
      en: "total Phosphorus (%)",
      pt: "F??sforo total (%)",
      es: "F??sforo total (%)",
    },
    {
      en: "Eletrolitic Balance (mEq/kg)",
      pt: "Balan??o Eletrol??tico (mEq/kg)",
      es: " Balance Electrol??tico (mEq/kg)",
    },
    { en: "Chloride (%)", pt: "Cl??ro (%)", es: "Cloruro (%)" },
    { en: "Sodium (%)", pt: "S??dio (%)", es: "Sodio (%)" },
    { en: "Potassium (%)", pt: "Pot??ssio (%)", es: "Potasio (%)" },
    {
      en: "Mineral Matter (%)",
      pt: "Mat??ria Mineral (%)",
      es: "Materia Mineral (%)",
    },
    {
      en: "Organic Matter (OM) (%)",
      pt: "Mat??ria Org??nica (MO) (%)",
      es: "Materia Org??nica (MO) (%)",
    },
    {
      en: "Dig. Fat Poultry (%)",
      pt: "Dig. Gordura Ave (%)",
      es: "Dig. Grasa Ave (%)",
    },
    {
      en: "Dig. Coef. Fat (%)",
      pt: "Dig. Coef. Gordura (%)",
      es: "Dig. Coef. Grasa (%)",
    },
    { en: "Fat (%)", pt: "Gordura (%)", es: "Grasa (%)" },
    {
      en: "Effective Energy (MJ/kg)",
      pt: "Energia Efetiva (MJ/kg)",
      es: "Energia Efetiva (MJ/kg)",
    },
    {
      en: "Effective Energy (MJ/kg)",
      pt: "Energia Verdadeira (Kcal/kg)",
      es: "Energia Verdadeira (Kcal/kg)",
    },
    {
      en: "True Met. Energy Poultry (Kcal/kg)",
      pt: "Energia Met. Ave (kcal/kg)",
      es: "Energia Met. Ave (kcal/kg)",
    },
    {
      en: "True Met. Energy Verd. (Kcal/kg)",
      pt: "Energia Met. (kcal/kg)",
      es: "Energia Met. (kcal/kg)",
    },
    {
      en: "True Met. Energy (Kcal/kg)",
      pt: "Energia Met. (kcal/kg)",
      es: "Energia Met. (kcal/kg)",
    },
    {
      en: "Met. Energy Poultry (Kcal/kg)",
      pt: "Energia Met. Ave (Kcal/kg)",
      es: "Energia Met. Ave (Kcal/kg)",
    },
    {
      en: "Gross Energy (Kcal/kg)",
      pt: "Energia Bruta (Kcal/kg)",
      es: "Energia Cruda (Kcal/kg)",
    },
    {
      en: "Digestible CP Poultry (%)",
      pt: "Digestibilidade PB Aves",
      es: "Digerible PB Aves",
    },
    {
      en: "Digestible CP (%)",
      pt: "Digestibilidade PB (%)",
      es: "Digerible PB (%)",
    },
    {
      en: "Digestible Fat (%)",
      pt: "Digestibilidade Gordura (%)",
      es: "Digerible Grasa (%)",
    },
    {
      en: "Coef. Dig. CP Poultry (%)",
      pt: "Coef. Dig. PB Aves",
      es: "Coef. Dig. PB Aves",
    },
    {
      en: "Coef. Dig. Fat (%)",
      pt: "Coef. Dig. Gordura  (%)",
      es: "Coef. Dig. Grasa  (%)",
    },
    {
      en: "Crude Protein (CP) (%)",
      pt: "Prote??na Bruda (PB) (%)",
      es: "Proteina Cruda (PB) (%)",
    },
    { en: "Dry Matter (%)", pt: "Mat??ria Seca (%)", es: "Materia Seca (%)" },
    {
      en: "Ingredients Data",
      pt: "Dados do Ingrediente",
      es: "Datos de Ingrediente",
    },
    { en: "Basic Registration", pt: "Registro B??sico", es: "Registro Basico" },
    { en: "Price (Kg)", pt: "Pre??o (kg)", es: "Precio (kg)" },
    {
      en: "EMAIL INFORMATION",
      pt: "INFORMA????O DO EMAIL",
      es: "INFORMACION DE EMAIL",
    },
    { en: "Profile name", pt: "Nome do perfil", es: "Nombre de perfil" },
    { en: "Email data", pt: "Dado do email", es: "Dados de email" },
    { en: "Last event", pt: "??ltimo evento", es: "??ltimo evento" },
    { en: "Look data", pt: "Ver dado", es: "Ver datos" },
    { en: "Equal to", pt: "Igual a", es: "Igual a" },
    { en: "Contains", pt: "Cont??m", es: "Contiene" },
    { en: "Different from", pt: "Diferente de", es: "DIferente de" },
    { en: "Does not contain", pt: "n??o cont??m", es: "no contaiene" },
    {
      en: "Generating Report!",
      pt: "Gerando Relat??rio!",
      es: "Gerando Informe!",
    },
    { en: "Create/Edit", pt: "Criar/Editar", es: "Crear/Editar" },
    { en: "View", pt: "Visualizar", es: "Ver" },
    { en: "Administration", pt: "Administra????o", es: "administraci??n" },
    {
      en: "Type the nutrients name",
      pt: "Digite o Nome do Nutriente",
      es: "Escriba el nombre de los nutrientes",
    },
    {
      en: "Look for Ingredient",
      pt: "Buscar Ingrediente",
      es: "Buscar Ingrediente",
    },
    { en: "FEMALE", pt: "FEMININO", es: "FEM" },
    { en: "Confirm", pt: "Confirmar", es: "Confirmar" },
    { en: "Confirm", pt: "Confirma", es: "Confirma" },
    {
      en: "Error on reset the password",
      pt: "Erro ao redefinir a senha",
      es: "Error al restablecer la contrase??a",
    },
    {
      en: "Password reset successfully, an email with instructions will be sent to the user!",
      pt: "Senha resetada com sucesso, um email com as instru????es ser?? enviado para o usu??rio!",
      es: "Restablecimiento de contrase??a exitoso, ??se enviar?? un correo electr??nico con instrucciones al usuario!",
    },
    { en: "MALE", pt: "MASCULINO", es: "MACHO" },
    { en: "Options", pt: "Op????es", es: "Opciones" },
    {
      en: "Do you want to reset the user's password?",
      pt: "Deseja resetar a senha do usu??rio?",
      es: "??Desea restablecer la contrase??a del usuario?",
    },
    { en: "Home", pt: "Inicio", es: "Inicio" },
    {
      en: "Profile registration",
      pt: "Cadastro de perf??s",
      es: "Registro de perfiles",
    },
    {
      en: "User registration",
      pt: "Cadastro de usu??rios",
      es: "Registro de usuarios",
    },
    { en: "Administration", pt: "Administra????o", es: "Administraci??n" },
    { en: "Profiles", pt: "Perfis", es: "Perfiles" },
    { en: "Users", pt: "Usu??rios", es: "Usuarios" },
    { en: "Emails", pt: "E-mails", es: "Emails" },
    { en: "Email", pt: "E-mail", es: "Email" },
    { en: "CPF", pt: "CPF", es: "CPF" },
    { en: "My data", pt: "Meus Dados", es: "Mis Datos" },
    { en: "Change Password", pt: "Trocar Senha", es: "Cambiar Contrase??a" },
    { en: "Password", pt: "Senha", es: "Contrase??a" },
    { en: "Reset Password", pt: "Resetar Senha", es: "Restablecer contrase??a" },
    { en: "Enter", pt: "Entrar", es: "Entrar" },
    {
      en: "Forgot password?",
      pt: "Esqueceu a senha?",
      es: "Olvid?? su contrase??a?",
    },
    { en: "Logout", pt: "Sair", es: "Salir" },
    {
      en: "Feed formulator",
      pt: "Formulador de ra????es",
      es: "Formulador de Raciones",
    },
    { en: "Basic Registration", pt: "Registro b??sico", es: "Registro B??sico" },
    {
      en: "Broiler Breeder",
      pt: "Matriz de Corte",
      es: "Reproductora de Carne",
    },
    { en: "Laying Hen", pt: "Galinhas Poedeiras", es: "Gallinas de Postura" },
    { en: "Ingredients", pt: "Ingredientes", es: "Ingredientes" },
    {
      en: "Diets Composition",
      pt: "Composi????o das Dietas",
      es: "Composici??n de las Dietas",
    },
    { en: "Diet Program", pt: "Programa de Dietas", es: "Programa de Dietas" },
    { en: "Animal Profile", pt: "Perfil Animal", es: "Perfil Animal" },
    {
      en: "Environmental Variables",
      pt: "Vari??veis de Ambiente",
      es: "Variables Ambientales",
    },
    { en: "Simulation", pt: "Simula????es", es: "Simulaciones" },
    { en: "Optimizator", pt: "Otimiza????o", es: "Optimizador" },
    { en: "List", pt: "Lista", es: "Lista" },
    { en: "Access", pt: "Acesso", es: "Acceso" },
    { en: "See", pt: "Ver", es: "Ver" },
    { en: "Edit/Create", pt: "Editar/Criar", es: "Editar/Crear" },
    {
      en: "Ingredient Registration",
      pt: "Registro de Ingredientes",
      es: "Registro de Ingredientes",
    },
    { en: "Filter", pt: "Filtro", es: "Filtro" },
    { en: "Field Selection", pt: "Selecionar Campo", es: "Seleccionar campo" },
    { en: "Select Field", pt: "Selecione o Campo", es: "Seleccione un campo" },
    { en: "Status", pt: "Status", es: "Status" },
    { en: "All", pt: "Todos", es: "Todos" },
    { en: "Active", pt: "Ativo", es: "Activo" },
    { en: "Inactive", pt: "Inativo", es: "Inactivo" },
    {
      en: "Insert with basic spreadsheet",
      pt: "Inserir planilha base",
      es: "Insertar planilla de ingredientes",
    },
    {
      en: "Select the basic spreadsheet",
      pt: "Selecionar planilha base",
      es: "Seleccionar planilla de Ingredientes",
    },
    { en: "New Ingredient", pt: "Novo Ingrediente", es: "Nuevo Ingrediente" },
    {
      en: "Download Basic Spreadsheet",
      pt: "Baixar Planilha Base",
      es: "Descargar Planilla Base",
    },
    {
      en: "Send Spreadsheet",
      pt: "Enviar Planilha Base",
      es: "Enviar Planilla Base",
    },
    { en: "Apply Filter", pt: "Aplicar Filtro", es: "Aplicar Filtro" },
    { en: "Clean Filter", pt: "Apagar Filtros", es: "Limpiar Filtros" },
    { en: "Result", pt: "Resultados", es: "Resultados" },
    { en: "Index", pt: "??ndice", es: "??ndice" },
    { en: "Name", pt: "Nome", es: "Nombre" },
    { en: "Edit", pt: "Editar", es: "Editar" },
    { en: "Back", pt: "Voltar", es: "Regresar" },
    { en: "Feed Formulation", pt: "F??rmula da Ra????o", es: "F??rmula de Rac??on" },
    {
      en: "Nutritional Requirement",
      pt: "Exig??ncia Nutricional",
      es: "Requerimiento Nutricional",
    },
    { en: "Error", pt: "Erro", es: "Error" },
    { en: "Description", pt: "Descri????o", es: "Descripti??n" },
    {
      en: "Unable to change language",
      pt: "N??o foi poss??vel alterar o idioma",
      es: "No se puede cambiar el idioma",
    },
    { en: "Nutrients", pt: "Nutrientes", es: "Nutrientes" },
    {
      en: "Data successfully sent",
      pt: "Dados enviados com sucesso",
      es: "Datos enviados con ??xito",
    },
    { en: "Permission Name", pt: "Nome da Permiss??o", es: "Nombre de Permiso" },
    {
      en: "Look for Ingredient name",
      pt: "Pesquisa por Nome de Ingrediente",
      es: "B??squeda por nombre de Ingrediente",
    },
    {
      en: "Type the ingredient name",
      pt: "Digite o Nome de Ingrediente",
      es: "Digitar nombre de Ingrediente",
    },
    {
      en: "Ingredient List",
      pt: "Lista de Ingredientes",
      es: "Lista de Ingredientes",
    },
    { en: "Saved Diets", pt: "Dietas Salvas", es: "Dietas Guardadas" },
    { en: "Save Diet", pt: "Salvar Dieta", es: "Guardar Dieta" },
    { en: "Select Diet", pt: "Selecione a Dieta", es: "Seleccione la dieta" },
    {
      en: "Select a Diet *",
      pt: "Selecione a Dieta *",
      es: "Seleccione la Dieta *",
    },
    {
      en: "Selected Ingredients",
      pt: "Ingredientes Selecionados",
      es: "Ingredientes Seleccionados",
    },
    {
      en: "Look for Nutrient",
      pt: "Pesquisa por Nutriente",
      es: "Buscar Ingrediente",
    },
    { en: "Formulate Diet", pt: "Formular Ra????o", es: "Formular Raci??n" },
    {
      en: "Type the nutrient's name",
      pt: "Digite o nome de nutriente",
      es: "Digitar nombre de nutriente",
    },
    {
      en: "List of Nutrients",
      pt: "Lista de Nutrientes",
      es: "Lista de Nutrientes",
    },
    {
      en: "Check this option to apply the energy, amino acid, Ca and avP estimated in a simulation previously saved",
      pt: "Selecionar esta op????o para aplicar a Energia, Amino??cido, Ca, o avP estimados em uma simula????o salva",
      es: "Seleccione esta opci??n para utilizar la Energ??a, Amino??cidos, Ca y avP estimados en una simulaci??n guardada",
    },
    {
      en: "Selected Nutrients",
      pt: "Nutrientes Selecionados",
      es: "Nutrientes Seleccionados",
    },
    {
      en: "New Feed Restriction Program",
      pt: "Novo Programa de Restri????o Alimentar",
      es: "Nuevo Programa de Restricci??n Alimenticia",
    },
    {
      en: "Type the Feed Restriction Program name",
      pt: "Digite o nome do Programa de Restri????o Alimenta????o",
      es: "Digitar nombre de Programa de Restricion Alimenticia",
    },
    { en: "Condition", pt: "Condi????o", es: "Condici??n" },
    { en: "Age", pt: "Idade", es: "Edad" },
    { en: "End", pt: "Final", es: "Final" },
    { en: "Food Offered", pt: "Alimento oferecido", es: "Alimento Ofrecido" },
    { en: "Percentage", pt: "Porcentagem", es: "Porcentaje" },
    { en: "Body Weight", pt: "Peso vivo", es: "Peso vivo" },
    { en: "Save", pt: "Salvar", es: "Guardar" },
    { en: "Cancel", pt: "Cancelar", es: "Cancelar" },
    {
      en: "Export to Excel",
      pt: "Exportar para o Excel",
      es: "Exportar para Excel",
    },
    { en: "Export to PDF", pt: "Exportar para o PDF", es: "Exportar para PDF" },
    {
      en: "Remove Selected Items",
      pt: "Remover Itens Selecionados",
      es: "Eliminar ??tems seleccionados",
    },
    {
      en: "Registration of Animal Profile",
      pt: "Registro do Perfil Animal",
      es: "Registrar Perfil Animal",
    },
    {
      en: "New animal Profile",
      pt: "Novo Perfil Animal",
      es: "Nuevo Perfil Animal",
    },
    {
      en: "Type the animal profile name",
      pt: "Digite o nome do Perfil Animal",
      es: "Digitar nombre de Perfil Animal",
    },
    {
      en: "Protein dep. Ratio (d)",
      pt: "Taxa de Deposi????o de Prote??na (d)",
      es: "Tasa de deposici??n de Prote??na (d)",
    },
    {
      en: "Lipid/Protein maturity",
      pt: "Gordura/Prote??na na maturidade",
      es: "Grasa/Prote??na en la Madurez",
    },
    {
      en: "Feather Protein maturity (g)",
      pt: "Prote??na das Penas na maturidade (g)",
      es: "Prote??na de las Plumas en la madurez (g)",
    },
    {
      en: "Coef. b (Water/Protein)",
      pt: "Coeficiente b (Agua/Prote??na)",
      es: "Coeficiente b (Agua/Prote??na)",
    },
    { en: "Mineral b (g)", pt: "Mineral b (g)", es: "Mineral b (g)" },
    { en: "Ash b (g)", pt: "Cinzas b (g)", es: "Ceniza b (g)" },
    { en: "Ash a (g)", pt: "Cinzas a (g)", es: "Ceniza a (g)" },
    {
      en: "Initial Body weight (g)",
      pt: "Peso vivo no inicio (g)",
      es: "Peso vivo Inicial (g)",
    },
    {
      en: "Protein maturity (g)",
      pt: "Prote??na na maturidade (g)",
      es: "Prote??na en la madurez (g)",
    },
    {
      en: "Feather Protein dep. Ratio (d)",
      pt: "Taxa de Deposi????o de Prote??na nas Penas (d)",
      es: "Tasa de Deposici??n de Prote??na en las Plumas (d)",
    },
    {
      en: "Coef. a (Water/Protein)",
      pt: "Coeficiente a (Agua/Prote??na)",
      es: "Coeficiente a (Agua/Prote??na)",
    },
    { en: "Mineral a (g)", pt: "Mineral a (g)", es: "Mineral a (g)" },
    { en: "Log out", pt: "Sair", es: "Salir" },
    {
      en: "No record found!",
      pt: "Nenhum registro encontrado!",
      es: "No se encontraron registros!",
    },
    {
      en: "register found",
      pt: "registro encontrado",
      es: "registros encontrados",
    },
    { en: "New simulation", pt: "Nova Simula????o", es: "Nueva Simulaci??n" },
    {
      en: "List of Simulations",
      pt: "Lista de Simula????es",
      es: "Lista de Simulaciones",
    },
    { en: "Comparison", pt: "Compara????o", es: "Comparaci??n" },
    { en: "New Optimization", pt: "Nova Otimiza????o", es: "Nueva Optimizaci??n" },
    { en: "Optimization", pt: "Otimiza????o", es: "Optimizaci??n" },
    {
      en: "List of optimizations",
      pt: "Lista de Otimiza????o",
      es: "Lista de Optimizaciones",
    },
    { en: "Wait", pt: "Aguarde", es: "Espere por favor" },
    { en: "Generating Data!", pt: "Gerando dados", es: "procesando datos" },
    { en: "Input", pt: "Entrada de Dados", es: "Ingreso de Datos" },
    {
      en: "Select the simulation",
      pt: "Selecione a simula????o",
      es: "Seleccione una simulaci??n",
    },
    {
      en: "Diet Component",
      pt: "Componente da dieta (Referencia)",
      es: "Componente de las dietas (Referencia)",
    },
    {
      en: "Select the diet component",
      pt: "Selecionar o componente da dieta",
      es: "Seleccionar el componente de la dieta",
    },
    {
      en: "Digestible Lysine (%)",
      pt: "Lisina Digest??vel (%)",
      es: "Lisina Digestible (%)",
    },
    {
      en: "Lysine (%)",
      pt: "Lisina (%)",
      es: "Lisina (%)",
    },
    {
      en: "Balanced  Protein (%)",
      pt: "Prote??na Balanceada (%)",
      es: "Prote??na Balanceada (%)",
    },
    {
      en: "Metabolizable Energy (kcal/kg)",
      pt: "Energia Metaboliz??vel (kcal/kg)",
      es: "Energ??a Metabolizable (kcal/kg)",
    },
    { en: "Variation", pt: "Unidade de Varia????o", es: "Unidad de Variaci??n" },
    {
      en: "Range down",
      pt: "N??mero de varia????es abaixo da Referencia",
      es: "N??mero de variaciones inferiores a la Referencia",
    },
    {
      en: "Range up",
      pt: "N??mero de varia????es acima da Referencia",
      es: "N??mero de variaciones superiores a la Referencia",
    },
    {
      en: "Total simulation attempts",
      pt: "Tentativas de Simula????es",
      es: "Tentativas de Simulaciones",
    },
    {
      en: "Economic values ($/kg)",
      pt: "Pre??os de Mercado ($/kg)",
      es: "Precios de Mercado ($/kg)",
    },
    { en: "Live Body Weight", pt: "Peso Vivo", es: "Peso Vivo" },
    { en: "Carcass", pt: "Carca??a", es: "Carcasa" },
    { en: "Cuts", pt: "Cortes", es: "Cortes" },
    { en: "Breast", pt: "Peito", es: "Pechuga" },
    { en: "Thigh", pt: "Coxa", es: "Muslo" },
    { en: "Drumstick", pt: "Sobrecoxa", es: "Contra muslo" },
    { en: "Wing", pt: "Asas", es: "Alas" },
    { en: "Remaining", pt: "Remanescente", es: "Remanente" },
    { en: "Optimize", pt: "Otimizar", es: "Optimizar" },
    {
      en: "Select an item from the list",
      pt: "Selecione um item da lista",
      es: "Seleccione un ??tem de la lista",
    },
    { en: "Reports", pt: "Relat??rios", es: "Informes" },
    { en: "Register", pt: "Registro", es: "Registro" },
    { en: "New Profile", pt: "Novo Perfil", es: "Nuevo Perfil" },
    { en: "New User", pt: "Novo Usu??rio", es: "Nuevo Usuario" },
    { en: "Profile Data", pt: "Dados do Perfil", es: "Datos del Perfil" },
    { en: "User Data", pt: "Dados do Usu??rio", es: "Datos del Usuario" },
    { en: "Permissions", pt: "Permiss??es", es: "Permisos" },
    { en: "Permission", pt: "Permiss??o", es: "Permiso" },
    { en: "Permission Filter", pt: "Filtro Permiss??o", es: "Filtro Permiso" },
    { en: "Modules", pt: "M??dulos", es: "M??dulos" },
    { en: "Sub-modules", pt: "Sub-m??dulos", es: "subm??dulos" },
    { en: "Language", pt: "Idioma", es: "Idioma" },
    {
      en: "Select language",
      pt: "Selecione o idioma",
      es: "Selecione el Idioma",
    },
    { en: "Phone", pt: "Telefone", es: "Tel??fono" },
    { en: "Responsibility", pt: "Ocupa????o", es: "Posici??n" },
    { en: "Data", pt: "Dados", es: "Datos" },
    { en: "Profile", pt: "Perfil", es: "Perfil" },
    { en: "User Profile", pt: "Perfil do Usu??rio", es: "Perfil del Usuario" },
    { en: "Profile Filter", pt: "Filtro Perfil", es: "Filtro Perfil" },
    { en: "Hierarchy", pt: "Hierarquia", es: "Jerarqu??a" },
    { en: "Supervisor", pt: "Supervisor", es: "Supervisor" },
    {
      en: "Enter the user name or email and select",
      pt: "Digite o nome ou o email do usu??rio e selecione",
      es: "Introduzca el nombre o el correo electr??nico del usuario y seleccione",
    },
    { en: "Not Found", pt: "N??o Encontrado", es: "No Encontrado" },
    { en: "Min", pt: "M??n", es: "Min" },
    { en: "Max", pt: "M??x", es: "Max" },
    { en: "Price/kg", pt: "Pre??o/kg", es: "Precio/kg" },
    {
      en: "Select Simulation",
      pt: "Selecione a Simula????o",
      es: "Selecione la Simulaci??n",
    },
    { en: "Day", pt: "Dia", es: "Dia" },
    { en: "Start", pt: "In??cio", es: "Inicio" },
    {
      en: "Ingredient Data",
      pt: "Dados do Ingrediente",
      es: "Datos del Ingrediente",
    },
    {
      en: "Customer",
      pt: "Cliente",
      es: "Cliente",
    },
    {
      en: "Customers",
      pt: "Clientes",
      es: "Clientes",
    },
    {
      en: "List of optimization",
      pt: "Lista de otimiza????es",
      es: "Lista de otimiza????es",
    },
    {
      en: "Type the E-mail",
      pt: "Digite o E-mail",
      es: "Escriba el correo electr??nico",
    },
    {
      en: "Type the Responsibility",
      pt: "Digite o E-mail",
      es: "Escriba la responsabilidad",
    },
    {
      en: "City",
      pt: "Cidade",
      es: "Ciudad",
    },
    {
      en: "Type the city",
      pt: "Digite a cidade",
      es: "Escriba la ciudad",
    },
    {
      en: "State",
      pt: "Estado",
      es: "Estado",
    },
    {
      en: "Type the state",
      pt: "Digite a estado",
      es: "Escriba la estado",
    },
    {
      en: "Phone Number",
      pt: "Telefone",
      es: "Tel??fono",
    },
    {
      en: "Select the role",
      pt: "Selecione a permiss??o",
      es: "Selecciona el rol",
    },
    {
      en: "Create User",
      pt: "Criar Usu??rio",
      es: "Crear Usuario",
    },
    {
      en: "New Customer",
      pt: "Novo Cliente",
      es: "Nuevo Cliente",
    },
    {
      en: "User",
      pt: "Usu??rio",
      es: "Usuario",
    },
    {
      en: "Fill in Customer data",
      pt: "Digite os dados do cliente",
      es: "Escriba los datos del cliente",
    },
    {
      en: "Responsible",
      pt: "Repons??vel",
      es: "Responsable",
    },
    {
      en: "Create Customer",
      pt: "Criar Cliente",
      es: "Crear Cliente",
    },
    {
      en: "Do you want to confirm customer creation?",
      pt: "Deseja confirma a cria????o do cliente?",
      es: "??Quieres confirmar la creaci??n del cliente?",
    },
    {
      en: "Yes, Create Customer",
      pt: "Sim, Criar Cliente",
      es: "Si, Crear Cliente",
    },
    {
      en: "Edit Customer",
      pt: "Editar Cliente",
      es: "Editar Cliente",
    },
    {
      en: "Do you want to confirm customer edit?",
      pt: "Deseja confirma a edi????o do cliente?",
      es: "??Quieres confirmar la edici??n del cliente?",
    },
    {
      en: "Yes, Edit Customer",
      pt: "Sim, Editar Cliente",
      es: "Si, Editar Cliente",
    },
    {
      en: "Cancel",
      pt: "Cancelar",
      es: "Cancelar",
    },
    {
      en: "Type the Customer",
      pt: "Digite o cliente",
      es: "Escriba el cliente",
    },
    {
      en: "Show default ingredients",
      pt: "Mostrar Indredientes padr??o",
      es: "Escriba el cliente",
    },
    {
      en: "Edit Ingredient",
      pt: "Editar ingrediente",
      es: "Editar ingrediente",
    },
    {
      en: "Create Ingredient",
      pt: "Criar ingrediente",
      es: "Editar ingrediente",
    },
    {
      en: "Error to search ingredients",
      pt: "Erro ao pesquisar ingredientes",
      es: "Error al buscar ingredientes",
    },
    {
      en: "Ingredient Name",
      pt: "Nome do Ingrediente",
      es: "Nombre del ingrediente",
    },
    {
      en: "Price",
      pt: "Pre??o",
      es: "Precio",
    },
    {
      en: "Fill in ingredient data",
      pt: "Digite os dados do ingrediente",
      es: "Escriba los datos del ingrediente",
    },
    {
      en: "Type the Customer Name",
      pt: "Digite o nome do cliente",
      es: "Escriba el nombre del cliente",
    },
    {
      en: "Value",
      pt: "Valor",
      es: "Valor",
    },
    {
      en: "Type the Value",
      pt: "Digite o valor",
      es: "Escriba el valor",
    },
    {
      en: "WaterHC",
      pt: "Capacidade de reten????o de ??gua",
      es: "Capacidad de retenci??n de agua",
    },
    {
      en: "Water HC",
      pt: "Capacidade de reten????o de ??gua",
      es: "Capacidad de retenci??n de agua",
    },
    {
      en: "Do you want to confirm ingredient edit?",
      pt: "Deseja confirma a edi????o do ingrediente?",
      es: "??Quieres confirmar la edici??n del ingrediente?",
    },
    {
      en: "Do you want to confirm ingredient creation?",
      pt: "Deseja confirma a cria????o do ingrediente?",
      es: "??Quieres confirmar la creaci??n del ingrediente?",
    },
    {
      en: "Yes, Edit Ingredient",
      pt: "Sim, Editar Ingrediente",
      es: "Si, Editar Ingrediente",
    },
    {
      en: "Yes, Create Ingredient",
      pt: "Sim, Criar Ingrediente",
      es: "Si, Crear Ingrediente",
    },
    {
      en: "Date",
      pt: "Data",
      es: "Fecha",
    },
    {
      en: "Showing",
      pt: "Montrando",
      es: "Montrando",
    },
    {
      en: "to",
      pt: "a",
      es: "a",
    },
    {
      en: "of",
      pt: "de",
      es: "de",
    },
    {
      en: "Sort",
      pt: "Ordenar",
      es: "Clasificar",
    },
    {
      en: "Ascending",
      pt: "Crescente",
      es: "Creciente",
    },
    {
      en: "Descending",
      pt: "Decrescente",
      es: "decreciente",
    },
    {
      en: "Composition",
      pt: "Composi????o",
      es: "Composici??n",
    },
    {
      en: "Aminoacids",
      pt: "Amino??cidos",
      es: "Amino??cidos",
    },
    {
      en: "Condiction",
      pt: "Condi????o",
      es: "Condici??n",
    },
    {
      en: "Feed Restriction Program List",
      pt: "Lista do Programa de Restri????o Alimentar",
      es: "Lista de programas de restricci??n de alimentaci??n",
    },
    {
      en: "Feed Restriction Program Name",
      pt: "Nome do programa de restri????o alimentar",
      es: "Nombre del programa de restricci??n de alimentaci??n",
    },
    {
      en: "Fill in Feed Restriction Program data",
      pt: "Preencha os dados do Programa de Restri????o Alimentar",
      es: "Complete los datos del Programa de restricci??n de alimentaci??n",
    },

    {
      en: "Create Feed Restriction Program",
      pt: "Criar Programa de Restri????o Alimentar",
      es: "Crear Programa de Restricci??n de Alimentaci??n",
    },
    {
      en: "Edit Feed Restriction Program",
      pt: "Editar Programa de Restri????o Alimentar",
      es: "Editar Programa de Restricci??n de Alimentaci??n",
    },
    {
      en: "Do you want to confirm Feed Restriction Program edit?",
      pt: "Deseja confirma a edi????o do programa de restri????o alimentar?",
      es: "??Quieres confirmar la edici??n del Programa de restricci??n de alimentaci??n?",
    },
    {
      en: "Do you want to confirm Feed Restriction Program creation?",
      pt: "Deseja confirma a cria????o do programa de restri????o alimentar?",
      es: "??Quieres confirmar la creaci??n del Programa de restricci??n de alimentaci??n?",
    },
    {
      en: "Yes, Edit Feed Restriction Program",
      pt: "Sim, Editar programa de restri????o alimentar",
      es: "Si, Editar programa de restricci??n de alimentaci??n",
    },
    {
      en: "Yes, Create Feed Restriction Program",
      pt: "Sim, Criar programa de restri????o alimentar",
      es: "Si, Crear programa de restricci??n de alimentaci??n",
    },
    {
      en: "Diet Program List",
      pt: "Lista de programas de dieta",
      es: "Lista de programas de dieta",
    },
    {
      en: "Edit Diet Program",
      pt: "Editar Programa de Dieta",
      es: "Editar Programa de Dieta",
    },
    {
      en: "Create Diet Program",
      pt: "Criar Programa de Dieta",
      es: "Crear Programa de Dieta",
    },
    {
      en: "Do you want to confirm Diet Program edit?",
      pt: "Deseja confirma a edi????o do Programa de Dieta?",
      es: "??Quieres confirmar la edici??n del Programa de Dieta?",
    },
    {
      en: "Do you want to confirm Diet Program creation?",
      pt: "Deseja confirma a cria????o do Programa de Dieta?",
      es: "??Quieres confirmar la creaci??n del Programa de Dieta?",
    },
    {
      en: "Yes, Edit Diet Program",
      pt: "Sim, Editar Programa de Dieta",
      es: "Si, Editar Programa de Dieta",
    },
    {
      en: "Yes, Create Diet Program",
      pt: "Sim, Criar Programa de Dieta",
      es: "Si, Crear Programa de Dieta",
    },
    {
      en: "Animal Profile List",
      pt: "Lista de perf??s animais",
      es: "Lista de perfiles de animales",
    },
    {
      en: "Edit Animal Profile",
      pt: "Editar Perfil animal",
      es: "Editar Perfil de Animal",
    },
    {
      en: "Create Animal Profile",
      pt: "Criar Perfil Animal",
      es: "Crear Perfil de Animal",
    },
    {
      en: "Do you want to confirm Animal Profile edit?",
      pt: "Deseja confirma a edi????o do Perfil Animal?",
      es: "??Quieres confirmar la edici??n del Perfil de Animal?",
    },
    {
      en: "Do you want to confirm Animal Profile  creation?",
      pt: "Deseja confirma a cria????o do Perfil Animal?",
      es: "??Quieres confirmar la creaci??n del Perfil de Animal?",
    },
    {
      en: "Yes, Edit Animal Profile ",
      pt: "Sim, Editar Perfil Animal",
      es: "Si, Editar Perfil de Animal",
    },
    {
      en: "Yes, Create Animal Profile",
      pt: "Sim, Criar Perfil Animal",
      es: "Si, Crear Perfil de Animal",
    },
    {
      en: "Calibrate Animal Profile",
      pt: "Calibrar perfil animal",
      es: "Calibrar perfil animal",
    },
    {
      en: "Calibration successfuly generated",
      pt: "Calibra????o gerada com sucesso",
      es: "Calibraci??n generada con ??xito",
    },
    {
      en: "Environment Variables List",
      pt: "Lista de Vari??veis ??????de Ambiente",
      es: "Lista de Variables de Entorno",
    },
    {
      en: "New Environment Variables",
      pt: "Nova Vari??veis ??????de Ambiente",
      es: "Nueva Variables de Entorno",
    },
    {
      en: "Edit Environment Variables",
      pt: "Editar Vari??veis ??????de Ambiente",
      es: "Editar Variables de Entorno",
    },
    {
      en: "Create Environment Variables",
      pt: "Criar Vari??veis ??????de Ambiente",
      es: "Crear Variables de Entorno",
    },
    {
      en: "Do you want to confirm Environment Variables edit?",
      pt: "Deseja confirma a edi????o do Vari??veis ??????de Ambiente?",
      es: "??Quieres confirmar la edici??n del Variables de Entorno?",
    },
    {
      en: "Do you want to confirm Environment Variables creation?",
      pt: "Deseja confirma a cria????o do Vari??veis ??????de Ambiente?",
      es: "??Quieres confirmar la creaci??n del Variables de Entorno?",
    },
    {
      en: "Yes, Edit Environment Variables",
      pt: "Sim, Editar Vari??veis ??????de Ambiente",
      es: "Si, Editar Variables de Entorno",
    },
    {
      en: "Yes, Create Environment Variables",
      pt: "Sim, Criar Vari??veis ??????de Ambiente",
      es: "Si, Crear Variables de Entorno",
    },
    {
      en: "Fill in Environment Variables data",
      pt: "Preencha os dados das Vari??veis de Ambiente",
      es: "Complete los datos de las Variables de Entorno",
    },
    {
      en: "Environment Variables Name",
      pt: "Nome das Vari??veis ??????de Ambiente",
      es: "Nombre de las Variables de Entorno",
    },
    {
      en: "Fill in diet data",
      pt: "Preencha os dados da dieta",
      es: "Complete los datos de la dieta",
    },
    {
      en: "Type the nutrient name",
      pt: "Digite o nome do nutriente",
      es: "Escriba el nombre del nutriente",
    },
    {
      en: "Nutrient List",
      pt: "Lista de Nutrientes",
      es: "Lista de Nutrientes",
    },
    {
      en: "Check this option to apply the energy, amino acid, Ca and avP estimated in a simulation previously saved",
      pt: "Marque esta op????o para aplicar a energia, amino??cidos, Ca e avP estimados em uma simula????o salva anteriormente",
      es: "Marque esta opci??n para aplicar la energ??a, amino??cido, Ca y avP estimados en una simulaci??n previamente guardada",
    },
    {
      en: "Select the Simulation type",
      pt: "Selecione o tipo de simula????o",
      es: "Seleccione el tipo de simulaci??n",
    },
    {
      en: "Input Nutrients",
      pt: "Entrada de Nutrientes",
      es: "Entrada de Nutrientes",
    },
    {
      en: "Input Ingredients",
      pt: "Entrada de Ingredientes",
      es: "Entrada de Ingredientes",
    },
    {
      en: "Select the Output Type",
      pt: "Selecione o Tipo de Sa??da",
      es: "Seleccione el tipo de salida",
    },
    {
      en: "Basic",
      pt: "B??sica",
      es: "B??sica",
    },
    {
      en: "Customized",
      pt: "Personalizada",
      es: "Personalizada",
    },
    {
      en: "Simulation Name",
      pt: "Nome da Simula????o",
      es: "Nombre de la simulaci??n",
    },
    {
      en: "Requirement",
      pt: "Requerido",
      es: "Requerido",
    },
    {
      en: "Select the Output values type",
      pt: "Selecione o tipo de valores de sa??da",
      es: "Seleccione el tipo de valores de salida",
    },
    {
      en: "Select the Output Items",
      pt: "Selecione os campos de sa??da",
      es: "Seleccione los elementos de salida",
    },
    {
      en: "One Day Old Weight(g)",
      pt: "Peso ao primeiro dia(g)",
      es: "Peso de un d??a(g)",
    },
    {
      en: "Select the customer",
      pt: "Selecione o cliente",
      es: "Seleccione el cliente",
    },
    {
      en: "Select customer",
      pt: "Selecione o cliente",
      es: "Seleccione el cliente",
    },
    {
      en: "Select the animal profile",
      pt: "Selecione o perfil animal",
      es: "Seleccione el perfile de animal",
    },
    {
      en: "Select the Feed Restriction Program",
      pt: "Selecione o Programa de Restri????o Alimentar",
      es: "Seleccione el Programa de Restricci??n de Alimentacion",
    },
    {
      en: "Select the environment",
      pt: "Selecione o ambiente",
      es: "Seleccione el ambiente",
    },
    {
      en: "Select the Diet Program",
      pt: "Selecione o programa de dieta",
      es: "Seleccione el programa de dieta",
    },
    {
      en: "Initial Weight",
      pt: "Peso Inicial",
      es: "Peso Inicial",
    },
    {
      en: "Initial Weight (g)",
      pt: "Peso Inicial (g)",
      es: "Peso Inicial (g)",
    },
    {
      en: "Type the Initial Weight (g)",
      pt: "Digite o Peso Inicial (g)",
      es: "Escriba el Peso Inicial (g)",
    },
    {
      en: "Final Weight (g)",
      pt: "Peso Final (g)",
      es: "Peso Final (g)",
    },
    {
      en: "Type the Final Weight (g)",
      pt: "Digite o Peso Final (g)",
      es: "Escriba el Peso Final (g)",
    },
    {
      en: "Age (d)",
      pt: "Idade (d)",
      es: "Edad (d)",
    },
    {
      en: "Initial Age (d)",
      pt: "Idade Inicial (d)",
      es: "Edad Inicial (d)",
    },
    {
      en: "Type the Initial Age (d)",
      pt: "Digite a Idade Inicial (d)",
      es: "Escriba la Edad Inicial (d)",
    },
    {
      en: "Final Age (d)",
      pt: "Idade Final (d)",
      es: "Edad Final (d)",
    },
    {
      en: "Type the Final Age (d)",
      pt: "Digite a Idade Final (d)",
      es: "Escriba la Edad Final (d)",
    },
    {
      en: "Feed Digestiblity",
      pt: "Digestibilidade",
      es: "Digestibilidad",
    },
    {
      en: "General",
      pt: "Geral",
      es: "General",
    },
    {
      en: "Parameters",
      pt: "Par??metros",
      es: "Par??metros",
    },
    {
      en: "Diet Parameters",
      pt: "Par??metros da dieta",
      es: "Par??metros de la dieta",
    },
    {
      en: "Phytase",
      pt: "Fitase",
      es: "Fitase",
    },
    {
      en: "Phytase (FTU/kg)",
      pt: "Fitase (FTU/kg)",
      es: "Fitase (FTU/kg)",
    },
    {
      en: "Type the Phytase (FTU/kg)",
      pt: "Digite a Fitase (FTU/kg)",
      es: "escriba la Fitase (FTU/kg)",
    },
    {
      en: "Type the value of ",
      pt: "Digite o valor de ",
      es: "escriba el valor de ",
    },
    {
      en: "Type the (%)",
      pt: "Digite a (%)",
      es: "escriba la (%)",
    },
    {
      en: "Simulation List",
      pt: "Lista de Simula????es",
      es: "Lista de Simulaciones",
    },
    {
      en: "Edit Simulation",
      pt: "Editar Simula????o",
      es: "Editar Simulaci??n",
    },
    {
      en: "Create Simulation",
      pt: "Cria Simula????o",
      es: "Crear Simulaci??n",
    },
    {
      en: "Simulator",
      pt: "Simulador",
      es: "Simulador",
    },
    {
      en: "Do you want to confirm Simulation edit?",
      pt: "Deseja confirma a edi????o da Simula????o?",
      es: "??Quieres confirmar la edici??n del Simulaci??n?",
    },
    {
      en: "Do you want to confirm Simulation creation?",
      pt: "Deseja confirma a cria????o do Simula????o?",
      es: "??Quieres confirmar la creaci??n de la Simulaci??n?",
    },
    {
      en: "Yes, Edit Simulation",
      pt: "Sim, Editar Simula????o",
      es: "Si, Editar Perfil de Animal",
    },
    {
      en: "Yes, Create Simulation",
      pt: "Sim, Criar Simula????o",
      es: "Si, Crear Simulaci??n",
    },
    {
      en: "Animal Profile Name",
      pt: "Nome do Perfil Animal",
      es: "Nombre del Perfile de Animal",
    },
    {
      en: "Diet Program Name",
      pt: "Nome do Programa de Dieta",
      es: "Nombre del Programa de dieta",
    },
    {
      en: "Fill in Diet Program data",
      pt: "Preencha os dados do programa dieta",
      es: "Complete los datos del programa de dieta",
    },
    {
      en: "Mash or Pellet",
      pt: "Mash ou Pellet",
      es: "Mash o Pellet",
    },
    {
      en: "No items found!",
      pt: "Nenhum item encontrado",
      es: "??No se encontraron art??culos!",
    },
    {
      en: "Feed Conversion Ratio (g)",
      pt: "Convers??o alimentar (g)",
      es: "Conversi??n de alimento (g)",
    },
    {
      en: "Feed Conversion (g)",
      pt: "Convers??o alimentar (g)",
      es: "Conversi??n de alimento (g)",
    },
    {
      en: "Standardized Ileal Digestible Phosphorus (%)",
      pt: "F??sforo Digest??vel estandartizado (%)",
      es: "F??sforo digerible estandarizado (%)",
    },
    {
      en: "Standardized Ileal Digestible Phosphorus (mg)",
      pt: "F??sforo Digest??vel estandartizado (mg)",
      es: "F??sforo digerible estandarizado (mg)",
    },
    {
      en: "Item Edited Successfully!",
      pt: "Item Editado com Sucesso!",
      es: "??Elemento editado con ??xito!",
    },
    {
      en: "Item Created Successfully!",
      pt: "Item Criado com Sucesso!",
      es: "??Elemento creado con ??xito!",
    },
    {
      en: "Individual",
      pt: "Indiv??duo",
      es: "Individual",
    },
    {
      en: "Individual - Comparison",
      pt: "Indiv??duo - Compara????o",
      es: "Individual - Comparaci??n",
    },
    {
      en: "Population - Comparison",
      pt: "Popula????o - Compara????o",
      es: "Poblaci??n - Comparaci??n",
    },
    {
      en: "Initial Condiction",
      pt: "Condi????o Inicial",
      es: "Condici??n Inicial",
    },
    {
      en: "Final Condiction",
      pt: "Condi????o Final",
      es: "Condici??n Final",
    },
    {
      en: "No",
      pt: "N??o",
      es: "No",
    },
    {
      en: "Cumulated Feed Intake (g)",
      pt: "Consumo de ra????o acumulado (g)",
      es: "Ingesta de alimento acumulada (g)",
    },
  ];
  config.forEach(function (item) {
    if (item.en.toLowerCase() === text.toLowerCase()) {
      response = item[language];
    }
  });
  return response || text;
};
export const convertNumberToString = (number, decimals) => {
  try {
    if (!number) return 0;
    let arrayDecimals = "";
    if (decimals) {
      arrayDecimals = ",";
      for (let i = 0; i < decimals; i++) {
        arrayDecimals += "0";
      }
    }
    const toNumber = +number;
    return toNumber.toLocaleString(undefined, {
      minimumFractionDigits: decimals || 0,
    });
  } catch (e) {
    return 0;
  }
};

export const compareValues = (key, order) => {
  return function (a, b) {
    const keys = key.split(".");
    let varA = "-";
    let varB = "-";
    if (keys[2]) {
      if (a[keys[0]] && a[keys[0]][keys[1]]) {
        varA =
          typeof a[keys[0]][keys[1]][keys[2]] === "string"
            ? a[keys[0]][keys[1]][keys[2]].toUpperCase()
            : a[keys[0]][keys[1]][keys[2]];
      }
      if (b[keys[0]] && b[keys[0]][keys[1]]) {
        varB =
          typeof b[keys[0]][keys[1]][keys[2]] === "string"
            ? b[keys[0]][keys[1]][keys[2]].toUpperCase()
            : b[keys[0]][keys[1]][keys[2]];
      }
    } else if (keys[1]) {
      if (a[keys[0]]) {
        varA =
          typeof a[keys[0]][keys[1]] === "string"
            ? a[keys[0]][keys[1]].toUpperCase()
            : a[keys[0]][keys[1]];
      }
      if (b[keys[0]]) {
        varB =
          typeof b[keys[0]][keys[1]] === "string"
            ? b[keys[0]][keys[1]].toUpperCase()
            : b[keys[0]][keys[1]];
      }
    } else {
      if (a[keys[0]]) {
        varA =
          typeof a[keys[0]] === "string"
            ? a[keys[0]].toUpperCase()
            : a[keys[0]];
      }
      if (b[keys[0]]) {
        varB =
          typeof b[keys[0]] === "string"
            ? b[keys[0]].toUpperCase()
            : b[keys[0]];
      }
    }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

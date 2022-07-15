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
      es: "Recuperar Contraseña",
    },
    {
      en: "Password sucsessfully created, insert your email and new password!",
      pt: "Senha criada com sucesso, entre com o seu email e sua nova senha!",
      es: "Contraseña creada con éxito, ingrese su correo electrónico y su nueva contraseña!",
    },
    {
      en: "Select a minimum of two diets",
      pt: "Selecione no mínimo duas dietas",
      es: "Seleccione al menos dos dietas",
    },
    {
      en: "Confirm this action?",
      pt: "Confirma esta ação?",
      es: "¿Confirmas esta acción?",
    },
    {
      en: "Data sucssesfully sent!",
      pt: "Dados enviados com sucesso!",
      es: "¡Datos enviados con éxito!",
    },
    {
      en: "Do you confirm this action?",
      pt: "Confirmar ação?",
      es: "Confirmar acción?",
    },
    { en: "Simulation Data", pt: "Dados Simulação", es: "Datos de Simulación" },
    {
      en: "Can't list Diet Program",
      pt: "Não Pode Listar o Programa de Dieta",
      es: "No puedo incluir el programa de dieta",
    },
    {
      en: "Can't list simulations",
      pt: "Não Pode Listar simulações",
      es: "No puedo incluir las simulacciones",
    },
    {
      en: "Save Optimization",
      pt: "Salvar Otimização",
      es: "Guardar Optimización",
    },
    {
      en: "Can't otimizate",
      pt: "Não foi possível otimizar",
      es: "No se pudo optimizar",
    },

    {
      en: "The Diet Programs will be saved with the same name of the optimization",
      pt: "O Programa de Dieta será salvo com o mesmo nome da otimização",
      es: "El programa de dieta se guardará con el mismo nombre que la optimización",
    },
    {
      en: "Enter the optimization name",
      pt: "Entre com o nome da otimização",
      es: "Ingrese el nombre de la optimización",
    },
    {
      en: "Do you conrfirm this action?",
      pt: "Confirmar ação?",
      es: "Confirmar acción?",
    },
    {
      en: "Optimization saved successfully",
      pt: "Otimização salva com sucesso",
      es: "Optimización guardada con éxito",
    },
    {
      en: "Itens successufully removed!",
      pt: "Itens removidos com sucesso!",
      es: "¡Elementos eliminados con éxito!",
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
      es: "¡Datos editados correctamente!",
    },
    {
      en: "Error registering",
      pt: "Erro ao Cadastrar",
      es: "Error al registrarse",
    },
    {
      en: "Filll the required fields!",
      pt: "Preencha os campos obrigatórios!",
      es: "¡Complete los campos obligatorios!",
    },

    {
      en: "Forgot the Password",
      pt: "Esqueci a Senha",
      es: "Olvidé la Contraseña",
    },
    {
      en: "Password recovery sucssesfully sent, check your email (inbox and junk mail) and follow the instructions!",
      pt: "Recuperação de senha enviado com sucesso, verifique sua caixa de email (entrada e lixo eletrônico) e siga as intruções!",
      es: "La recuperación de la contraseña se envió correctamente, verifique su correo electrónico (entrada y correo basura) y siga las instrucciones.",
    },

    { en: "Minimum", pt: "Mínimo", es: "Mínimo" },
    { en: "Maximum", pt: "Máximo", es: "Máximo" },
    {
      en: "Registration of Feed Restriction Program",
      pt: "Cadastro do Programa de Restrição Alimentar",
      es: "Registro de Programa de Restriccion Alimenticia",
    },
    { en: "Overall Report", pt: "Relatório Geral", es: "Informe General" },
    { en: "Edit Diet", pt: "Editar Dieta", es: "Editar Dieta" },
    {
      en: "Number of individuals",
      pt: "Número de indivíduos",
      es: "Numero de individuos",
    },
    { en: "Name", pt: "Nome", es: "Nombre" },
    { en: "Results", pt: "Resultados", es: "Resultados" },
    { en: "Warning", pt: "Aviso", es: "advertencia" },
    { en: "Type the name", pt: "Digite o nome", es: "Escribe el nombre" },
    {
      en: "Successful calibration, do you want to save a new Animal Profile?",
      pt: "Calibração efetuada com sucesso, você quer salvar um novo Perfil Animal?",
      es: "Calibración exitosa, ¿desea guardar un nuevo perfil de animal?",
    },
    {
      en: "The existed diets will not be affected by changes on ingredients. You need to re-formulate diets that includes updated ingredients.",
      pt: "As dietas existentes não serão afetadas por alterações no ingredientes. Você precisa reformular as dietas que incluem ingredientes atualizados.",
      es: "Las dietas existentes no se verán afectadas por cambios en ingredientes. Necesita reformular las dietas que incluyen ingrediente actualizados.",
    },
    { en: "found", pt: "encontrados", es: "encontrados" },
    { en: "View", pt: "Visualizar", es: "Ver" },
    { en: "Gross Profit", pt: "Lucro", es: "Lucro" },
    {
      en: "ECONOMIC OPTIMIZATION",
      pt: "OTIMIZAÇÃO ECONOMICA",
      es: "OPTIMIZACION ECONOMICA",
    },
    {
      en: "CUTS - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "CORTES - RESULTADOS DE RENDIMENTO E AVALIAÇÃO ECONOMICA",
      es: "CORTE - RESUESTA PRODUCTIVA ESPERADA y ANÁLISIS ECONÓMICOS",
    },
    { en: "Diet Name", pt: "Nome da Dieta", es: "Nombre de la Dieta" },
    { en: "Optimizations", pt: "Otimização", es: "Optimizaciones" },
    {
      en: "Balanced Protein (%)",
      pt: "Proteína Balanceada (%)",
      es: "Proteína Balanceada (%)",
    },
    {
      en: "Heat Production",
      pt: "Produção de Calor",
      es: "Producción de Calor",
    },
    { en: "Performance", pt: "Desempenho", es: "Desempeño" },
    {
      en: "Amino Acids Requirements (% diet)",
      pt: "Aminoácidos (% diet)",
      es: "Aminoácidos (% diet)",
    },
    {
      en: "Amino Acids Requirements (mg/Day)",
      pt: "Aminoácidos (mg/Day)",
      es: "Aminoácidos (mg/Day)",
    },
    {
      en: "Amino Acids Requirements (mg)",
      pt: "Exigência de Aminoácidos (mg)",
      es: "Exigência de Aminoácidos (mg)",
    },
    {
      en: "Energy Partitioning",
      pt: "Partição da Energia",
      es: "Particion de Energia",
    },
    {
      en: "Body Composition",
      pt: "Composição Corporal",
      es: "Composición Corporal",
    },
    { en: "Initial Age", pt: "Idade Inicial", es: "Edad Inicial" },
    { en: "Final Age", pt: "Idade Final", es: "Edad Final" },
    { en: "Environment", pt: "Ambiente", es: "Ambientales" },
    { en: "Update", pt: "Calibrar", es: "Calibrar" },
    { en: "Calibration", pt: "Calibração", es: "Calibración" },
    {
      en: "Lipid / Protein maturity",
      pt: "Lipideo / Proteína a maturidade",
      es: "Lipideo / Proteína a maturidade",
    },
    { en: "Diet", pt: "Dieta", es: "Dieta" },
    {
      en: "Diet Composition",
      pt: "Composição de dietas",
      es: "Composición de la dieta",
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
      pt: "Composição Elementar",
      es: "Composición Elementar",
    },
    { en: "Dif/Max Required", pt: "Dif/Max Exigido", es: "Dif/Max Requerido" },
    { en: "Dif/Min Required", pt: "Dif/Min Exigido", es: "Dif/Min Requerido" },
    { en: "Max Required", pt: "Max Exigido", es: "Max Requerido" },
    { en: "Min Required", pt: "Min Exigido", es: "Min Requerido" },
    { en: "Portion", pt: "Quantidade", es: "Cantidad" },
    { en: "Nutrient", pt: "Nutriente", es: "Nutriente" },
    { en: "Ingredient", pt: "Ingrediente", es: "Ingrediente" },
    { en: "Adminstration", pt: "Administração", es: "Administracion" },
    { en: "Name&nbsp", pt: "Nome", es: "Nombre" },
    { en: "Print", pt: "Imprimir", es: "Impresión" },
    { en: "Gender", pt: "Sexo", es: "Género" },
    {
      en: "Diet Formulator",
      pt: "Formulador de Ração",
      es: "Formulador de Raciones",
    },
    { en: "Welcome", pt: "Bem vindo", es: "Bienvenido" },
    { en: "Diets", pt: "Dietas", es: "Dietas" },
    { en: "Diets", pt: "Dietas", es: "Dietas" },
    {
      en: "Power Partitioning",
      pt: "Partição de Energia",
      es: "Particionamiento de energía",
    },
    {
      en: "Genetic Potential",
      pt: "Potencial Genético",
      es: "Potencial genetico",
    },
    { en: "Cut yield", pt: "Rendimento de corte", es: "Rendimiento de corte" },
    { en: "Macrominerals", pt: "Macrominerais", es: "Macrominerales" },
    {
      en: "Amino Acid Requirements (% diet)",
      pt: "Exigência de Aminoácidos (% diet)",
      es: "Exigência de Aminoácidos (% diet)",
    },
    {
      en: "Requirements for Amino Acids (mg)",
      pt: "Exigência de Aminoácidos (mg)",
      es: "Exigência de Aminoácidos (mg)",
    },
    {
      en: "EE for lipid deposition (KJ)",
      pt: "EE para deposção de lipídeo (KJ)",
      es: "EE para deposición lipídica (KJ)",
    },
    {
      en: "EE for lipids deposition (KJ)",
      pt: "EE para deposção de lipídeo (KJ)",
      es: "EE para deposición lipídica (KJ)",
    },
    {
      en: "EE for maintenance (KJ)",
      pt: "EE para mantença (KJ)",
      es: "EE para mantenimiento (KJ)",
    },
    {
      en: "EE for protein deposition (KJ)",
      pt: "EE para deposição de proteína (KJ)",
      es: "EE para la deposición de proteínas (KJ)",
    },
    {
      en: "EE Requirement (KJ)",
      pt: "EE Exigência (KJ)",
      es: "EE Exigencia (KJ)",
    },
    { en: "Weight (g)", pt: "Peso (g)", es: "Peso (g)" },
    { en: "Graphics", pt: "Gráficos", es: "Gráficos" },
    { en: "Energy", pt: "Energia", es: "Energía" },
    { en: "Select Iten", pt: "Selecionar Iten", es: "Seleccione un Artículo" },
    {
      en: "Effective Energy(J/d)",
      pt: "Energia Efetiva(J/d)",
      es: "Energía Efectiva(J/d)",
    },
    {
      en: "Effective Energy (Mj)",
      pt: "Energia Efetiva (Mj)",
      es: "Energía Efectiva (Mj)",
    },
    {
      en: "Metabolizable Energy(cal/d)",
      pt: "Energia Metabolizável(cal/d)",
      es: "Energía Metabolizable(cal/d)",
    },
    { en: "Amino Acids", pt: "Aminoácidos", es: "Aminoácidos" },
    { en: "Ash Body(g)", pt: "Cínzas Corporal(g)", es: "Ceniza del Cuerpo(g)" },
    { en: "Water Body(g)", pt: "Água Corporal(g)", es: "Agua del Cuerpo(g)" },
    { en: "Y Axes", pt: "Eixo Y", es: "Eje Y" },
    { en: "X Axes", pt: "Eixo X", es: "Eje X" },
    {
      en: "Lipid Deposition(g/d)",
      pt: "Deposição de Lipídeo(g/d)",
      es: "Deposición de lípidos(g/d)",
    },
    {
      en: "Protein Deposition Body(g/d)",
      pt: "Deposição de Proteína Corporal(g/d)",
      es: "Deposición De Proteínas del Cuerpo(g/d)",
    },
    {
      en: "Feed Convertion(g/d)",
      pt: "Conversão Alimentar(g/d)",
      es: "Conversión de alimentación(g/d)",
    },
    { en: "Gain(g/d)", pt: "Ganho(g/d)", es: "Ganancia(g/d)" },
    {
      en: "EM Intake(Kcal/d)",
      pt: "Consumo de EM (kcal/d)",
      es: "Consumo de EM (kcal/d)",
    },
    {
      en: "Feed Intake(g)",
      pt: "Consumo de Ração(g)",
      es: "Consumo de Alimento(g)",
    },
    { en: "Feather(g)", pt: "Pena(g)", es: "Pluma(g)" },
    { en: "Simulation two", pt: "Simulação dois", es: "Simulación dos" },
    {
      en: "Comparison between two simulations",
      pt: "Conparação entre duas simulações",
      es: "Comparación entre dos simulaciones",
    },
    { en: "Simulation one", pt: "Simulação um", es: "Simulación uno" },
    {
      en: "Performance: Potential vs. Real",
      pt: "Desempenho: Potencial vs Real",
      es: "Rendimiento: Potencial vs. Real",
    },
    { en: "Simulate", pt: "Simular", es: "Simular" },
    {
      en: "actual Lipid Deposition (g)",
      pt: "Deposição de lipídeo atual (g)",
      es: "Deposición de lípidos real (g)",
    },
    {
      en: "desired Lipid Deposition (g)",
      pt: "Deposição de lipídeo desejado (g)",
      es: "Deposición de lípidos deseada (g)",
    },
    {
      en: "actual Protein Deposition (g)",
      pt: "Deposição de Proteína atual (g)",
      es: "Deposición de proteínas real (g)",
    },
    {
      en: "desired Protein Deposition (g)",
      pt: "Deposição de Proteína desejado (g)",
      es: "Deposición de proteínas deseada (g)",
    },
    {
      en: "Heat Production (KJ)",
      pt: "Produção de Calor (KJ)",
      es: "Producción de calor (KJ)",
    },
    {
      en: "minimum Heat Production (KJ)",
      pt: "Produção de calor miníma (KJ)",
      es: "Producción miníma de calor (KJ)",
    },
    {
      en: "maximum Heat Production (KJ)",
      pt: "Produção de calor máxima (KJ)",
      es: "Producción máxima de calor (KJ)",
    },
    { en: "Wing (g)", pt: "Asa (g)", es: "Ala (g)" },
    { en: "Drumstick (g)", pt: "Sobrecoxa (g)", es: "Sobrecoja (g)" },
    { en: "Thigh (g)", pt: "Coxa (g)", es: "Muslo (g)" },
    { en: "Breast (g)", pt: "Peito (g)", es: "Pechuga (g)" },
    { en: "Body Weight (g)", pt: "Peso Vivo (g)", es: "Peso corporal (g)" },
    {
      en: "Feed Convertion (g)",
      pt: "Conversão Alimentar (g/g)",
      es: "Conversión de alimentación (g/g)",
    },
    {
      en: "Body Weight Gain (g)",
      pt: "Ganho de Peso (g)",
      es: "Aumento de peso corporal (g)",
    },
    {
      en: "actual Feed Intake (g)",
      pt: "Consumo de ração atual (g)",
      es: "Ingesta real de alimento (g)",
    },
    {
      en: "desired Feed Intake (g)",
      pt: "Consumo de ração desejado (g)",
      es: "Ingesta de alimento deseada (g)",
    },
    { en: "Calcium (%)", pt: "Cálcio (%)", es: "Calcio (%)" },
    { en: "Calcium (g)", pt: "Cálcio (g)", es: "Calcio (g)" },
    {
      en: "av. Phosphorus (%)",
      pt: "Fósforo disp. (%)",
      es: "Fósforo disp. (%)",
    },
    {
      en: "av. Phosphorus (g)",
      pt: "Fósforo disp. (g)",
      es: "Fósforo disp. (g)",
    },
    {
      en: "EE for lipids deposition (kJ/day)",
      pt: "EE para deposícão de lipídeo (kJ/day)",
      es: "EE para deposición de lípidos (kJ / día)",
    },
    {
      en: "EE for protein deposition (kJ/day)",
      pt: "EE para deposição de proteína (kJ/day)",
      es: "EE para la deposición de proteína (kJ/day)",
    },
    {
      en: "EE for maintenance (kJ/day)",
      pt: "EE para mantença (kJ/day)",
      es: "EE para mantenimiento (kJ/day)",
    },
    {
      en: "EE requirement (kJ/day)",
      pt: "EE exigência (kJ/day)",
      es: "EE requisito (kJ/day)",
    },
    {
      en: "Potential of lipid dep. (g)",
      pt: "Potencial dep. de Lipídeo (g)",
      es: "Potencial dep. lipídica (g)",
    },
    {
      en: "Potential of feather protein dep. (g)",
      pt: "Potencial de dep. proteína na pena (g)",
      es: "Potencial deposición proteínas de la pluma (g)",
    },
    {
      en: "Potential of body protein dep. (g)",
      pt: "Potencial dep. proteína no corpo (g)",
      es: "Potencial dep. proteínas del cuerpo (g)",
    },
    { en: "Ash (g)", pt: "Cinzas (g)", es: "Ceniza (g)" },
    { en: "Water (g)", pt: "Água (g)", es: "Agua (g)" },
    { en: "Lipid (g)", pt: "Gordura (g)", es: "Grasa (g)" },
    {
      en: "Feather protein (g)",
      pt: "Proteína da pena",
      es: "Proteína de la pluma (g)",
    },
    {
      en: "Body protein (g)",
      pt: "Proteína corporal (g)",
      es: "Proteína corporal (g)",
    },
    {
      en: "Feather weight (g)",
      pt: "Peso de pena (g)",
      es: "Peso de la pluma (g)",
    },
    {
      en: "Health Problem",
      pt: "Problema Sanitário",
      es: "Problema Sanitario",
    },
    { en: "Health Status", pt: "Status Sanitário", es: "Status Sanitario" },
    { en: "Final Condition", pt: "Condição Final", es: "Condición Final" },
    {
      en: "Initial Condition",
      pt: "Condição Inicial",
      es: "Condición Inicial",
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
      pt: "Selecionar o programa de restrição alimentar",
      es: "Seleccione programa de restricción alimenticia",
    },
    {
      en: "Feed Restriction Program",
      pt: "Programa de Restrição Alimentar",
      es: "Programa de Restricción Alimenticia",
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
    { en: "Save Simulation", pt: "Salvar Simulação", es: "Guardar simulación" },
    {
      en: "(Average Individual x Population)",
      pt: "(Indivíduo médio e População)",
      es: "(Individuo promedio y Población)",
    },
    { en: "(Graphs)", pt: "(Gráficos)", es: "(Gráficos)" },
    { en: "Export", pt: "Exportar", es: "Exportar" },
    { en: "Population", pt: "População", es: "Población" },
    {
      en: "Average Individual",
      pt: "Individuo Médio",
      es: "Promedio Individual",
    },
    {
      en: "Generating Simulation!",
      pt: "Gerando Simulação",
      es: "Generando simulación!",
    },
    {
      en: "CUTS - ECONOMIC OPTIMIZATION",
      pt: "Cortes - Otimização economica",
      es: "CORTE - OPTIMIZACION ECONOMICA",
    },
    {
      en: "CARCASS - ECONOMIC OPTIMIZATION",
      pt: "Carcaça - Otimização economica",
      es: "CARCASS - OPTIMIZACIÓN ECONÓMICA",
    },
    {
      en: "Feed Cost ($/kg)",
      pt: "Custo da dieta",
      es: "Costo de alimentación ($ / kg)",
    },
    {
      en: "CARCASS - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "CARCAÇA - RESULTADOS DE DESEMPENHO E VALORES ECONOMICOS",
      es: "CARCASS - RESPUESTA PRODUCTIVA ESPERADA Y ANÁLISIS ECONÓMICOS",
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
      pt: "PESO VIVO - OTIMIZAÇÃO ECONOMICA",
      es: "PESO VIVO - OPTIMIZACIÓN ECONÓMICA",
    },
    {
      en: "LIVE BODY WEIGHT - PERFORMANCE RESULTS AND ECONOMIC VALUES",
      pt: "PESO VIVO - RESULTADOS DE DESEMPENHO E VALORES ECONOMICOS",
      es: "PESO VIVO - RESPUESTA PRODUCTIVA ESPERADA Y ANÁLISIS ECONÓMICOS",
    },
    {
      en: "Save New Optimization",
      pt: "Salvar Nova Otimização",
      es: "Guardar nueva optimización",
    },
    {
      en: "New environment variable",
      pt: "Novo Cadastro de Ambiente",
      es: "Registro de variables ambientales",
    },
    {
      en: "Registration of Environment Variables",
      pt: "Cadastro de Variáveis de Ambiente",
      es: "Registro de variables ambientales",
    },
    {
      en: "type the environment name",
      pt: "Digite o nome do ambiente",
      es: "escriba el nombre del ambiente",
    },
    {
      en: "Air Velocity(m/s²)",
      pt: "Velocidade do Ar(m/s)",
      es: "Velocidad del aire(m/s²)",
    },
    { en: "Temperature(Cº)", pt: "Temperatura(Cº)", es: "Temperatura(Cº)" },
    { en: "Density(m²)", pt: "Densidade(m²)", es: "Densidad(m²)" },
    { en: "Humidity(%)", pt: "Umidade(%)", es: "Humedad(%)" },
    {
      en: "Environment Variables",
      pt: "Variáveis de Ambiente",
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
    { en: "Aminoacids", pt: "Aminoácidos", es: "Aminoácidos" },
    {
      en: "IngredientsElementar Composition",
      pt: "Composição Elementar dos Ingredientes",
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
      pt: "Coef. b (Água / Proteina)",
      es: "Coef. b (Água / Proteina)",
    },
    {
      en: "Coef. a (Water / Protein)",
      pt: "Coef. a (Água / Proteina)",
      es: "Coef. a (Agua / Proteina)",
    },
    {
      en: "Feather Maturity Protein (g)",
      pt: "Proteína da Pena à Maturidade (g)",
      es: "Proteína De La Madurez De La Pluma (g)",
    },
    {
      en: "Lipid / Protein ratio at Maturity",
      pt: "Relação Lipidio / Proteina à Maturidade",
      es: "Relación lípido / proteína en la madurez",
    },
    {
      en: "Maturity Protein (g)",
      pt: "Proteína à Maturidade (g)",
      es: "Proteína De La Madurez (g)",
    },
    { en: "Peso Initial (g)", pt: "Peso Inicial (g)", es: "Peso Inicial (g)" },
    {
      en: "It may take a few minutes!",
      pt: "Pode Levar Alguns Minutos",
      es: "¡Puede Tardar Unos Minutos!",
    },
    {
      en: "Animal Profile Data",
      pt: "Dados do Perfil Animal",
      es: "Datos del Perfil Animal",
    },
    { en: "Offered Feed", pt: "Dieta Oferecida", es: "Alimento Ofrecido" },
    {
      en: "Feed Restriction Program Data",
      pt: "Dados do Programa de Restrição Alimentar",
      es: "Datos del Programa de Restrição Alimenticia",
    },
    { en: "Phen +Tir", pt: "Fen +Tir", es: "Fen +Tir" },
    { en: "Phe + Tyr", pt: "Fen +Tir", es: "Fen +Tir" },
    {
      en: "Digestible Phen +Tyr (%)",
      pt: "Fen +Tir Digestível (%)",
      es: "Fen +Tir Digestible (%)",
    },
    { en: "Histidine", pt: "Histidina", es: "Histidina" },
    {
      en: "Digestible Histidine (%)",
      pt: "Histidina Digestível (%)",
      es: "Histidina Digestible (%)",
    },
    { en: "Leucine", pt: "Leucina", es: "Leucina" },
    {
      en: "Digestible Leucine (%)",
      pt: "Leucina Digestível (%)",
      es: "Leucina Digestible (%)",
    },
    { en: "Isoleucine", pt: "Isoleucina", es: "Isoleucina" },
    {
      en: "Digestible Isoleucine (%)",
      pt: "Isoleucina Digestível (%)",
      es: "Isoleucina Digestible (%)",
    },
    { en: "Phenilalanine", pt: "Fenilalanina", es: "Fenilalanina" },
    {
      en: "Digestible Phenilalanine (%)",
      pt: "Fenilalanina Digestível (%)",
      es: "Fenilalanina Digestible (%)",
    },
    { en: "Valine", pt: "Valina", es: "Valina" },
    {
      en: "Digestible Valine (%)",
      pt: "Valina Digestível (%)",
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
      pt: "Gli + Ser Digestível (%)",
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
      pt: "Arginina Digestível (%)",
      es: "Arginina Digestible (%)",
    },
    {
      en: "Arginine (%)",
      pt: "Arginina (%)",
      es: "Arginina (%)",
    },
    { en: "Tryptophan", pt: "Triptofano", es: "Triptópano" },
    {
      en: "Digestible Tryptophan (%)",
      pt: "Triptofano Digestível (%)",
      es: "Triptópano Digestible (%)",
    },
    {
      en: "Tryptophan (%)",
      pt: "Triptofano (%)",
      es: "Triptópano (%)",
    },
    { en: "Treonine", pt: "Treonina", es: "Treonina" },
    {
      en: "Digestible Treonine (%)",
      pt: "Treonina Digestível (%)",
      es: "Treonina Digestible (%)",
    },
    { en: "Threonine", pt: "Treonina", es: "Treonina" },
    {
      en: "Digestible Threonine (%)",
      pt: "Treonina Digestível (%)",
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
      pt: "Met + Cis Digestível (%)",
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
      pt: "Metionina Digestível (%)",
      es: "Metionine Digestible (%)",
    },
    { en: "Digestible (%)", pt: "Digestível (%)", es: "Digestible (%)" },
    { en: "Total (%)", pt: "Total (%)", es: "Total (%)" },
    { en: "Lysine", pt: "Lisina", es: "Lisina" },
    { en: "Calcium (%)", pt: "Cálcio (%)", es: "Calcio (%)" },
    { en: "Available P (%)", pt: "P Disponível (%)", es: "P Disponible (%)" },
    { en: "Total Calcium (%)", pt: "Cálcio Total (%)", es: "Calcio Total (%)" },
    {
      en: "Total Calcium (mg)",
      pt: "Cálcio Total (mg)",
      es: "Calcio Total (mg)",
    },
    {
      en: "Available Phosphorus (%)",
      pt: "Fósforo Disponível (%)",
      es: "Fósforo Disponible (%)",
    },
    { en: "Crude Fiber (CF)", pt: "Fibra Bruta (FB)", es: "Fibra Bruta (FB)" },
    { en: "total P (%)", pt: "P total (%)", es: "P total (%)" },
    {
      en: "total Phosphorus (%)",
      pt: "Fósforo total (%)",
      es: "Fósforo total (%)",
    },
    {
      en: "Eletrolitic Balance (mEq/kg)",
      pt: "Balanço Eletrolítico (mEq/kg)",
      es: " Balance Electrolítico (mEq/kg)",
    },
    { en: "Chloride (%)", pt: "Clóro (%)", es: "Cloruro (%)" },
    { en: "Sodium (%)", pt: "Sódio (%)", es: "Sodio (%)" },
    { en: "Potassium (%)", pt: "Potássio (%)", es: "Potasio (%)" },
    {
      en: "Mineral Matter (%)",
      pt: "Matéria Mineral (%)",
      es: "Materia Mineral (%)",
    },
    {
      en: "Organic Matter (OM) (%)",
      pt: "Matéria Orgânica (MO) (%)",
      es: "Materia Orgánica (MO) (%)",
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
      pt: "Proteína Bruda (PB) (%)",
      es: "Proteina Cruda (PB) (%)",
    },
    { en: "Dry Matter (%)", pt: "Matéria Seca (%)", es: "Materia Seca (%)" },
    {
      en: "Ingredients Data",
      pt: "Dados do Ingrediente",
      es: "Datos de Ingrediente",
    },
    { en: "Basic Registration", pt: "Registro Básico", es: "Registro Basico" },
    { en: "Price (Kg)", pt: "Preço (kg)", es: "Precio (kg)" },
    {
      en: "EMAIL INFORMATION",
      pt: "INFORMAÇÃO DO EMAIL",
      es: "INFORMACION DE EMAIL",
    },
    { en: "Profile name", pt: "Nome do perfil", es: "Nombre de perfil" },
    { en: "Email data", pt: "Dado do email", es: "Dados de email" },
    { en: "Last event", pt: "Último evento", es: "Último evento" },
    { en: "Look data", pt: "Ver dado", es: "Ver datos" },
    { en: "Equal to", pt: "Igual a", es: "Igual a" },
    { en: "Contains", pt: "Contém", es: "Contiene" },
    { en: "Different from", pt: "Diferente de", es: "DIferente de" },
    { en: "Does not contain", pt: "não contém", es: "no contaiene" },
    {
      en: "Generating Report!",
      pt: "Gerando Relatório!",
      es: "Gerando Informe!",
    },
    { en: "Create/Edit", pt: "Criar/Editar", es: "Crear/Editar" },
    { en: "View", pt: "Visualizar", es: "Ver" },
    { en: "Administration", pt: "Administração", es: "administración" },
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
      es: "Error al restablecer la contraseña",
    },
    {
      en: "Password reset successfully, an email with instructions will be sent to the user!",
      pt: "Senha resetada com sucesso, um email com as instruções será enviado para o usuário!",
      es: "Restablecimiento de contraseña exitoso, ¡se enviará un correo electrónico con instrucciones al usuario!",
    },
    { en: "MALE", pt: "MASCULINO", es: "MACHO" },
    { en: "Options", pt: "Opções", es: "Opciones" },
    {
      en: "Do you want to reset the user's password?",
      pt: "Deseja resetar a senha do usuário?",
      es: "¿Desea restablecer la contraseña del usuario?",
    },
    { en: "Home", pt: "Inicio", es: "Inicio" },
    {
      en: "Profile registration",
      pt: "Cadastro de perfís",
      es: "Registro de perfiles",
    },
    {
      en: "User registration",
      pt: "Cadastro de usuários",
      es: "Registro de usuarios",
    },
    { en: "Administration", pt: "Administração", es: "Administración" },
    { en: "Profiles", pt: "Perfis", es: "Perfiles" },
    { en: "Users", pt: "Usuários", es: "Usuarios" },
    { en: "Emails", pt: "E-mails", es: "Emails" },
    { en: "Email", pt: "E-mail", es: "Email" },
    { en: "CPF", pt: "CPF", es: "CPF" },
    { en: "My data", pt: "Meus Dados", es: "Mis Datos" },
    { en: "Change Password", pt: "Trocar Senha", es: "Cambiar Contraseña" },
    { en: "Password", pt: "Senha", es: "Contraseña" },
    { en: "Reset Password", pt: "Resetar Senha", es: "Restablecer contraseña" },
    { en: "Enter", pt: "Entrar", es: "Entrar" },
    {
      en: "Forgot password?",
      pt: "Esqueceu a senha?",
      es: "Olvidó su contraseña?",
    },
    { en: "Logout", pt: "Sair", es: "Salir" },
    {
      en: "Feed formulator",
      pt: "Formulador de rações",
      es: "Formulador de Raciones",
    },
    { en: "Basic Registration", pt: "Registro básico", es: "Registro Básico" },
    {
      en: "Broiler Breeder",
      pt: "Matriz de Corte",
      es: "Reproductora de Carne",
    },
    { en: "Laying Hen", pt: "Galinhas Poedeiras", es: "Gallinas de Postura" },
    { en: "Ingredients", pt: "Ingredientes", es: "Ingredientes" },
    {
      en: "Diets Composition",
      pt: "Composição das Dietas",
      es: "Composición de las Dietas",
    },
    { en: "Diet Program", pt: "Programa de Dietas", es: "Programa de Dietas" },
    { en: "Animal Profile", pt: "Perfil Animal", es: "Perfil Animal" },
    {
      en: "Environmental Variables",
      pt: "Variáveis de Ambiente",
      es: "Variables Ambientales",
    },
    { en: "Simulation", pt: "Simulações", es: "Simulaciones" },
    { en: "Optimizator", pt: "Otimização", es: "Optimizador" },
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
    { en: "Index", pt: "Índice", es: "índice" },
    { en: "Name", pt: "Nome", es: "Nombre" },
    { en: "Edit", pt: "Editar", es: "Editar" },
    { en: "Back", pt: "Voltar", es: "Regresar" },
    { en: "Feed Formulation", pt: "Fórmula da Ração", es: "Fórmula de Racíon" },
    {
      en: "Nutritional Requirement",
      pt: "Exigência Nutricional",
      es: "Requerimiento Nutricional",
    },
    { en: "Error", pt: "Erro", es: "Error" },
    { en: "Description", pt: "Descrição", es: "Descriptión" },
    {
      en: "Unable to change language",
      pt: "Não foi possível alterar o idioma",
      es: "No se puede cambiar el idioma",
    },
    { en: "Nutrients", pt: "Nutrientes", es: "Nutrientes" },
    {
      en: "Data successfully sent",
      pt: "Dados enviados com sucesso",
      es: "Datos enviados con éxito",
    },
    { en: "Permission Name", pt: "Nome da Permissão", es: "Nombre de Permiso" },
    {
      en: "Look for Ingredient name",
      pt: "Pesquisa por Nome de Ingrediente",
      es: "Búsqueda por nombre de Ingrediente",
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
    { en: "Formulate Diet", pt: "Formular Ração", es: "Formular Ración" },
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
      pt: "Selecionar esta opção para aplicar a Energia, Aminoácido, Ca, o avP estimados em uma simulação salva",
      es: "Seleccione esta opción para utilizar la Energía, Aminoácidos, Ca y avP estimados en una simulación guardada",
    },
    {
      en: "Selected Nutrients",
      pt: "Nutrientes Selecionados",
      es: "Nutrientes Seleccionados",
    },
    {
      en: "New Feed Restriction Program",
      pt: "Novo Programa de Restrição Alimentar",
      es: "Nuevo Programa de Restricción Alimenticia",
    },
    {
      en: "Type the Feed Restriction Program name",
      pt: "Digite o nome do Programa de Restrição Alimentação",
      es: "Digitar nombre de Programa de Restricion Alimenticia",
    },
    { en: "Condition", pt: "Condição", es: "Condición" },
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
      es: "Eliminar ítems seleccionados",
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
      pt: "Taxa de Deposição de Proteína (d)",
      es: "Tasa de deposición de Proteína (d)",
    },
    {
      en: "Lipid/Protein maturity",
      pt: "Gordura/Proteína na maturidade",
      es: "Grasa/Proteína en la Madurez",
    },
    {
      en: "Feather Protein maturity (g)",
      pt: "Proteína das Penas na maturidade (g)",
      es: "Proteína de las Plumas en la madurez (g)",
    },
    {
      en: "Coef. b (Water/Protein)",
      pt: "Coeficiente b (Agua/Proteína)",
      es: "Coeficiente b (Agua/Proteína)",
    },
    { en: "Mineral b (g)", pt: "Mineral b (g)", es: "Mineral b (g)" },
    {
      en: "Initial Body weight (g)",
      pt: "Peso vivo no inicio (g)",
      es: "Peso vivo Inicial (g)",
    },
    {
      en: "Protein maturity (g)",
      pt: "Proteína na maturidade (g)",
      es: "Proteína en la madurez (g)",
    },
    {
      en: "Feather Protein dep. Ratio (d)",
      pt: "Taxa de Deposição de Proteína nas Penas (d)",
      es: "Tasa de Deposición de Proteína en las Plumas (d)",
    },
    {
      en: "Coef. a (Water/Protein)",
      pt: "Coeficiente a (Agua/Proteína)",
      es: "Coeficiente a (Agua/Proteína)",
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
    { en: "New simulation", pt: "Nova Simulação", es: "Nueva Simulación" },
    {
      en: "List of Simulations",
      pt: "Lista de Simulações",
      es: "Lista de Simulaciones",
    },
    { en: "Comparison", pt: "Comparação", es: "Comparación" },
    { en: "New Optimization", pt: "Nova Otimização", es: "Nueva Optimización" },
    { en: "Optimization", pt: "Otimização", es: "Optimización" },
    {
      en: "List of optimizations",
      pt: "Lista de Otimização",
      es: "Lista de Optimizaciones",
    },
    { en: "Wait", pt: "Aguarde", es: "Espere por favor" },
    { en: "Generating Data!", pt: "Gerando dados", es: "procesando datos" },
    { en: "Input", pt: "Entrada de Dados", es: "Ingreso de Datos" },
    {
      en: "Select the simulation",
      pt: "Selecione a simulação",
      es: "Seleccione una simulación",
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
      pt: "Lisina Digestível (%)",
      es: "Lisina Digestible (%)",
    },
    {
      en: "Lysine (%)",
      pt: "Lisina (%)",
      es: "Lisina (%)",
    },
    {
      en: "Balanced  Protein (%)",
      pt: "Proteína Balanceada (%)",
      es: "Proteína Balanceada (%)",
    },
    {
      en: "Metabolizable Energy (kcal/kg)",
      pt: "Energia Metabolizável (kcal/kg)",
      es: "Energía Metabolizable (kcal/kg)",
    },
    { en: "Variation", pt: "Unidade de Variação", es: "Unidad de Variación" },
    {
      en: "Range down",
      pt: "Número de variações abaixo da Referencia",
      es: "Número de variaciones inferiores a la Referencia",
    },
    {
      en: "Range up",
      pt: "Número de variações acima da Referencia",
      es: "Número de variaciones superiores a la Referencia",
    },
    {
      en: "Total simulation attempts",
      pt: "Tentativas de Simulações",
      es: "Tentativas de Simulaciones",
    },
    {
      en: "Economic values ($/kg)",
      pt: "Preços de Mercado ($/kg)",
      es: "Precios de Mercado ($/kg)",
    },
    { en: "Live Body Weight", pt: "Peso Vivo", es: "Peso Vivo" },
    { en: "Carcass", pt: "Carcaça", es: "Carcasa" },
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
      es: "Seleccione un ítem de la lista",
    },
    { en: "Reports", pt: "Relatórios", es: "Informes" },
    { en: "Register", pt: "Registro", es: "Registro" },
    { en: "New Profile", pt: "Novo Perfil", es: "Nuevo Perfil" },
    { en: "New User", pt: "Novo Usuário", es: "Nuevo Usuario" },
    { en: "Profile Data", pt: "Dados do Perfil", es: "Datos del Perfil" },
    { en: "User Data", pt: "Dados do Usuário", es: "Datos del Usuario" },
    { en: "Permissions", pt: "Permissões", es: "Permisos" },
    { en: "Permission", pt: "Permissão", es: "Permiso" },
    { en: "Permission Filter", pt: "Filtro Permissão", es: "Filtro Permiso" },
    { en: "Modules", pt: "Módulos", es: "Módulos" },
    { en: "Sub-modules", pt: "Sub-módulos", es: "submódulos" },
    { en: "Language", pt: "Idioma", es: "Idioma" },
    {
      en: "Select language",
      pt: "Selecione o idioma",
      es: "Selecione el Idioma",
    },
    { en: "Phone", pt: "Telefone", es: "Teléfono" },
    { en: "Responsibility", pt: "Ocupação", es: "Posición" },
    { en: "Data", pt: "Dados", es: "Datos" },
    { en: "Profile", pt: "Perfil", es: "Perfil" },
    { en: "User Profile", pt: "Perfil do Usuário", es: "Perfil del Usuario" },
    { en: "Profile Filter", pt: "Filtro Perfil", es: "Filtro Perfil" },
    { en: "Hierarchy", pt: "Hierarquia", es: "Jerarquía" },
    { en: "Supervisor", pt: "Supervisor", es: "Supervisor" },
    {
      en: "Enter the user name or email and select",
      pt: "Digite o nome ou o email do usuário e selecione",
      es: "Introduzca el nombre o el correo electrónico del usuario y seleccione",
    },
    { en: "Not Found", pt: "Não Encontrado", es: "No Encontrado" },
    { en: "Min", pt: "Mín", es: "Min" },
    { en: "Max", pt: "Máx", es: "Max" },
    { en: "Price/kg", pt: "Preço/kg", es: "Precio/kg" },
    {
      en: "Select Simulation",
      pt: "Selecione a Simulação",
      es: "Selecione la Simulación",
    },
    { en: "Day", pt: "Dia", es: "Dia" },
    { en: "Start", pt: "Início", es: "Inicio" },
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
      pt: "Lista de otimizações",
      es: "Lista de otimizações",
    },
    {
      en: "Type the E-mail",
      pt: "Digite o E-mail",
      es: "Escriba el correo electrónico",
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
      es: "Teléfono",
    },
    {
      en: "Select the role",
      pt: "Selecione a permissão",
      es: "Selecciona el rol",
    },
    {
      en: "Create User",
      pt: "Criar Usuário",
      es: "Crear Usuario",
    },
    {
      en: "New Customer",
      pt: "Novo Cliente",
      es: "Nuevo Cliente",
    },
    {
      en: "User",
      pt: "Usuário",
      es: "Usuario",
    },
    {
      en: "Fill in Customer data",
      pt: "Digite os dados do cliente",
      es: "Escriba los datos del cliente",
    },
    {
      en: "Responsible",
      pt: "Reponsável",
      es: "Responsable",
    },
    {
      en: "Create Customer",
      pt: "Criar Cliente",
      es: "Crear Cliente",
    },
    {
      en: "Do you want to confirm customer creation?",
      pt: "Deseja confirma a criação do cliente?",
      es: "¿Quieres confirmar la creación del cliente?",
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
      pt: "Deseja confirma a edição do cliente?",
      es: "¿Quieres confirmar la edición del cliente?",
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
      pt: "Mostrar Indredientes padrão",
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
      pt: "Preço",
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
      pt: "Capacidade de retenção de água",
      es: "Capacidad de retención de agua",
    },
    {
      en: "Water HC",
      pt: "Capacidade de retenção de água",
      es: "Capacidad de retención de agua",
    },
    {
      en: "Do you want to confirm ingredient edit?",
      pt: "Deseja confirma a edição do ingrediente?",
      es: "¿Quieres confirmar la edición del ingrediente?",
    },
    {
      en: "Do you want to confirm ingredient creation?",
      pt: "Deseja confirma a criação do ingrediente?",
      es: "¿Quieres confirmar la creación del ingrediente?",
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
      pt: "Composição",
      es: "Composición",
    },
    {
      en: "Aminoacids",
      pt: "Aminoácidos",
      es: "Aminoácidos",
    },
    {
      en: "Condiction",
      pt: "Condição",
      es: "Condición",
    },
    {
      en: "Feed Restriction Program List",
      pt: "Lista do Programa de Restrição Alimentar",
      es: "Lista de programas de restricción de alimentación",
    },
    {
      en: "Feed Restriction Program Name",
      pt: "Nome do programa de restrição alimentar",
      es: "Nombre del programa de restricción de alimentación",
    },
    {
      en: "Fill in Feed Restriction Program data",
      pt: "Preencha os dados do Programa de Restrição Alimentar",
      es: "Complete los datos del Programa de restricción de alimentación",
    },

    {
      en: "Create Feed Restriction Program",
      pt: "Criar Programa de Restrição Alimentar",
      es: "Crear Programa de Restricción de Alimentación",
    },
    {
      en: "Edit Feed Restriction Program",
      pt: "Editar Programa de Restrição Alimentar",
      es: "Editar Programa de Restricción de Alimentación",
    },
    {
      en: "Do you want to confirm Feed Restriction Program edit?",
      pt: "Deseja confirma a edição do programa de restrição alimentar?",
      es: "¿Quieres confirmar la edición del Programa de restricción de alimentación?",
    },
    {
      en: "Do you want to confirm Feed Restriction Program creation?",
      pt: "Deseja confirma a criação do programa de restrição alimentar?",
      es: "¿Quieres confirmar la creación del Programa de restricción de alimentación?",
    },
    {
      en: "Yes, Edit Feed Restriction Program",
      pt: "Sim, Editar programa de restrição alimentar",
      es: "Si, Editar programa de restricción de alimentación",
    },
    {
      en: "Yes, Create Feed Restriction Program",
      pt: "Sim, Criar programa de restrição alimentar",
      es: "Si, Crear programa de restricción de alimentación",
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
      pt: "Deseja confirma a edição do Programa de Dieta?",
      es: "¿Quieres confirmar la edición del Programa de Dieta?",
    },
    {
      en: "Do you want to confirm Diet Program creation?",
      pt: "Deseja confirma a criação do Programa de Dieta?",
      es: "¿Quieres confirmar la creación del Programa de Dieta?",
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
      pt: "Lista de perfís animais",
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
      pt: "Deseja confirma a edição do Perfil Animal?",
      es: "¿Quieres confirmar la edición del Perfil de Animal?",
    },
    {
      en: "Do you want to confirm Animal Profile  creation?",
      pt: "Deseja confirma a criação do Perfil Animal?",
      es: "¿Quieres confirmar la creación del Perfil de Animal?",
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
      pt: "Calibração gerada com sucesso",
      es: "Calibración generada con éxito",
    },
    {
      en: "Environment Variables List",
      pt: "Lista de Variáveis ​​de Ambiente",
      es: "Lista de Variables de Entorno",
    },
    {
      en: "New Environment Variables",
      pt: "Nova Variáveis ​​de Ambiente",
      es: "Nueva Variables de Entorno",
    },
    {
      en: "Edit Environment Variables",
      pt: "Editar Variáveis ​​de Ambiente",
      es: "Editar Variables de Entorno",
    },
    {
      en: "Create Environment Variables",
      pt: "Criar Variáveis ​​de Ambiente",
      es: "Crear Variables de Entorno",
    },
    {
      en: "Do you want to confirm Environment Variables edit?",
      pt: "Deseja confirma a edição do Variáveis ​​de Ambiente?",
      es: "¿Quieres confirmar la edición del Variables de Entorno?",
    },
    {
      en: "Do you want to confirm Environment Variables creation?",
      pt: "Deseja confirma a criação do Variáveis ​​de Ambiente?",
      es: "¿Quieres confirmar la creación del Variables de Entorno?",
    },
    {
      en: "Yes, Edit Environment Variables",
      pt: "Sim, Editar Variáveis ​​de Ambiente",
      es: "Si, Editar Variables de Entorno",
    },
    {
      en: "Yes, Create Environment Variables",
      pt: "Sim, Criar Variáveis ​​de Ambiente",
      es: "Si, Crear Variables de Entorno",
    },
    {
      en: "Fill in Environment Variables data",
      pt: "Preencha os dados das Variáveis de Ambiente",
      es: "Complete los datos de las Variables de Entorno",
    },
    {
      en: "Environment Variables Name",
      pt: "Nome das Variáveis ​​de Ambiente",
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
      pt: "Marque esta opção para aplicar a energia, aminoácidos, Ca e avP estimados em uma simulação salva anteriormente",
      es: "Marque esta opción para aplicar la energía, aminoácido, Ca y avP estimados en una simulación previamente guardada",
    },
    {
      en: "Select the Simulation type",
      pt: "Selecione o tipo de simulação",
      es: "Seleccione el tipo de simulación",
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
      pt: "Selecione o Tipo de Saída",
      es: "Seleccione el tipo de salida",
    },
    {
      en: "Basic",
      pt: "Básica",
      es: "Básica",
    },
    {
      en: "Customized",
      pt: "Personalizada",
      es: "Personalizada",
    },
    {
      en: "Simulation Name",
      pt: "Nome da Simulação",
      es: "Nombre de la simulación",
    },
    {
      en: "Requirement",
      pt: "Requerido",
      es: "Requerido",
    },
    {
      en: "Select the Output values type",
      pt: "Selecione o tipo de valores de saída",
      es: "Seleccione el tipo de valores de salida",
    },
    {
      en: "Select the Output Items",
      pt: "Selecione os campos de saída",
      es: "Seleccione los elementos de salida",
    },
    {
      en: "One Day Old Weight(g)",
      pt: "Peso ao primeiro dia(g)",
      es: "Peso de un día(g)",
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
      pt: "Selecione o Programa de Restrição Alimentar",
      es: "Seleccione el Programa de Restricción de Alimentacion",
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
      pt: "Parâmetros",
      es: "Parámetros",
    },
    {
      en: "Diet Parameters",
      pt: "Parâmetros da dieta",
      es: "Parámetros de la dieta",
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
      pt: "Lista de Simulações",
      es: "Lista de Simulaciones",
    },
    {
      en: "Edit Simulation",
      pt: "Editar Simulação",
      es: "Editar Simulación",
    },
    {
      en: "Create Simulation",
      pt: "Cria Simulação",
      es: "Crear Simulación",
    },
    {
      en: "Simulator",
      pt: "Simulador",
      es: "Simulador",
    },
    {
      en: "Do you want to confirm Simulation edit?",
      pt: "Deseja confirma a edição da Simulação?",
      es: "¿Quieres confirmar la edición del Simulación?",
    },
    {
      en: "Do you want to confirm Simulation creation?",
      pt: "Deseja confirma a criação do Simulação?",
      es: "¿Quieres confirmar la creación de la Simulación?",
    },
    {
      en: "Yes, Edit Simulation",
      pt: "Sim, Editar Simulação",
      es: "Si, Editar Perfil de Animal",
    },
    {
      en: "Yes, Create Simulation",
      pt: "Sim, Criar Simulação",
      es: "Si, Crear Simulación",
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
      es: "¡No se encontraron artículos!",
    },
    {
      en: "Feed Conversion Ratio (g)",
      pt: "Conversão alimentar (g)",
      es: "Conversión de alimento (g)",
    },
    {
      en: "Feed Conversion (g)",
      pt: "Conversão alimentar (g)",
      es: "Conversión de alimento (g)",
    },
    {
      en: "Standardized Ileal Digestible Phosphorus (%)",
      pt: "Fósforo Digestível estandartizado (%)",
      es: "Fósforo digerible estandarizado (%)",
    },
    {
      en: "Standardized Ileal Digestible Phosphorus (mg)",
      pt: "Fósforo Digestível estandartizado (mg)",
      es: "Fósforo digerible estandarizado (mg)",
    },
    {
      en: "Item Edited Successfully!",
      pt: "Item Editado com Sucesso!",
      es: "¡Elemento editado con éxito!",
    },
    {
      en: "Item Created Successfully!",
      pt: "Item Criado com Sucesso!",
      es: "¡Elemento creado con éxito!",
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

    return new StringMask("#.##0" + arrayDecimals, { reverse: true }).apply(
      (Math.round(number * 100) / 100).toFixed(decimals || 0).replace(".", "")
    );
  } catch (e) {
    return 0;
  }
};

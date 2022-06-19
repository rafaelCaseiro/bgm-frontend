import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import ReactLoading from "react-loading";
import { api } from "../../services/api";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  cpfMask,
  phoneNumberMask,
  percentage,
} from "../../utils/globalFunctions";
import Switch from "@material-ui/core/Switch";
import {
  CheckBox,
  InputText,
  InputMask,
  Select,
  Required,
  Content,
  AutoComplete,
  Textarea,
  SelectItemsContent,
  SelectItem,
} from "./style";
import { Group } from "../../styles";
import { Icons } from "../Icons";

const Input = (props) => {
  const [options, setOptions] = useState([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  const defaultProps = {
    options: options,
    getOptionLabel: (option) =>
      props.paramsLabel
        ? props.paramsLabel
            .map((param) => option[param])
            .reduce((result, item) =>
              item
                ? (result || "") + (result ? " - " : "") + (item || "")
                : result || ""
            ) || null
        : null,
  };

  const getRadioValue = () => {
    if (!props.params) return props.item;
    const params = props.params
      .split(".")
      .map((param) => (!isNaN(param) ? +param : param));

    let response = null;
    if (params.length === 6) {
      response =
        props.item[params[0]][params[1]][params[2]][params[3]][params[4]][
          params[5]
        ];
    }
    if (params.length === 5) {
      response =
        props.item[params[0]][params[1]][params[2]][params[3]][params[4]];
    }
    if (params.length === 4) {
      response = props.item[params[0]][params[1]][params[2]][params[3]];
    }
    if (params.length === 3) {
      response = props.item[params[0]][params[1]][params[2]];
    }
    if (params.length === 2) {
      response = props.item[params[0]][params[1]];
    }
    if (params.length === 1) {
      response = props.item[params[0]];
    }
    return response === props.value;
  };

  const radioboxHandler = (e) => {
    let copyItem = JSON.parse(JSON.stringify(props.item));
    if (!props.params) return props.setItem(props.value);
    copyItem = props.params ? { ...props.item } : props.item;
    const params = props.params
      .split(".")
      .map((param) => (!isNaN(param) ? +param : param));
    if (params.length === 6) {
      copyItem[params[0]][params[1]][params[2]][params[3]][params[4]][
        params[5]
      ] = props.value;
    } else if (params.length === 5) {
      copyItem[params[0]][params[1]][params[2]][params[3]][params[4]] =
        props.value;
    } else if (params.length === 4) {
      copyItem[params[0]][params[1]][params[2]][params[3]] = props.value;
    } else if (params.length === 3) {
      copyItem[params[0]][params[1]][params[2]] = props.value;
    } else if (params.length === 2) {
      copyItem[params[0]][params[1]] = props.value;
    } else if (params.length === 1) {
      copyItem[params[0]] = props.value;
    }

    props.setItem(copyItem);
  };

  const autocompleteInputHandler = async (e) => {
    setOptions([]);
    setAutocompleteLoading(true);
    const data = {
      model: props.model,
      param: props.param || "",
      select: props.select || "",
      query: {},
    };
    if (
      (props.paramsGet && props.paramsLabel.length > 1) ||
      props.paramsLabel.length > 1
    ) {
      data.query.$or = props.paramsGet
        ? props.paramsGet.map((param) => ({
            [param]: { $regex: e.target.value, $options: "i" },
          }))
        : props.paramsLabel.map((param) => ({
            [param]: { $regex: e.target.value, $options: "i" },
          }));
    } else {
      data.query[props.paramsGet ? props.paramsGet[0] : props.paramsLabel[0]] =
        {
          $regex: e.target.value,
          $options: "i",
        };
    }

    const response = await api.post(
      "filter/autocomplete" +
        (props.query ? `?customQuery=${props.query}` : ""),
      data
    );
    setOptions(response.data);
    setAutocompleteLoading(false);
  };

  const getValue = () => {
    if (props.value !== undefined) return props.value;
    if (!props.params) return props.item;

    const params = props.params
      .split(".")
      .map((param) => (!isNaN(param) ? +param : param));
    if (params.length === 6) {
      return props.item[params[0]][params[1]][params[2]][params[3]][params[4]][
        params[5]
      ];
    }
    if (params.length === 5) {
      return props.item[params[0]][params[1]][params[2]][params[3]][params[4]];
    }
    if (params.length === 4) {
      return props.item[params[0]][params[1]][params[2]][params[3]];
    }
    if (params.length === 3) {
      return props.item[params[0]][params[1]][params[2]];
    }
    if (params.length === 2) {
      return props.item[params[0]][params[1]];
    }
    if (params.length === 1) {
      return props.item[params[0]];
    }
  };

  const inputHandler = (e) => {
    let value =
      props.type === "inputFile"
        ? {
            files: e.target.files,
            fileName: e.target.files[0] ? e.target.files[0].name : "",
            value: e.target.value,
          }
        : e.target[
            props.type === "checkbox" ||
            props.type === "switch" ||
            props.type === "radiobox"
              ? "checked"
              : "value"
          ];

    if ((props.max || props.max === 0) && value > props.max) {
      value = props.max;
    }
    if ((props.min || props.min === 0) && value < props.min) {
      value = props.min;
    }

    if (props.capitalize) {
      value = value.toUpperCase();
    }
    if (props.mask === "cpfCNPJ") {
      value = cpfMask(value);
    } else if (props.mask === "phoneNumber") {
      value = phoneNumberMask(value);
    } else if (props.mask === "percentage") {
      value = percentage(value);
    }

    let copyItem;
    if (props.type === "selectItems") {
      copyItem = JSON.parse(JSON.stringify(props.item));
      if (!props.params) {
        copyItem.push(value);
      } else {
        const params = props.params
          .split(".")
          .map((param) => (!isNaN(param) ? +param : param));
        if (params.length === 6) {
          copyItem[params[0]][params[1]][params[2]][params[3]][params[4]][
            params[5]
          ].push(value);
        } else if (params.length === 5) {
          copyItem[params[0]][params[1]][params[2]][params[3]][params[4]].push(
            value
          );
        } else if (params.length === 4) {
          copyItem[params[0]][params[1]][params[2]][params[3]].push(value);
        } else if (params.length === 3) {
          copyItem[params[0]][params[1]][params[2]].push(value);
        } else if (params.length === 2) {
          copyItem[params[0]][params[1]].push(value);
        } else if (params.length === 1) {
          copyItem[params[0]].push(value);
        }
      }
    } else {
      if (!props.params) return props.setItem(value);
      copyItem = props.params ? { ...props.item } : props.item;
      const params = props.params
        .split(".")
        .map((param) => (!isNaN(param) ? +param : param));
      if (params.length === 6) {
        copyItem[params[0]][params[1]][params[2]][params[3]][params[4]][
          params[5]
        ] = value;
      } else if (params.length === 5) {
        copyItem[params[0]][params[1]][params[2]][params[3]][params[4]] = value;
      } else if (params.length === 4) {
        copyItem[params[0]][params[1]][params[2]][params[3]] = value;
      } else if (params.length === 3) {
        copyItem[params[0]][params[1]][params[2]] = value;
      } else if (params.length === 2) {
        copyItem[params[0]][params[1]] = value;
      } else if (params.length === 1) {
        copyItem[params[0]] = value;
      }
    }
    props.setItem((prevState) => {
      return copyItem;
    });
  };

  const removeItemHandler = (index) => {
    const copyItem = JSON.parse(JSON.stringify(props.item));
    if (!props.params) {
      copyItem.splice(index, 1);
    } else {
      const params = props.params
        .split(".")
        .map((param) => (!isNaN(param) ? +param : param));
      if (params.length === 6) {
        copyItem[params[0]][params[1]][params[2]][params[3]][params[4]][
          params[5]
        ].splice(index, 1);
      } else if (params.length === 5) {
        copyItem[params[0]][params[1]][params[2]][params[3]][params[4]].splice(
          index,
          1
        );
      } else if (params.length === 4) {
        copyItem[params[0]][params[1]][params[2]][params[3]].splice(index, 1);
      } else if (params.length === 3) {
        copyItem[params[0]][params[1]][params[2]].splice(index, 1);
      } else if (params.length === 2) {
        copyItem[params[0]][params[1]].splice(index, 1);
      } else if (params.length === 1) {
        copyItem[params[0]].splice(index, 1);
      }
    }
    props.setItem((prevState) => {
      return copyItem;
    });
  };

  if (props.type === "input") {
    return (
      <Content>
        {props.label && (
          <label>
            {props.label}
            {props.required && <Required>*</Required>}
          </label>
        )}
        <InputText
          className={props.className || "form-control"}
          type={props.inputType || "text"}
          value={props.value || getValue() || ""}
          onChange={props.onChange || inputHandler}
          placeholder={props.placeholder}
          disabled={props.disabled || false}
          required={props.required || false}
        />
      </Content>
    );
  }
  if (props.type === "inputOnly") {
    return (
      <InputText
        className={props.className || "form-control"}
        type={props.inputType || "text"}
        value={props.value || getValue() || ""}
        onChange={props.onChange || inputHandler}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        required={props.required || false}
      />
    );
  }
  if (props.type === "textarea") {
    return (
      <Content>
        {props.label && (
          <label>
            {props.label}
            {props.required && <Required>*</Required>}
          </label>
        )}
        <Textarea
          style={props.style}
          className={props.className || "form-control"}
          value={props.value || getValue() || ""}
          onChange={props.onChange || inputHandler}
          placeholder={props.placeholder}
          disabled={props.disabled || false}
          rows={props.rows || 3}
          required={props.required || false}
        />
      </Content>
    );
  }
  if (props.type === "textAreaOnly") {
    return (
      <Textarea
        style={props.style}
        className={props.className || "form-control"}
        value={props.value || getValue() || ""}
        onChange={props.onChange || inputHandler}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        rows={props.rows || 3}
        required={props.required || false}
      />
    );
  }
  if (props.type === "select") {
    return (
      <Content>
        {props.label && (
          <label className="form-label">
            {props.label}
            {props.required && <Required>*</Required>}
          </label>
        )}
        <Select
          value={props.value || getValue() || ""}
          onChange={props.onChange || inputHandler}
          disabled={props.disabled || false}
          required={props.required || false}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {props.options &&
            props.options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label || item.value}
              </option>
            ))}
        </Select>
      </Content>
    );
  }
  if (props.type === "selectItems") {
    return (
      <Content>
        {props.label && (
          <label className="form-label">
            {props.label}
            {props.required && <Required>*</Required>}
          </label>
        )}
        <Select
          value={""}
          onChange={props.onChange || inputHandler}
          disabled={props.disabled || false}
          required={props.required || false}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {props.options &&
            props.options
              .filter(({ value }) => props.items.indexOf(value) === -1)
              .map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label || item.value}
                </option>
              ))}
        </Select>
        <SelectItemsContent>
          {props.items.map((item, index) => (
            <SelectItem key={item}>
              {item}
              <Icons
                type="close"
                size={10}
                color="#fff"
                onClick={() => removeItemHandler(index)}
              ></Icons>
            </SelectItem>
          ))}
        </SelectItemsContent>
      </Content>
    );
  }
  if (props.type === "selectOnly") {
    return (
      <Select
        value={props.value || getValue() || ""}
        onChange={props.onChange || inputHandler}
        disabled={props.disabled || false}
        required={props.required || false}
        style={props.style}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.options &&
          props.options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label || item.value}
            </option>
          ))}
      </Select>
    );
  }
  if (props.type === "checkbox") {
    return (
      <CheckBox className={props.className} label={!!props.label}>
        <input
          type="checkbox"
          checked={props.value || getValue()}
          onChange={props.onChange || inputHandler}
          disabled={props.disabled || false}
        />
        <label style={props.style || null}>{props.label || null}</label>
        <span></span>
      </CheckBox>
    );
  }

  if (props.type === "radiobox") {
    return (
      <CheckBox
        className={props.className}
        label={!!props.label}
        type={props.type}
      >
        <input
          type="checkbox"
          checked={getRadioValue()}
          onChange={radioboxHandler}
          disabled={props.disabled || false}
        />
        <label>{props.label || null}</label>
        <span></span>
      </CheckBox>
    );
  }

  if (props.type === "radio") {
    return (
      <label className={props.className || "radio"}>
        <input
          type="radio"
          value={props.value || getValue()}
          checked={getValue() === props.value}
          onChange={props.onChange || inputHandler}
          disabled={props.disabled || false}
        />
        {props.label || null}
      </label>
    );
  }
  if (props.type === "autocomplete") {
    return (
      <Content>
        {props.label && (
          <label>
            {props.label} {props.required && <Required>*</Required>}
          </label>
        )}
        <AutoComplete
          {...defaultProps}
          value={props.value || getValue()}
          onChange={(e, value) => inputHandler({ target: { value } })}
          freeSolo
          disabled={props.disabled}
          noOptionsText={
            autocompleteLoading ? (
              <ReactLoading
                type="spin"
                color="#009870"
                height={30}
                width={30}
              />
            ) : (
              "Nenhum item localizado!"
            )
          }
          renderInput={(params) => (
            <TextField
              variant="outlined"
              onChange={autocompleteInputHandler}
              {...params}
              placeholder={props.placeholder}
              margin="normal"
            />
          )}
        />
      </Content>
    );
  }
  if (props.type === "inputMask") {
    return (
      <div className="form-group">
        {props.label && (
          <label className="form-label">
            {props.label}
            {props.required && <Required>*</Required>}
          </label>
        )}
        <InputMask
          className={props.className || "form-control"}
          type={props.inputType || "text"}
          value={props.value || getValue() || ""}
          onChange={props.onChange || inputHandler}
          placeholder={props.placeholder}
          disabled={props.disabled || false}
          required={props.required || false}
          mask={props.mask}
        />
      </div>
    );
  }
  if (props.type === "inputMaskOnly") {
    return (
      <InputMask
        type={props.inputType || "text"}
        value={props.value || getValue() || ""}
        onChange={props.onChange || inputHandler}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        required={props.required || false}
        mask={props.mask}
      />
    );
  }
  if (props.type === "inputFile") {
    return (
      <Group style={{ width: "100%" }}>
        <div className="custom-file">
          <input
            type="file"
            className={props.className || "custom-file-input"}
            value={props.value || getValue().value || ""}
            onChange={props.onChange || inputHandler}
            disabled={props.disabled || false}
            required={props.required || false}
            multiple={props.multiple || false}
            accept={props.accept || "*"}
          />
          <label className="custom-file-label">
            {getValue().files[1]
              ? `${getValue().files.length} arquivos selecionados`
              : getValue().fileName || props.placeholder}
          </label>
        </div>
      </Group>
    );
  }

  if (props.type === "switch") {
    return (
      <FormControlLabel
        control={
          <Switch
            className={props.className || null}
            checked={props.value || getValue()}
            onChange={props.onChange || inputHandler}
            disabled={props.disabled || false}
          />
        }
        label={props.label}
        labelPlacement={props.labelPlacement}
      />
    );
  }

  return null;
};

export { Input };

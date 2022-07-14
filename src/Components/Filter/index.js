import { useCallback, useContext, useState } from "react";
import { Button } from "../Button";
import { Icons } from "../Icons";
import { Input } from "../Input";
import { Container, FilterContent, RangeContent, DateButton } from "./style";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";
import Slider from "@material-ui/core/Slider";
import { Sort } from "../Table/style";
import { DateRange } from "react-date-range";
import { ptBR, enUS, es } from "react-date-range/dist/locale";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoutePath, translate } from "../../utils/globalFunctions";
import Profile from "../../contexts/profile";

export function Filter({
  colKey,
  colParams,
  filter,
  placeholder,
  mask,
  populate,
  min,
  max,
  options,
}) {
  const { profile } = useContext(Profile);

  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const path = getRoutePath(location, params);

  const [input, setInput] = useState("");

  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfDay(new Date()),
      endDate: startOfDay(new Date()),
      key: "selection",
    },
  ]);

  const [range, setRange] = useState([
    min ? min[colKey + (colParams ? "." + colParams : "")] : 0,
    max ? max[colKey + (colParams ? "." + colParams : "")] : 0,
  ]);

  const sort = useCallback(
    (param) => {
      console.log(param);
      navigate(
        path
          .replace(":page", "1")
          .replace(":limit", params.limit)
          .replace(":sort", param)
          .replace(":query", params.query)
          .replace(":id", params.id)
          .replace(":tab", params.tab)
      );
      document.getElementById("root").click();
    },
    [navigate, params, path]
  );

  const filterHandler = useCallback(
    (e) => {
      e.preventDefault();
      const query = JSON.parse(params.query);
      if (filter === "text") {
        if (populate) {
          if (!query.populate) {
            query.populate = [];
          }
          populate.value = input;
          populate.key = colKey;
          query.populate.push(populate);
        } else {
          query[colKey + (colParams ? "." + colParams : "")] = {
            $regex: input,
            $options: "i",
          };
        }
      } else if (filter === "date") {
        query[colKey + (colParams ? "." + colParams : "")] = {
          $gte: startOfDay(dateRange[0].startDate),
          $lte: endOfDay(dateRange[0].endDate),
        };
      } else if (filter === "range") {
        query[colKey + (colParams ? "." + colParams : "")] = {
          $gte: range[0],
          $lte: range[1],
        };
      } else {
        query[colKey + (colParams ? "." + colParams : "")] = input;
        if (input === "") {
          delete query.status;
        }
      }
      navigate(
        path
          .replace(":page", "1")
          .replace(":limit", params.limit)
          .replace(":sort", params.sort)
          .replace(":query", JSON.stringify(query))
          .replace(":id", params.id)
          .replace(":tab", params.tab)
      );
      setInput("");
      document.getElementById("root").click();
    },
    [
      input,
      dateRange,
      range,
      colKey,
      filter,
      colParams,
      populate,
      navigate,
      params,
      path,
    ]
  );

  const FilterButton = useCallback(
    (input) => (
      <Button
        type="submit"
        disabled={!input}
        bg="default"
        border="default"
        notFull={true}
      >
        <Icons type="filter" size="18" color="#fff" />
      </Button>
    ),
    []
  );

  const getFilterType = useCallback(
    () => (
      <FilterContent onSubmit={filterHandler}>
        {filter === "text" || filter === "number" ? (
          <>
            {mask ? (
              <Input
                type="inputMaskOnly"
                mask={mask}
                inputType={filter}
                placeholder={translate(placeholder, profile.language)}
                item={input}
                setItem={setInput}
              />
            ) : (
              <Input
                type="inputOnly"
                inputType={filter}
                placeholder={translate(placeholder, profile.language)}
                item={input}
                setItem={setInput}
              />
            )}

            {<FilterButton input={input} />}
          </>
        ) : filter === "status" ? (
          <>
            <Input
              type="selectOnly"
              inputType={filter}
              placeholder={translate("All", profile.language)}
              item={input}
              setItem={setInput}
              options={[
                { value: "true", label: translate("Active", profile.language) },
                {
                  value: "false",
                  label: translate("Inactive", profile.language),
                },
              ]}
            />
            {<FilterButton input={input} />}
          </>
        ) : filter === "select" ? (
          <>
            <Input
              type="selectOnly"
              inputType={filter}
              placeholder={translate("All", profile.language)}
              item={input}
              setItem={setInput}
              options={options}
            />
            {<FilterButton input={input} />}
          </>
        ) : filter === "date" ? (
          <div>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              locale={
                profile.language === "pt"
                  ? ptBR
                  : profile.language === "es"
                  ? es
                  : enUS
              }
              endDatePlaceholder="Até"
              startDatePlaceholder="De"
              dateDisplayFormat="dd/MM/yyyy"
              color="#094093"
              weekdayDisplayFormat="eeeee"
              rangeColors={["#094093"]}
            />
            <DateButton
              type="submit"
              bg="default"
              border="default"
              color="white"
            >
              Filtrar&nbsp;
              <Icons type="filter" size="18" color="#fff" />
            </DateButton>
          </div>
        ) : filter === "range" ? (
          <RangeContent>
            <Slider
              value={range}
              onChange={(e, newValue) => setRange(newValue)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={
                min ? min[colKey + (colParams ? "." + colParams : "")] : null
              }
              max={
                max ? max[colKey + (colParams ? "." + colParams : "")] : null
              }
            />
            <div>
              <Input
                type="inputOnly"
                placeholder={translate("From", profile.language)}
                inputType="number"
                item={range}
                params="0"
                setItem={setRange}
              />
              <Input
                type="inputOnly"
                inputType="number"
                placeholder={translate("To", profile.language)}
                item={range}
                params="1"
                setItem={setRange}
              />
              <FilterButton input={range} />
            </div>
          </RangeContent>
        ) : null}
      </FilterContent>
    ),
    [
      filter,
      placeholder,
      input,
      mask,
      filterHandler,
      colKey,
      max,
      min,
      range,
      options,
      dateRange,
      colParams,
      profile,
    ]
  );

  return (
    <Container>
      <h3>{translate("Sort", profile.language)}</h3>
      <Sort onClick={() => sort(`${colKey}${colParams ? `.${params}` : ""}`)}>
        {translate("Ascending", profile.language)}
        <Icons type="asc" color="var(--default)" size={15} />
      </Sort>
      <Sort onClick={() => sort(`-${colKey}${colParams ? `.${params}` : ""}`)}>
        {translate("Descending", profile.language)}{" "}
        <Icons type="desc" color="var(--default)" size={15} />
      </Sort>
      <h3>{translate("Filter", profile.language)}</h3>
      {getFilterType()}
    </Container>
  );
}

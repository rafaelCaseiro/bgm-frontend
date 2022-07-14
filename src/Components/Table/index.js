import { useEffect, useState, useCallback, createRef, useContext } from "react";
import Swal from "sweetalert2";
import { api } from "../../services/api";
import { useOutsideClick } from "../../services/outsideClick";
import Pagination from "react-js-pagination";
import ReactLoading from "react-loading";
import {
  convertDateToString,
  getRoutePath,
  getValue,
  translate,
} from "../../utils/globalFunctions";
import { ArrowIcon } from "../ArrowIcon";
import { Button } from "../Button";
import { Filter } from "../Filter";
import { Icons } from "../Icons";
import { Input } from "../Input";
import UserProfileContext from "../../contexts/profile";
import {
  Container,
  Header,
  TableContent,
  CheckboxCell,
  Body,
  Index,
  EditAccess,
  Title,
  Dropdown,
  EmptyTable,
  Status,
  BottomContent,
  TotalItems,
} from "./style";
import isMobile from "is-mobile";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export function Table({
  route,
  cols,
  emptyText,
  editHandler,
  editLink,
  noEdit,
  customEditIcon,
  customEditText,
  loadingEdit,
  noLoad,
}) {
  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const path = getRoutePath(location, params);

  const ref = createRef();

  const { profile } = useContext(UserProfileContext);

  const [loading, setLoading] = useState(true);

  const [selectAll, setSelectAll] = useState(false);

  const [items, setItems] = useState([]);

  const [showDropdown, setShowDropdown] = useState([]);

  const [totalItems, setTotalItems] = useState(0);

  const [runLoadItems, setRunLoadItems] = useState(true);

  const [currentPath, setCurrentPath] = useState("");

  const [max, setMax] = useState(null);

  const [min, setMin] = useState(null);

  useOutsideClick(ref, () => {
    setShowDropdown([]);
  });

  const selectAllHandler = useCallback(
    (checked) => {
      const copyItems = items.map((item) => {
        item.checked = checked;
        return item;
      });
      setItems(copyItems);
      setSelectAll(checked);
    },
    [items]
  );

  const selectItemsHandler = useCallback(
    (checked, index) => {
      const copyItems = [...items];
      copyItems[index].checked = checked;
      setItems(copyItems);
      const hasNotChecked = copyItems.filter((item) => {
        return !item.checked;
      });
      setSelectAll(hasNotChecked.length === 0);
    },
    [items]
  );

  const removeItemsHandler = useCallback(async () => {
    const selectItemsIds = items
      .filter((item) => item.checked)
      .map((item) => item._id);
    if (selectItemsIds[0]) {
      const result = await Swal.fire({
        text: `Deseja arquivar o${selectItemsIds[1] ? "s" : ""} ite ${
          selectItemsIds[1] ? "ns" : "m"
        } selecionados?`,
        title: "Arquivar Itens!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0451e8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, arquivar itens!",
      });
      if (result.value) {
        Swal.fire(
          `Arquivar Ite${selectItemsIds[1] ? "ns" : "m"}!`,
          `Ite${selectItemsIds[1] ? "ns" : "m"} arquivado${
            selectItemsIds[1] ? "s" : ""
          } com sucesso.`,
          "success"
        );
        setLoading(true);
        const response = await api.delete(route, {
          data: selectItemsIds,
        });
        if (response.data) {
          return setRunLoadItems(true);
        }
        setLoading(false);
      }
    }
  }, [items, route]);

  const dropdownHandler = useCallback((index) => {
    setShowDropdown((prevState) => {
      const newState = [];
      newState[index] = !prevState[index];
      return newState;
    });
  }, []);

  const getTypeItem = useCallback((col, row) => {
    if (col.type === "status") {
      return (
        <Status status={row[col.key]}>
          {row[col.key] ? "Ativo" : "Inativo"}
        </Status>
      );
    } else if (col.type === "custom") {
      return col.response(row);
    } else if (col.type === "date") {
      return convertDateToString(
        row[col.key] ? getValue(row[col.key], col.params) : null
      );
    }
    return (
      <span>{row[col.key] ? getValue(row[col.key], col.params) : null}</span>
    );
  }, []);

  const pageClickHandler = useCallback(
    (pageNumber) => {
      if (+pageNumber !== +params.page) {
        navigate(
          path
            .replace(":page", pageNumber)
            .replace(":limit", params.limit)
            .replace(":sort", params.sort)
            .replace(":query", params.query)
            .replace(":id", params.id)
            .replace(":tab", params.tab)
        );
        setRunLoadItems(true);
        setLoading(true);
      }
    },
    [navigate, params, path]
  );

  useEffect(() => {
    document.getElementById("root").click();
    const loadItems = async () => {
      setLoading(true);
      const response = await api
        .get(route, {
          params: { ...params },
        })
        .catch((err) => err);
      if (!response.data) {
        if (response.message === "Request failed with status code 401") {
          return navigate("/404");
        } else {
          setLoading(false);
          Swal.fire("Erro", response.message, "error");
          return;
        }
      }
      setSelectAll(false);
      setItems(response.data.docs);
      setTotalItems(response.data.totalDocs);
      if (response.data.max && response.data.min) {
        setMax(response.data.max);
        setMin(response.data.min);
      }
      setLoading(false);
    };
    if (runLoadItems || location.pathname !== currentPath) {
      setRunLoadItems(false);
      setCurrentPath(location.pathname);
      loadItems();
    }
  }, [route, currentPath, runLoadItems, navigate, location, params]);
  return (
    <>
      {!loading && (
        <Container className="animate__animated animate__fadeInUp">
          <TableContent>
            <Header ref={ref}>
              <tr>
                {!noEdit ? (
                  <CheckboxCell onClick={() => setShowDropdown([])}>
                    <Input
                      type="checkbox"
                      value={selectAll}
                      onChange={(e) => selectAllHandler(e.target.checked)}
                    />
                  </CheckboxCell>
                ) : null}

                <Index onClick={() => setShowDropdown([])}>
                  <span>{translate("Index", profile.language)}</span>
                </Index>
                {cols.map(
                  (
                    {
                      label,
                      filter,
                      key,
                      placeholder,
                      mask,
                      populate,
                      options,
                      style,
                      ...rest
                    },
                    index
                  ) => (
                    <th key={key} style={style}>
                      <Title
                        filter={filter}
                        onClick={filter ? () => dropdownHandler(index) : null}
                      >
                        {label}{" "}
                        {filter && <ArrowIcon show={showDropdown[index]} />}{" "}
                        {params.sort ===
                          `${key}${rest.params ? `.${rest.params}` : ""}` && (
                          <Icons type="asc" color="var(--default)" size={15} />
                        )}
                        {params.sort ===
                          `-${key}${rest.params ? `.${rest.params}` : ""}` && (
                          <Icons type="desc" color="var(--default)" size={15} />
                        )}
                      </Title>
                      {filter && (
                        <Dropdown
                          filter={filter}
                          show={showDropdown[index]}
                          ref={ref}
                        >
                          <Filter
                            {...{
                              colKey: key,
                              colParams: rest.params,
                              filter,
                              placeholder,
                              mask,
                              populate,
                              min,
                              max,
                              options,
                            }}
                          />
                        </Dropdown>
                      )}
                    </th>
                  )
                )}
                {!noEdit && (
                  <EditAccess>
                    <span>
                      {translate(
                        customEditText ? customEditText : "Edit",
                        profile.language
                      )}
                      <Icons
                        type="trash"
                        size="24"
                        color="#7E8299"
                        onClick={removeItemsHandler}
                      />
                    </span>
                  </EditAccess>
                )}
              </tr>
            </Header>
            <Body>
              {items.map((row, index) => (
                <tr key={row._id}>
                  <CheckboxCell onClick={() => setShowDropdown([])}>
                    <Input
                      type="checkbox"
                      value={items[index].checked}
                      onChange={(e) =>
                        selectItemsHandler(e.target.checked, index)
                      }
                    />
                  </CheckboxCell>
                  <td>
                    <span>{index + 1}</span>
                  </td>
                  {cols.map((col) => (
                    <td key={col.key + (col.params || "")}>
                      {getTypeItem(col, row)}
                    </td>
                  ))}
                  {!noEdit && (
                    <td>
                      <Button
                        type="button"
                        bg="default"
                        color="white"
                        border="default"
                        size="sm"
                        style={{ width: 40 }}
                        disabled={loadingEdit && loadingEdit[index]}
                        to={editLink ? editLink + row._id : null}
                        onClick={
                          editHandler ? () => editHandler(row, index) : null
                        }
                      >
                        {loadingEdit && loadingEdit[index] ? (
                          <ReactLoading
                            type="spin"
                            color="#ffffff"
                            height={14}
                            width={14}
                          />
                        ) : (
                          <Icons
                            type={
                              customEditIcon
                                ? customEditIcon
                                : !noEdit
                                ? "edit"
                                : "etc"
                            }
                            color="white"
                            size={14}
                          />
                        )}
                      </Button>
                    </td>
                  )}
                </tr>
              ))}

              {!items[0] && (
                <tr>
                  <EmptyTable colSpan={cols.length + 3}>
                    <span>{emptyText}</span>
                  </EmptyTable>
                </tr>
              )}
              {loading && (
                <tr>
                  <EmptyTable colSpan={cols.length + 3}>
                    <ReactLoading
                      style={{
                        fill: "#094093",
                        height: "20px",
                        width: "20px",
                        display: "inline-table",
                      }}
                      type="spin"
                      color="#094093"
                      height={19}
                      width={19}
                    />
                  </EmptyTable>
                </tr>
              )}
            </Body>
          </TableContent>
          <BottomContent>
            <Pagination
              activePage={+params.page}
              itemsCountPerPage={+params.limit}
              totalItemsCount={+totalItems}
              pageRangeDisplayed={isMobile() ? 4 : 10}
              onChange={pageClickHandler}
              innerClass="pagination-inner"
              linkClass="pagination-link"
              linkClassFirst="pagination-first"
              linkClassPrev="pagination-prev"
              linkClassNext="pagination-next"
              linkClassLast="pagination-last"
              activeLinkClass="pagination-active"
              disabledClass="pagination-disabled"
              prevPageText={
                <Icons type="angleLeft" color="#094093" size={15} />
              }
              firstPageText={
                <Icons type="angleDoubleLeft" color="#094093" size={15} />
              }
              lastPageText={
                <Icons type="angleDoubleRight" color="#094093" size={15} />
              }
              nextPageText={
                <Icons type="angleRight" color="#094093" size={15} />
              }
            />
            <TotalItems>
              {translate("Showing", profile.language)}{" "}
              {+params.page * +params.limit - +params.limit + 1}{" "}
              {translate("to", profile.language)}{" "}
              {totalItems > +params.page * +params.limit
                ? +params.page * +params.limit
                : totalItems}{" "}
              {translate("of", profile.language)} {totalItems}
            </TotalItems>
          </BottomContent>
        </Container>
      )}
    </>
  );
}

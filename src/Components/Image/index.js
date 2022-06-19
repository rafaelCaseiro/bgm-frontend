import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";

export function Image(props) {
  const [isLoad, setIsLoad] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoad(false);
    setIsError(false);
  }, [props.src]);

  return (
    <>
      {!isLoad && !isError ? (
        <ReactLoading type="spin" color="#009870" height={15} width={15} />
      ) : null}
      <div style={{ display: isLoad || isError ? "block" : "none" }}>
        <img
          style={{ maxWidth: "100%" }}
          alt=""
          {...props}
          onLoad={() => {
            setIsLoad(true);
          }}
          onError={() => {
            setIsError(true);
          }}
        />
        {isError ? (
          <img
            alt=""
            className={props.className}
            src={`https://zenbytes-public.sfo2.digitaloceanspaces.com/mcassab/error${
              props.imgSize === "square" ? "square" : ""
            }.png`}
            style={{ maxWidth: "100%" }}
          />
        ) : null}
      </div>
    </>
  );
}

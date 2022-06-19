import React from "react";

export function FontAwesome({
  name,
  type,
  size,
  color,
  style,
  hover,
  ...rest
}) {
  return (
    <i
      {...rest}
      className={`fa-${type} fa-${name} ${hover ? "fa-hover" : ""}`}
      style={{
        fontSize: size,
        color: `var(--${color})`,
        ...style,
      }}
    />
  );
}

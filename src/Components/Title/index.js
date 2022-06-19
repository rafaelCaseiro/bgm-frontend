import { Helmet } from "react-helmet";

export function Title({ children }) {
  return (
    <Helmet>
      <title>Broiler Growth Model - {children}</title>
    </Helmet>
  );
}

import { getFirstLetter } from "../../utils/globalFunctions";
import { Container } from "./style";

export function FirstLetter({ children, bg, color, size }) {
  return (
    <Container bg={bg} color={color} size={size}>
      {getFirstLetter(children)}
    </Container>
  );
}

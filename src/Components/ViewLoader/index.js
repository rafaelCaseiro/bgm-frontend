import { Container, Spin } from "./style";

export function ViewLoader({ isLoading }) {
  return (
    <Container isLoading={isLoading}>
      <Spin type="spin" color="rgba(9,64,147,0.6)" height={130} width={130} />
    </Container>
  );
}

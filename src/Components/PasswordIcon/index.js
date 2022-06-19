import { Container } from "./style";

export function PasswordIcon({ showPassword, setShowPassword, error }) {
  return (
    <Container
      error={error}
      onClick={() => setShowPassword((prevState) => !prevState)}
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M19.2078777,9.84836149 C20.3303823,11.0178941 21,12 21,12 C21,12 16.9090909,18 12,18 C11.6893441,18 11.3879033,17.9864845 11.0955026,17.9607365 L19.2078777,9.84836149 Z"
              fill="#808080"
              fillRule="nonzero"
            />
            <path
              d="M14.5051465,6.49485351 L12,9 C10.3431458,9 9,10.3431458 9,12 L5.52661464,15.4733854 C3.75006453,13.8334911 3,12 3,12 C3,12 5.45454545,6 12,6 C12.8665422,6 13.7075911,6.18695134 14.5051465,6.49485351 Z"
              fill="#808080"
              fillRule="nonzero"
            />
            <rect
              fill="#808080"
              opacity="0.3"
              transform="translate(12.524621, 12.424621) rotate(-45.000000) translate(-12.524621, -12.424621) "
              x="3.02462111"
              y="11.4246212"
              width="19"
              height="2"
            />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M3,12 C3,12 5.45454545,6 12,6 C16.9090909,6 21,12 21,12 C21,12 16.9090909,18 12,18 C5.45454545,18 3,12 3,12 Z"
              fill="#808080"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z"
              fill="#808080"
              opacity="0.6"
            />
          </g>
        </svg>
      )}
    </Container>
  );
}

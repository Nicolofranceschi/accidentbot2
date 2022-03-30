
import { LogoContainer,  Label , LogoSvg} from "./styled";

export function Warning() {
  

  return (
    <>
      <LogoContainer>
        <LogoSvg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.634 37.846L25.76 7.787C25.76 7.787 25.252 6.737 24 6.737C22.748 6.737 22.24 7.787 22.24 7.787L3.366 37.846C3.366 37.846 3 38.337 3 39C3 40.105 3.895 41 5 41H43C44.105 41 45 40.105 45 39C45 38.337 44.634 37.846 44.634 37.846Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M24.014 37C23.282 37 22.678 36.778 22.202 36.334C21.726 35.89 21.488 35.353 21.488 34.721C21.488 34.062 21.728 33.522 22.209 33.101C22.689 32.68 23.291 32.47 24.014 32.47C24.746 32.47 25.346 32.683 25.812 33.108C26.279 33.534 26.512 34.071 26.512 34.721C26.512 35.38 26.281 35.924 25.819 36.354C25.357 36.784 24.755 37 24.014 37ZM26.236 17.721L25.755 29.896C25.74 30.268 25.434 30.562 25.062 30.562H22.883C22.51 30.562 22.204 30.267 22.19 29.894L21.735 17.72C21.72 17.327 22.035 17 22.428 17H25.544C25.937 17 26.252 17.327 26.236 17.721Z"
            fill="url(#paint1_radial)"
          />
          <path
            d="M7.62601 13.04L4.79701 10.211C4.60201 10.016 4.60201 9.69901 4.79701 9.50401L5.50401 8.79701C5.69901 8.60201 6.01601 8.60201 6.21101 8.79701L9.04001 11.626C9.23501 11.821 9.23501 12.138 9.04001 12.333L8.33301 13.04C8.13801 13.235 7.82101 13.235 7.62601 13.04Z"
            fill="#CF1928"
          />
          <path
            d="M5.5 19H2.5C2.224 19 2 18.776 2 18.5V17.5C2 17.224 2.224 17 2.5 17H5.5C5.776 17 6 17.224 6 17.5V18.5C6 18.776 5.776 19 5.5 19Z"
            fill="#CF1928"
          />
          <path
            d="M14.5 10H13.5C13.224 10 13 9.776 13 9.5V6.5C13 6.224 13.224 6 13.5 6H14.5C14.776 6 15 6.224 15 6.5V9.5C15 9.776 14.776 10 14.5 10Z"
            fill="#CF1928"
          />
          <path
            d="M39.667 13.04L38.96 12.333C38.765 12.138 38.765 11.821 38.96 11.626L41.789 8.79701C41.984 8.60201 42.301 8.60201 42.496 8.79701L43.203 9.50401C43.398 9.69901 43.398 10.016 43.203 10.211L40.374 13.04C40.179 13.235 39.862 13.235 39.667 13.04Z"
            fill="#CF1928"
          />
          <path
            d="M42 18.5V17.5C42 17.224 42.224 17 42.5 17H45.5C45.776 17 46 17.224 46 17.5V18.5C46 18.776 45.776 19 45.5 19H42.5C42.224 19 42 18.776 42 18.5Z"
            fill="#CF1928"
          />
          <path
            d="M33 9.5V6.5C33 6.224 33.224 6 33.5 6H34.5C34.776 6 35 6.224 35 6.5V9.5C35 9.776 34.776 10 34.5 10H33.5C33.224 10 33 9.776 33 9.5Z"
            fill="#CF1928"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-308.751"
              y1="-346.874"
              x2="36.906"
              y2="49.567"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDA1C" />
              <stop offset="1" stopColor="#FEB705" />
            </linearGradient>
            <radialGradient
              id="paint1_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(18.189 16.781) scale(22.363)"
            >
              <stop stopColor="#4B4B4B" />
              <stop offset="0.531" stopColor="#393939" />
              <stop offset="1" stopColor="#252525" />
            </radialGradient>
          </defs>
        </LogoSvg>

        <Label>Aggiungi un ID di zona per iniziare</Label>
      </LogoContainer>
    </>
  );
}
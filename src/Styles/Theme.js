import { css } from "styled-components";
const theme = {
  background: "#FFFEFC",
  white: "#FFFFFF",
  orange: "#FF9900",
  yellow: "#FFD66C",
  grey: "rgba(196,196,196,0.3)",
  deepGrey: "#828282",
  lightOrange: "rgba(255,195,170,0.3)",
  fontColor: "#2D2B2B",
  fontTitle: "'Alata', sans-serif;",
  fontContent: "'Noto Sans KR', sans-serif;",
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default theme;
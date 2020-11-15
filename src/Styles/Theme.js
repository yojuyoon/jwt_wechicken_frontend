import styled, { css } from "styled-components";
const theme = {
  background: "#FFFEFC",
  white: "#FFFFFF",
  vermilion: "#ff7425",
  orange: "#FF9900",
  opacityOrange: "rgba(242,153,74,0.5)",
  yellow: "#FFD66C",
  grey: "rgba(196,196,196,0.3)",
  middleGrey: "rgba(65,65,65,0.4)",
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

export const padding = css`
  padding: 0 6vw;
`;

export const HeaderBox = styled.div`
  display: flex;
  ${padding}
  margin: 0 auto;
  position: relative;

  .title {
    width: ${({ width }) => width}px;
    margin-right: 20px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }
`;

export const MainContentCards = styled.div`
  margin-top: 40px;
  padding: 0px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default theme;

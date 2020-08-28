import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./Theme";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing : border-box;
        background-color:${theme.background};
    }
`;

export default GlobalStyles;

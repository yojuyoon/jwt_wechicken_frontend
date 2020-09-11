import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "../Styles/Theme";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing : border-box;
    }

    div, p, span {

	    font-family: ${theme.fontContent};
    }
`;

export default GlobalStyles;

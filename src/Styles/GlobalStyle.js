import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./Theme";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing : border-box;
        background-color:${theme.background};
    }

    span {
        background: none;

    }
    
    img {
        background: none;

    }
    abbr{
        background:none;
    }
`;

export default GlobalStyles;

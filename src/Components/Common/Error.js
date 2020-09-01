import React from 'react';
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";

function Error() {
    return (
        <ErrorContainer>
            <div className="errorImg" />
            <span className="errorText">Error!</span>
        </ErrorContainer>
    );
}

export default Error;

const ErrorContainer = styled.div`
width:100vw;
height:100vh;
${flexCenter};

.errorImg{
    width:200px;
    height:200px;
    border-radius:50%;
    position:absolute;
    background:url("/Images/doghair.jpg");
    background-position:center;
    background-repeat:no-repeat;
}

.errorText{
    margin-top:300px;
    font-size:55px;
    font-weight:600;
    font-family:${theme.fontTitle};
    color:${theme.vermilion};
    animation: blink-animation 0.8s steps(4, start) infinite alternate;
}

@keyframes blink-animation {
   from {
       visibility: visibility;
   }
   to {
       visibility: hidden;
   }
}
`
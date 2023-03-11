import { createGlobalStyle } from "styled-components";
import NunitoBlack from "./Nunito-Black.ttf";

export const GlobalFont = createGlobalStyle(`
    @font-face:
    {src: url(${NunitoBlack}) format('truetype');
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    font-display: auto;}
`);

import { FidgetSpinner } from "react-loader-spinner";
import styled,  { css } from "styled-components";

export const Loader = ({className, color}) => {
    return (
        <Wrapper render={className}>
            <FidgetSpinner backgroundColor={color} ballColors={['orange', 'darkblue', 'red']}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: fit-content;
    ${(props) => {
        switch(props.render){
            case 'loader-homepage': 
                return css`
                margin: auto;

                @media screen and (min-width: 1200px) {
                    margin-left: 100px;
                }
            `
            default:
                return css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%)
            `
        }
    }}
`


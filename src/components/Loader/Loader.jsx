import { FidgetSpinner } from "react-loader-spinner";
import styled,  { css } from "styled-components";

export const Loader = ({className, color}) => {
    return (
        <Wrapper render={className}>
            <FidgetSpinner backgroundColor={color} ballColors={['orange', 'darkblue', 'red']}/>
        </Wrapper>
    )
}


//=============STYLES===============//


const Wrapper = styled.div`
    ${(props) => {
        switch(props.render){
            case 'loader-homepage': 
            return css`
                margin-left: 60px;
            `
            default:
                return css`
                position: absolute;
                top: 50%;
                left: 50%;
            `
        }
    }}
`


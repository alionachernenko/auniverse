import styled from "styled-components"
export const Container = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
    
    @media screen and (min-width: 1440px) {
        width: 100%;
        max-width: 1920px;
    }
`
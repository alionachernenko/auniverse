import { useLocation } from "react-router-dom"
import styled from "styled-components"


export const LoadingPage = () => {
    const location = useLocation()
    console.log(location.pathname)
    const backgroundColor = location.pathname === '/auniverse/catalog' ? 'black' : 'white'
    console.log(backgroundColor)
    return(
        <Page backgroundColor={backgroundColor}>
        </Page>
    )
}

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    backgroundColor: ${props => { console.log(props.backgroundColor)}}
`
import { Link, NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Container, FeedbackFormButton, Logo } from "components"
import { useContext } from "react"
import { authContext } from "context"

export const Footer = () => {
    const { isLoggedIn } = useContext(authContext)
    const location = useLocation()
    return (<PageFooter>
        <Container>
            <FooterContainer>
                <Logo className={'logo_footer'}>AUNIVERSE</Logo>
                <Navigation>
                    <Links>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to={location.pathname !== '/catalog' ? '/catalog' : `/catalog${location.search}`}>Catalog</NavLink></li>
                        <li><NavLink to='/users'>Community</NavLink></li>
                        <li>{isLoggedIn ? <Link to='/profile/bookmarks'>Profile</Link> : <Link to='/login/login-page'>Log in</Link>}</li>
                    </Links>
                </Navigation>
                <Contacts>
                    <a href="tel:+380953596448">+380953596448</a>
                    <a href='mailto:alionachernenkoch@gmail.com'>alionachernenkoch@gmail.com</a>
                    <FeedbackFormButton/>
                </Contacts>
                </FooterContainer>
                </Container>
        </PageFooter>)
}

const PageFooter = styled.footer`
    height: 100%;
    width: 100%;
    padding: 10px 0;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    background-color:  #00021A;
    color: white;

    @media screen and (min-width: 768px){
        padding: 0
    }
`

const FooterContainer = styled.div`
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    flex-wrap: wrap;
    gap: 20px;

    position: relative;
    
    @media screen and (min-width: 768px){
        flex-direction: row;
        justify-content: space-between;
        padding: 0 100px;
    }
`

const Navigation = styled.nav`
    font-family: 'Nunito', sans-serif;
`

const Links = styled.ul`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: 768px){
        flex-direction: column;
        justify-content: space-between;
    }

    & a {
        &.active{
            color: orange
        }
    }
`

const Contacts = styled.address`
    display: flex;
    flex-direction: column;
    gap: 20px;

    word-wrap: wrap;
    font-family: 'Nunito', sans-serif;
    font-style: normal;

    @media screen and (max-width: 767px) {
        align-items: center;
    }
`
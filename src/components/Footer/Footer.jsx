import { Logo } from "components/Logo/Logo"
import { BsArrowUp } from "react-icons/bs"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Container } from "components/Container/Container"

export const Footer = () => {
    return (<PageFooter>
        <Container>
            <FooterContainer>
                <Logo className={'logo_footer'}>AUNIVERSE</Logo>
                <nav>
                    <ul>
                        <li><Link to='/auniverse'>Home</Link></li>
                        <li><Link to='/auniverse/catalog'>Catalog</Link></li>
                    </ul>
                </nav>
                <div><BsArrowUp fill="black" size='30'/></div>
                <address>
                    <a href="tel:+380953596448">+380953596448</a>
                    <a href='mailto:auniverse@gmail.com'>auniverse@gmail.com</a>
                </address>
                </FooterContainer>
                </Container>
        </PageFooter>)
}

const PageFooter = styled.footer`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #080D2B;
    justify-content: flex-start;
    align-items: center;
    color: white;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    padding: 10px 0;
    width: 100%;

    & ul{
        display: flex;
        gap: 20px;

        @media screen and (min-width: 768px){
            flex-direction: column;
            justify-content: space-between;
        }
    }

    & nav{
        font-family: 'Nunito', sans-serif;
        

        & + div{
            // margin-right: 96px;
            height: 100%;
            background-color: white;
            display: flex;
            vertical-align: middle;
            align-items: center;
            width: 65px;
            justify-content: center;
            position: absolute;
            right: 500px;
            top: 0;
          
        }
    }

    & address{
        display: flex;
        flex-direction: column;
        font-style: normal;
        font-family: 'Nunito', sans-serif;
        gap: 20px
    }

    @media screen and (min-width: 768px){
        padding: 0
    }
    
`

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    position: relative;
    gap: 20px;

    @media screen and (min-width: 768px){
        flex-direction: row;
        justify-content: space-between;
        padding: 0 100px
    }
`
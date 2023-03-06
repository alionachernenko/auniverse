import { Logo } from "components/Logo/Logo"
import { BsArrowUp } from "react-icons/bs"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const Footer = () => {
    return (<PageFooter>
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
        </PageFooter>)
}

const PageFooter = styled.footer`
    height: 443.56px;
    min-height: 20px;
    display: flex;
    padding-left: 220px;
    padding-right: 220px;
    background-color: #080D2B;
    align-items: center;
    color: white;
    width: 100vw;

   

    & ul{
        list-style: none;

        & :not(:last-child){
            margin-bottom: 20px
        }
    }

    & nav{
        margin-right: 388px;
        font-family: 'Nunito', sans-serif;
        & + div{
            margin-right: 96px;
            height: 100%;
            min-height: 20;
            background-color: white;
            display: flex;
            vertical-align: middle;
            display: flex;
            align-items: center;
            width: 65px;
            justify-content: center;
        }
    }

    & address{
        display: flex;
        flex-direction: column;
        font-style: normal;
        font-family: 'Nunito', sans-serif;
    }
`
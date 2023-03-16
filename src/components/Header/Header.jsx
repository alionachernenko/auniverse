// import { RiLoginBoxFill, RiUserFill} from 'react-icons/ri'
import styled from 'styled-components'
import { Logo } from 'components/Logo/Logo';
import { SearchForm } from 'components/SearchForm/SearchForm';
// import { useContext, useState} from 'react';
// import breakpointContext from '../../context/contextBr'
import { useLocation } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
// import { Burger } from 'components/Burger/Burger';
import { Container } from 'components/Container/Container';
import { Burger } from 'components/Burger/Burger';
export const Header = ({onSubmit}) => {
    // const {breakpoint} = useContext(breakpointContext)
    // const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation();

    // const toggleMenu = () => {
    //     setIsMenuOpen(prevState => !prevState)
    // }
    
    // console.log(breakpoint)

    return (
        <PageHeader>
            <Container>
                <HeaderContainer>
                <Logo className={'logo_header'}>AUNIVERSE</Logo>
                    <>
                        {location.pathname === '/auniverse/' && <SearchForm onSubmit={onSubmit} className={'header'} />}
                        <Navigation/>
                        <Burger/>
                    </>
                </HeaderContainer>
            </Container>
        </PageHeader>
        )
}

const PageHeader = styled.header`
    box-sizing: border-box;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
    background-color: #080D2B;
    width: 100%;

    @media screen and (max-width: 420px){
        padding: 15px 13px;
    }

    @media screen and (min-width: 421px) and (max-width: 768px){
        padding: 20px 16px;
    }

    @media screen and (min-width: 769px) {
        padding: 20px 70px;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
`
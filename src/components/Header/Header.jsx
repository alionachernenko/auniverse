import { Link, useLocation } from 'react-router-dom';
import { Logo } from 'components/Logo/Logo';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { Navigation } from 'components/Navigation/Navigation';
import { Container } from 'components/Container/Container';
import { MenuButton } from 'components/MenuButton/MenuButton';
import { ProfileButton } from 'components/ProfileButton/ProfileButton'

import styled from 'styled-components'
export const Header = ({onSubmit}) => {
    const location = useLocation();

    return (
        <PageHeader>
            <Container>
                <HeaderContainer>
                <Link to='/'><Logo className={'logo_header'}>AUNIVERSE</Logo></Link>
                    <>
                        {location.pathname === '/' && <SearchForm onSubmit={onSubmit} className={'header'} />}
                        <Navigation/>
                        <ProfileButton/>
                        <MenuButton/>
                    </>
                </HeaderContainer>
            </Container>
        </PageHeader>
    )
}

const PageHeader = styled.header`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    
    position: relative;
    
    background-color: #00021A;
    
    @media screen and (min-width: 420px) and (max-width: 767px){
        padding: 0 16px;
    }

    @media screen and (min-width: 768px) {
        padding: 0 70px;
    }
`

const HeaderContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
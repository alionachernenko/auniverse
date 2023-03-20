import styled from 'styled-components'

import { useLocation } from 'react-router-dom';

import { Logo } from 'components/Logo/Logo';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { Navigation } from 'components/Navigation/Navigation';
import { Container } from 'components/Container/Container';
import { MenuButton } from 'components/MenuButton/MenuButton';
import { ProfileButton } from 'components/ProfileButton/ProfileButton';

export const Header = ({onSubmit}) => {
    const location = useLocation();

    return (
        <PageHeader>
            <Container>
                <HeaderContainer>
                <Logo className={'logo_header'}>AUNIVERSE</Logo>
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
    box-sizing: border-box;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
    background-color: #00021A;
    width: 100%;
    position: relative;


    @media screen and (max-width: 420px){
        padding: 0 13px;
    }

    @media screen and (min-width: 421px) and (max-width: 767px){
        padding: 0 16px;
    }

    @media screen and (min-width: 768px) {
        padding: 0 70px;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
`
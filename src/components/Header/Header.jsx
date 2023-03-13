// import { RiLoginBoxFill, RiUserFill} from 'react-icons/ri'
import styled from 'styled-components'
import { Logo } from 'components/Logo/Logo';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { useContext, useState} from 'react';
import breakpointContext from '../../context/contextBr'
import { useLocation } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import { Burger } from 'components/Burger/Burger';

export const Header = ({onSubmit}) => {
    const {breakpoint} = useContext(breakpointContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState)
    }
    
    console.log(breakpoint)

    return (<PageHeader>
                <Logo className={'logo_header'}>AUNIVERSE</Logo>
                {breakpoint > 1199 ? (
                    <>
                        {location.pathname === '/auniverse' && breakpoint > 1199 && <SearchForm onSubmit={onSubmit} className={'header'} />}
                        <Navigation/>
                    </>
                ) : <Burger onClick={toggleMenu}/>}
                {isMenuOpen && console.log('gffg')}
            </PageHeader>)
}

const PageHeader = styled.header`
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 20px 70px;
    background-color: #080D2B;
    height: 61px;
    color: #FFFDFD;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11111111;

    & svg{
        display: block;
        width: 100%;
        height: 100%
    }
`
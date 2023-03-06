import { RiLoginBoxFill, RiUserFill} from 'react-icons/ri'
import styled from 'styled-components'
import { Logo } from 'components/Logo/Logo';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { Link } from 'react-router-dom';

export const Header = ({isLoggedIn, onSubmit, location}) => {
    console.log(location)
    return (<PageHeader>
                <Logo className={'logo_header'}>AUNIVERSE</Logo>
                {location.pathname === '/auniverse' && <SearchForm onSubmit={onSubmit} className={'searchform_header'} />}
                    <nav>
                        <NavigationMenu>
                            <li><Link to='/auniverse'>Home</Link></li>
                            <li><Link to='/auniverse/catalog'>Catalog</Link></li>
                        </NavigationMenu>
                    </nav>
                <Options>
                    {isLoggedIn && <li><Link to={`/auniverse/profile`}><RiUserFill/></Link></li>}
                    {!isLoggedIn && <li><Link to={`/auniverse/login/login-page`}><RiLoginBoxFill/></Link></li>}
                    </Options>
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

const NavigationMenu = styled.ul` 
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    gap: 53px;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;

    & li{
        font-size: 15px;
        font-style: normal;
        letter-spacing: 0.05em;
        line-height: 140%;
    }
`

const Options = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
`
import {GiHamburgerMenu} from 'react-icons/gi'
import styled from 'styled-components'
export const Burger = () => {
    return (
        <BurgerButton>
            <GiHamburgerMenu color='white'/>
        </BurgerButton>
    )
}


const BurgerButton = styled.div`
    @media screen and (min-width: 1201px){
        display: none;
    }
`
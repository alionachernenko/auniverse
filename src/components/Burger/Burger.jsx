import { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu'
import styled from 'styled-components'

export const Burger = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return (
        <>
            <BurgerButton onClick={() => setIsMenuOpen(true)}>
                <GiHamburgerMenu color='white'/>
            </BurgerButton>
            {isMenuOpen && <BurgerMenu onClick={() => setIsMenuOpen(false)}/>}
        </>
    )
}


const BurgerButton = styled.div`
    @media screen and (min-width: 1201px){
        display: none;
    }
`
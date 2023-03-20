import { useState } from 'react'
import { GiHamburgerMenu} from 'react-icons/gi'
import { BurgerMenu } from 'components/DropdownMenu/DropdownMenu'
import styled from 'styled-components'

export const MenuButton = () => {
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


const BurgerButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;

    @media screen and (min-width: 1201px){
        display: none;
    }
`
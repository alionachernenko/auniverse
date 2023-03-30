import { useState } from 'react'
import { GiHamburgerMenu} from 'react-icons/gi'
import { DropdownMenu } from 'components'
import styled from 'styled-components'

export const MenuButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return (
        <>
            <Button onClick={() => setIsMenuOpen(true)}>
                <GiHamburgerMenu color='white'/>
            </Button>
            {isMenuOpen && <DropdownMenu onClick={() => setIsMenuOpen(false)}/>}
        </>
    )
}


const Button = styled.button`
    border: none;
    padding: 0;

    background-color: transparent;
    
    @media screen and (min-width: 1201px){
        display: none;
    }
`
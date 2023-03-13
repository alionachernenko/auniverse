import {GiHamburgerMenu} from 'react-icons/gi'

export const Burger = ({onClick}) => {
    return (
        <div onClick={onClick}>
            <GiHamburgerMenu/>
        </div>
    )
}
import { MdClose } from "react-icons/md"
import { createPortal } from "react-dom"
import styled from "styled-components"


export const BurgerMenu = ({onClick}) => {
    return createPortal(<Menu>
            <button onClick={() => onClick()}><MdClose/></button>
            <ul>
                <li>Home</li>
                <li>Catalog</li>
            </ul>
        </Menu>, document.querySelector('#burger-menu-root'))
}

const Menu = styled.div`
    position: absolute;
    background-color: white;
    width: auto;
    top: 10px;
    right: 10px;
    padding: 10px;
    height: 100px;
    min-width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1;
`
// const Options = styled.ul`
// `
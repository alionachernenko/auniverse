import styled from "styled-components"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export const Backdrop = ({ children, onClick }) => {
    
     useEffect(() => {
        const onEscapePress = (e) => {
            if(e.code === 'Escape') onClick()    
        }
            window.addEventListener('keydown', onEscapePress)

            return () => {
                window.removeEventListener('keydown', onEscapePress)
            }
     }, [onClick])
    
    return createPortal(
        <Wrapper onClick={(e) => {
            if (e.target === e.currentTarget) onClick()
        }}>
            {children}
        </Wrapper>, document.querySelector('#modal-root')
    )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh; 
    padding: 20px;
    overflow-y: scroll;

    box-sizing: border-box;

    position: fixed;
    z-index: 11111;
    background-color: rgba(0, 0, 0, 0.5);
`
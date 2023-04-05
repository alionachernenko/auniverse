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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1200;
`
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

export const GoBackLink = () => {
    const [backLink, setBackLink] = useState(null)
    const location = useLocation()

    
    useEffect(() => {
        if(backLink) return

        setBackLink(location.state?.from ?? '/')
    }, [backLink, location.state?.from])


    return (
        <GoBack to={backLink} >
            Go back
        </GoBack>
    )
}

const GoBack = styled(Link)`
    font-family: 'Nunito', sans-serif;
    position: absolute;
    top: 0;
    border: 1px solid white;
    padding: 5px 10px;
    border-radius: 5px;

    @media screen and (min-width: 768px) {
        top: 20px;
    }
`
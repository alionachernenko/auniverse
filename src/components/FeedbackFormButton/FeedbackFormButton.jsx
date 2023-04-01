import { FeedbackForm } from "components"
import { Backdrop } from "components/Backdrop/Backdrop"
import { useState } from "react"

import styled from "styled-components"

export const FeedbackFormButton = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <>
        <Button type="button" onClick={(() => setIsFormOpen(true))}>
            Leave feedback
        </Button>
            {isFormOpen && <Backdrop onClick={() => setIsFormOpen(false)}>
                <FeedbackForm onClick={() => setIsFormOpen(false)}/>
            </Backdrop>}
        </>
    )
}

const Button = styled.button`
    padding: 10px;
    border: none;
    background-color: white;
    border-radius: 10px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    color: #00021A
`
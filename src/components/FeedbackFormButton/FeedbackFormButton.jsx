import { FeedbackForm } from "components"
import { useState } from "react"

import styled from "styled-components"

export const FeedbackFormButton = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <>
        <Button type="button" onClick={(() => setIsFormOpen(true))}>
            Leave feedback
        </Button>
            {isFormOpen && <FeedbackForm setIsFormOpen={setIsFormOpen} />}
        </>
    )
}

const Button = styled.button`
    padding: 10px;
    border: 1px solid white;
    background-color: white;
    border-radius: 10px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    color: #00021A;

    transition: 200ms all ease;

    &:hover {
        color: white;
        background-color: #00021A;
    }
`
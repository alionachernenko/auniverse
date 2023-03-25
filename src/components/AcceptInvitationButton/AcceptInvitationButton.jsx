import styled from "styled-components"

export const AcceptInvitationButton = ({onClick}) => {
    return (
        <AcceptButton onClick={onClick}></AcceptButton>
    )
}

const AcceptButton = styled.button`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    height: auto;
    width: auto;
    width: 30px;
    height: 30px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: none;
    background-color: green;
    border-radius: 100px;

    font-family: 'Nunito', sans-serif;
    font-size: 15px;

    color: white;

    @media screen and (min-width: 1200px) {
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`
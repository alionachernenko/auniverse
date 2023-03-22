import mario from '../../assets/images/mario.png'
import styled from 'styled-components'

export const ErrorComponent = () => {
    return (
        <Block>
            <Message>Something went wrong...</Message>
            <Image src={mario} alt='Mario thinking what happend'/>
        </Block>
    )
}

const Block = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`

const Message = styled.p`
    font-family: 'Nunito', sans-serif;
    font-size: 40px;
    max-width: 700px;
    text-align: center;
`

const Image = styled.img`
    width: 80vw;

    @media screen and (min-width: 320px){
        width: 200px
    }

    @media screen and (min-width: 768px){
        width: 300px
    }
`
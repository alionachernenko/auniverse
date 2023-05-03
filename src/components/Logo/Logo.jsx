import styled, {css} from 'styled-components'

export const Logo = ({ className }) => {
    return (
        <Logotype className={`${className}`}>
            AUNIVERSE
        </Logotype>
    )
}


const Logotype = styled.div`
    ${({className}) => {
    switch (className) {
        case 'logo_header':
            return css`
                font-weight: 900;
                height: 61px;
                display: flex;
                align-items: center;
                text-transform: uppercase;
                gap: 6px;
                font-size: 16px;
                color: #FFFDFD;
                position: relative;
                mix-blend-mode: difference;
                margin-left: 15px;

                &::after {
                    display: block;
                    content: "";
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background-color: white                  
                }

                &::before{
                    display: block;
                    position: absolute;
                    // mix-blend-mode: difference;
                    color: white;
                    left: -15px;
                    content: "";
                    border-right: 6px solid transparent;
                    border-top: 6px solid #FFFFFF;
                    border-left: 6px solid #FFFFFF;
                    border-bottom: 6px solid #FFFFFF;
                    border-top-left-radius:6px;
                    border-top-right-radius: 6px;
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                    transition: 1000ms all ease;
                }

                &:hover::before{
                    left: 88.5%;
                }
            `
        case 'logo_footer':
            return css`
                font-weight: 900;   
                text-transform: uppercase;
                font-size: 16px;
                word-wrap: break-word;
                text-align: center;
                letter-spacing: 0.05em;
                color: white;

                @media screen and (min-width: 768px){
                    writing-mode: vertical-lr;
                    font-size: 72px;
                    letter-spacing: 0.05em;
                    color: white;
                }
            `
        default: return css``
        }
    }}
`
import { FaPlaystation, FaSteam, FaAppStore, FaXbox, FaGooglePlay, FaItchIo } from 'react-icons/fa'
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si'
import {RiXboxLine} from 'react-icons/ri'
import styled from 'styled-components'

export const StoresList = ({stores}) => {
    return (
        <List>
            {stores.map(({store, id}) => {
                const { name, domain } = store
                console.log(domain)
                return(<li key={id}><a href={`https://${domain}`}>
                    {name === 'Steam' && <FaSteam />}
                    {name === 'PlayStation Store' && <FaPlaystation />}
                    {name === 'App Store' && <FaAppStore />}
                    {name === 'GOG' && <SiGogdotcom />}
                    {name === 'Xbox Store' && <FaXbox />}
                    {name === 'Xbox 360 Store' && <RiXboxLine />}
                    {name === 'Nintendo Store' && <SiNintendo />}
                    {name === 'Epic Games' && <SiEpicgames />}
                    {name === 'Google Play' && <FaGooglePlay />}
                    {name === 'itch.io' && <FaItchIo />}
                </a></li>)
            })}
        </List>
    )
    
}

const List =  styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
     gap: 10px;
     flex-wrap: wrap;
   

    @media screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: center;
        gap: 20px;
    }
    
    & svg {
        width: 30px;
        height: 30px;
    }
`


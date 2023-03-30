import { FaPlaystation, FaSteam, FaAppStore, FaXbox, FaGooglePlay, FaItchIo } from 'react-icons/fa'
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si'
import { RiXboxLine } from 'react-icons/ri'
import styled from 'styled-components'
import { memo } from 'react'

const setStoreIcon = (storeName) => {
    let icon
    switch (storeName) {
        case 'Steam':
            icon = <FaSteam />
            break
        case 'PlayStation Store':
            icon = <FaPlaystation />
            break
        case 'App Store':
            icon = <FaAppStore />
            break
        case 'GOG':
            icon = <SiGogdotcom />
            break
        case 'Xbox Store':
            icon = <FaXbox />
            break
        case 'Xbox 360 Store':
            icon = <RiXboxLine />
            break
        case 'Nintendo Store':
            icon = <SiNintendo />
            break
        case 'Epic Games':
            icon = <SiEpicgames />
            break
        case 'Google Play':
            icon = <FaGooglePlay />
            break
        case 'itch.io':
            icon = <FaItchIo />
            break
        default:
            return null
    }
    return icon
}

export const StoresList = memo(({ stores }) => {
    console.log('stores')
        return (
            <List>
                {stores.map(({ store, id }) => {
                    const { name, domain } = store

                    return (
                        <li key={id}>
                            <a href={`https://${domain}`} target='_blank' rel='noreferrer'>
                                {setStoreIcon(name)}
                            </a>
                        </li>
                    )
                })}
            </List>
        )
    })

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


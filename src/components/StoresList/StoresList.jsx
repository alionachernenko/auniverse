import { FaPlaystation, FaSteam, FaAppStore, FaXbox, FaGooglePlay, FaItchIo } from 'react-icons/fa'
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si'
import { RiXboxLine } from 'react-icons/ri'
import styled from 'styled-components'
import { memo } from 'react'


export const StoresList = memo(({ stores }) => {

    const icons = [
        <FaSteam />,
        <FaXbox />,
        <FaPlaystation />,
        <FaAppStore />,
        <SiGogdotcom />,
        <SiNintendo />,
        <RiXboxLine />,
        <FaGooglePlay />,
        <FaItchIo />,
        <SiEpicgames />
    ]

    console.log('stores')
        return (
            <List>
                {stores.map(({ url, store_id }) => {
                    console.log(store_id)
                    return (
                        <li key={store_id}>
                            <a href={url} target='_blank' rel='noreferrer'>
                                {icons[store_id - 1]}
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
        transition: 150ms all ease;

        &: hover{
            transform: scale(1.1)
        }
    }
`


import { FaPlaystation, FaSteam, FaAppStore, FaXbox, FaGooglePlay, FaItchIo } from 'react-icons/fa'
import { SiGogdotcom, SiNintendo, SiEpicgames } from 'react-icons/si'
import { RiXboxLine } from 'react-icons/ri'
import styled from 'styled-components'
import { memo } from 'react'


export const StoresList = memo(({ stores }) => {
    const names = [
        'Steam',
        'Xbox',
        'Playstation',
        'AppStore',
        'Gog',
        'Nintendo',
        'Xbox360',
        'GooglePlay',
        'ItchIo',
        'EpicGames'
    ]

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
                            <Link href={url} target='_blank' rel='noreferrer'>
                                <div style={{
                                    overflow: 'hidden'}}>
                                    <Icon>{icons[store_id - 1]}</Icon>
                                    
                                </div>
                                <Name>{names[store_id - 1]}</Name>
                            </Link>
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
        // transition: 500ms all ease;

        // &: hover{
        //     transform: rotate(30deg)
        // }
    }
`



const Name = styled.p`
    position: absolute;
    top: 0;
    height: 100%;
    background-color: grey;
    left: -100%;
    opacity: 0;
    float:right;
    transition: 500ms all ease;
    z-index: 1

`

const Link = styled.a`
    position: relative;
    height: auto;
    overflow: hidden;
    display: block;

    &:hover ${Name} {
        left: 100%;
        opacity: 1
    }
`

const Icon = styled.span`
// position: absolute;
// z-index: 111
`


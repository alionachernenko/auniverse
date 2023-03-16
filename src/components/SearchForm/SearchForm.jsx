import { useEffect, useState } from 'react'
import { getGameByName } from 'services/games-api'
import { useLocation } from 'react-router-dom'
import styled, {css} from 'styled-components'
import { SearchFilter } from 'components/SearchFilter/SearchFilter'
import { FilteredList } from 'components/FilteredList/FilteredList'

export const SearchForm = ({ onSubmit, className, setPage}) => {
    const [value, setValue] = useState('')
    const [filteredGames, setFilteredGames] = useState()

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/auniverse') {
            getGameByName(value).then(({data}) => {
                setFilteredGames(data.results)
            })
        }
       
     },
    [location.pathname, value])

    return (
        <Form render={className} onSubmit={(e) => {
            e.preventDefault()
            const { query, ordering = '', genre = ''} = e.target.elements

            onSubmit(e, query.value, ordering.value, genre.value)
            setPage(1)
        }   
        }>
            <Input render={className} value={value} type="text" name='query' onChange={(e) => {
                setValue(e.target.value)
            }
            } />
            <Button render={className} type="submit">GO</Button>
            {location.pathname === '/auniverse/catalog' && <SearchFilter/>}
            {(filteredGames && value !== '' && location.pathname === '/auniverse') && <FilteredList results={filteredGames}/>}
        </Form>
    )
}

//=============STYLES============//

const Form = styled.form`
    font-family: 'Nunito', sans-serif;
    position: relative;

    ${(props) => {
        switch (props.render){
            case 'catalog': 
                return css`
                margin-bottom: 20px;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
                height: auto;
            `
            case 'header':
                return css`
                    height: 100%;
                    width: 250px;
                    margin: 0;

                    @media screen and (max-width: 1440px){
                        display: none;
                    }
                `
            default: 
            return css`
                
            `
        }
    }}
`
const Input = styled.input`
    font-family: inherit;
    width: 100%;
    border-radius: 30px;
    margin-right: 5px;
    border: none;
    padding-left: 10px;
    box-sizing: border-box;
    padding-right: 110px;

${(props) => {
    switch(props.render) {
        case 'catalog':
            return css`
            height: 40px;
            margin-bottom: 10px;
            font-size: 20px;

        `
        case 'header':
            return css`
                height: 100%;
                font-size: 15px;
            `
        default: return css` `
    }
}}`
const Button = styled.button`
    position: absolute;
    border-radius: 30px;
    border-color: transparent;
    background-color: orange;
    font-family: inherit;
    color: darkblue;
    font-weight: 900;
    cursor: pointer;
    transition: 250ms transform ease;

    ${props => {
        switch(props.render){
            case 'catalog': 
            return css`
            height: 36px;
            top: 2px;
            right: 3px;
            font-size: 20px;
            transform: scale(1);

            @media screen and (min-width: 1200px) {
                &:hover{
                    transform: scale(1.4)
                }
            }
            
            `
            case 'header': 
            return css`
            height: 90%; 
            right: 1px;
            font-size: 10px;
            top: 50%;
            transform: translateY(-50%) scale(1);

            @media screen and (min-width: 1200px) {
            &:hover{
                transform: translateY(-50%) scale(1.5)
                }
            `
            default: return css``
        }
    }}

   
`




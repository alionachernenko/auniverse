import styled, {css} from 'styled-components'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { getGameByName } from 'services/games-api'
import { SearchFilter } from 'components/SearchFilter/SearchFilter'
import { FilteredSearchList } from 'components/FilteredSearchList/FilteredSearchList'

export const SearchForm = ({ onSubmit, className, setPage }) => {
    const [value, setValue] = useState('')
    const [filteredGames, setFilteredGames] = useState()

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/' && value !== '') {
                getGameByName(value).then(({data: {results}}) => {
                    setFilteredGames(results)
                })
            }
     },
    [location.pathname, value])

    const onFormSubmit = (e) => {
        e.preventDefault()
        const {query, ordering = null, genre = null} = e.target.elements

        onSubmit(e, 
        query.value === '' ? null : query.value, 
        ordering.value === '' ? null : ordering.value, 
        genre.value === '' ? null : genre.value)
        
        if (location.pathname === '/catalog') setPage(1)
    }   

    const onInputChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <Form onSubmit={onFormSubmit} class={className}>
            <label style={{
                display: 'none'}} htmlFor='search-input'>Search games</label>
            <Input id='search-input'  value={value} type='text' name='query' onChange={onInputChange} class={className}/>
            <Button  type='submit' class={className}>GO</Button>
            {location.pathname === '/catalog' && <SearchFilter/>}
            {(filteredGames && value !== '' && location.pathname === '/') && <FilteredSearchList results={filteredGames}/>}
        </Form>
    )
}

//=============STYLES============//

const Form = styled.form`
    font-family: 'Nunito', sans-serif;
    position: relative;

    ${(props) => {
        switch (props.class){
            case 'catalog': 
                return css`
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
                height: auto;
                padding: 0 10px;
            `
            case 'header':
                return css`
                    height: 100%;
                    width: 250px;
                    margin: 0;

                    @media screen and (max-width: 1199px){
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
    switch(props.class) {
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
        switch(props.class){
            case 'catalog': 
            return css`
            height: 36px;
            top: 2px;
            right: 13px;
            font-size: 20px;
            transform: scale(1);

            @media screen and (min-width: 1200px) {
                &:hover{
                    transform: scale(1.1)
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
                transform: translateY(-50%) scale(1.1)
                }
            `
            default: return css``
        }
    }}

   
`




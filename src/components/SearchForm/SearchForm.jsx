import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGameByName } from 'utils/rawg-api'
import { SearchFilter, FilteredSearchList } from 'components'

import styled, {css} from 'styled-components'

export const SearchForm = memo(({ onSubmit, className, setPage}) => {
    const [value, setValue] = useState('')
    const [filteredGames, setFilteredGames] = useState()


    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/' && value !== '') {
                fetchGameByName(value).then(({data: {results}}) => {
                    setFilteredGames(results)
                }).catch(error => console.log(error))
            }
     },
    [location.pathname, value])

    const onFormSubmit = (e) => {
        e.preventDefault()
        const {query, ordering, genre} = e.target.elements

        if (location.pathname === '/') {
            onSubmit(e, query.value === '' ? null : query.value, null, null)
        }
        else {
            onSubmit(e, 
            query.value === '' ? null : query.value, 
            ordering.value === 'All' ? null : ordering.value, 
            genre.value === 'All' ? null : genre.value)
        }

        if (location.pathname === '/catalog') setPage(1)
    }

    const onInputChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <Form onSubmit={onFormSubmit} className={className}>
            <label style={{display: 'none'}} htmlFor='search-input'>Search games</label>
            <Input id='search-input' placeholder='Enter a game title'  value={value} type='text' name='query' onChange={onInputChange} className={className}/>
            <Button  type='submit' className={className}>GO</Button>
            {location.pathname === '/catalog' && <SearchFilter/>}
            {(filteredGames && value !== '' && location.pathname === '/') && <FilteredSearchList results={filteredGames}/>}
        </Form>
    )
})


const Form = styled.form`
    font-family: 'Nunito', sans-serif;
    position: relative;

    ${(props) => {
        switch (props.className){
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
    width: 100%;
    margin-right: 5px;
    padding-right: 110px;
    padding-left: 10px;
    border-radius: 30px;
    border: none;
    box-sizing: border-box;

    font-family: inherit;
    
${(props) => {
    switch(props.className) {
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
        switch(props.className){
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




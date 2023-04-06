import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { fetchGameByName } from 'utils/rawg-api'
import { SearchFilter, FilteredSearchList } from 'components'

import styled, {css} from 'styled-components'
import { MdClose } from 'react-icons/md'

export const SearchForm = memo(({className}) => {
    const [value, setValue] = useState('')
    const [filteredGames, setFilteredGames] = useState()
    const navigate = useNavigate()

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
        const { query, ordering, genre } = e.target.elements
        
        const searchParams = new URLSearchParams();
        
        searchParams.set('page', 1)
        
        if (query.value) searchParams.set('query', query.value);
        if (ordering && ordering.value !== 'None') searchParams.set('ordering', ordering.value)
        if (genre && genre.value !== 'All') searchParams.set('genre', genre.value)
        
        navigate(`/catalog?${searchParams.toString()}`);
    }

    const onInputChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <Form onSubmit={onFormSubmit} className={className}>
            <label style={{ display: 'none' }} htmlFor='search-input'>Search games</label>
            <div className='input-wrapper'>
            <Input id='search-input' placeholder='Enter a game title' value={value} type='text' name='query' onChange={onInputChange} className={className} />
            {value.length > 0 && <ClearButton type='button' onClick={() => setValue('')}><MdClose size='100%' /></ClearButton>}
                <Button type='submit' className={className}>GO</Button>
            </div>
            {location.pathname === '/catalog' && <SearchFilter />}
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

                @media screen and (min-width: 768px) {
                    width: 500px
                }

                & .input-wrapper {
                    position: relative;
                    margin-bottom: 10px;
                    height: 40px
                }
            `
            case 'header':
                return css`
                    height: 100%;
                    width: 400px;
                    margin: 0;

                    & .input-wrapper {
                        position: relative;
                        height: 30px
                    }

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
            height: 100%;
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
            right: 2px;
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
                font-size: 15px;
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


const ClearButton = styled.button`
    position: absolute;
    right: 12%;
    top: 50%;
    border: none;
    background-color: transparent;
    padding: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    height: 70%
`



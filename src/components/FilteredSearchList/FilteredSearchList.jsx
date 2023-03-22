import { Link } from "react-router-dom"
import styled from "styled-components"

export const FilteredSearchList = ({results}) => {
    return (
        <FilteredResults>
                {results.map(({id, background_image, slug, name}) => 
                <Item key={id}>
                        <Poster src={`${background_image}`} loading='lazy' alt={`${name} poster`} />
                    <Title to={`/catalog/${slug}`}>
                        {name}
                    </Title>
                </Item>)}
            </FilteredResults>
    )
    
}

const FilteredResults = styled.ul`
    width: auto;
    max-height: 30vh;
    padding: 10px;
    border-radius: 20px;

    gap: 5px;

    position: absolute;
    z-index: 3;
    
    background-color: white;

    overflow-y: scroll;
`

const Item = styled.li`
    display: flex;
    align-items: center;
    font-weight: 900;
`

const Poster = styled.img`
    width: 90px;
    height: auto;
    margin-right: 10px;
`

const Title = styled(Link)`
    color: darkblue;
`
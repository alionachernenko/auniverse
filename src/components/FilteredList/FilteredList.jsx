import { Link } from "react-router-dom"
import styled from "styled-components"

export const FilteredList = ({results}) => {
    return (
        <FilteredResults>
                {results.map(({id, background_image, slug, name}) => 
                <li key={id}>
                    <img src={`${background_image}`} alt="" />
                    <Link to={`/auniverse/catalog/${slug}`}>
                        {name}
                    </Link>
                </li>)}
            </FilteredResults>
    )
    
}

const FilteredResults = styled.ul`
    position: absolute;
    background-color: white;
    width: auto;
    list-style: none;
    overflow-y: scroll;
    max-height: 30vh;
    padding: 10px;
    border-radius: 20px;

    & img{
        width: 90px;
    height: auto;
    margin-right: 10px;
    }

    & li{
        display: flex;
        align-items: center;
        font-weight: 900;
    }

    & :not(:last-child) {
        margin-bottom: 5px;
    }

    & a {
        color: darkblue;
    }
`
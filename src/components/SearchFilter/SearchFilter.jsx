import styled from "styled-components"

export const SearchFilter = () => {
    return (
        <Filters>
                <Filter>
                    <Label htmlFor='order_select'>Order by:</Label>
                    <FilterOptions name="ordering" id="order_select">
                        <option></option>
                        <option value="added">Added</option>
                        <option value="released">Released</option>
                        <option value="name">Name</option>
                        <option value="created">Created</option>
                        <option value="updated">Updated</option>
                        <option value="rating">Rating</option>
                        <option value="metacritic">Metacritic</option>
                    </FilterOptions>
                </Filter>
                <Filter>
                    <Label htmlFor='genre_select'>Genre:</Label>
                    <FilterOptions name="genre" id="genre_select">
                        <option></option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="indie">Indie</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Strategy</option>
                        <option value="shooter">Shooter</option>
                        <option value="platformer">Platformer</option>
                    </FilterOptions>
                </Filter>
            </Filters>
    )
    
}

const Filters = styled.div`
display: flex;
justify-content: space-around;
`

const Filter = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Label = styled.label`
color: white;
margin-bottom: 5px;
`

const FilterOptions = styled.select`
width: auto;
height: 30px;
border-radius: 15px;
font-family: inherit;
color: darkblue;
font-weight: 700;
overflow: hidden;
`
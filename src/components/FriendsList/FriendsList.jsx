import { useOutletContext } from "react-router-dom"
import { UserCard } from "components/UserCard/UserCard"
import styled from "styled-components"

export const FriendsList = () => {
    // eslint-disable-next-line no-unused-vars
    const [_, friends, friendPending, setFriendsPending, setFriends] = useOutletContext()
    return ( 
        <Block>
            
            

            {friendPending.length !== 0 &&
                <>
                <p>This users want to be your friends</p>
                <PendingList>
                {friendPending.map(friend =>
                    <>
                        <UserCard id={friend} isPending={true} setPending={setFriendsPending} setFriends={setFriends} /></>)}
                </PendingList></>}
            
            <Friends>
                {friends && friends.map(friend => <UserCard id={friend} isPendind={false} />)}
            </Friends>
            </Block>
    )
}

const Block = styled.div`
display: flex;
flex-direction: column;
align-items: center;

@media screen and (min-width: 1200px) {
    flex-direction: row
}
    
`

const PendingList = styled.ul`
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
`

const Friends = styled.ul`
margin-right: auto;
    display: flex;
    flex-wrap: wrap;
`
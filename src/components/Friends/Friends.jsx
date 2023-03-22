import { useOutletContext } from "react-router-dom"
import { UserCard } from "components/UserCard/UserCard"
import styled from "styled-components"

export const Friends = () => {
    // eslint-disable-next-line no-unused-vars
    const [_, friends, setFriends, invitations, setInvitations ] = useOutletContext()
    
    return ( 
        <Block>
            {invitations.length !== 0 &&
                <>
                <p>This users want to be your friends</p>
                    <InvitationsList>
                        {invitations.map(friend =>
                            <UserCard id={friend} isPending={true} setInvitations={setInvitations} setFriends={setFriends} />)}
                    </InvitationsList></>}
            <FriendsList>
                {friends && friends.map(friend => <UserCard id={friend} isPending={false} />)}
            </FriendsList>
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

const InvitationsList = styled.ul`
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
`

const FriendsList = styled.ul`
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width: 1200px){
        flex-wrap: nowrap;
        flex-direction: column
    }
`


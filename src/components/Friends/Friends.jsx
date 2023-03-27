import { useOutletContext } from "react-router-dom"
import styled from "styled-components"
import { FriendCard } from "components/FriendCard/FriendCard"


export const Friends = () => {
    //eslint-disable-next-line no-unused-vars
    const [_, friends, setFriends, invitations, setInvitations ] = useOutletContext()

    return ( 
        <Block>
            {invitations.length !== 0 &&
                    <InvitationsList>
                        {invitations.map(friend =>
                            <FriendCard id={friend} key={friend} isPending={true} setInvitations={setInvitations} setFriends={setFriends} />)}
                </InvitationsList>
            }
            {friends.length === 0  ? <p style={{textAlign: 'left'}}>No friends</p> : <FriendsList>
                {friends.map(friend => <FriendCard id={friend} key={friend} isPending={false} />)}
            </FriendsList>}
            
        </Block>
    )
}

const Block = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;

    @media screen and (min-width: 1200px) {
        flex-direction: column;
    }
`

const InvitationsList = styled.ul`
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
`

const FriendsList = styled.ul`
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;

    @media screen and (min-width: 1200px){
        flex-wrap: nowrap;
        flex-direction: column;
    }
`


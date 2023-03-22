import { useContext, useEffect, useState } from 'react'
import { getUsers } from 'utils/firebase'
import { authContext } from '../../context/context'
import { Loader } from 'components/Loader/Loader'

import { UserCard } from 'components/UserCard/UserCard'
import { Container } from 'components/Container/Container'

import styled from 'styled-components'
import { ErrorComponent } from 'components/ErrorComponent/ErrorComponent'
const Users = () => {
    const [userIDs, setUserIDs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const {userId} = useContext(authContext)


    useEffect(() => {
        getUsers().then(res => {
            const IDs = res.val()

            setUserIDs(Object.keys(IDs).filter(ID => ID !== userId))
            setIsLoading(false)
        }).catch(error => {
                console.log(error)
                setIsError(true)
                setIsLoading(false)
            })
    }, [userId])

    return(
        <Page>
            <Container>
                {isLoading ?
                    <Loader className={'loader-profile'} color={'#00021A'} /> : isError ? <ErrorComponent/> :
                    <UsersList>
                        {userIDs.map(userID => <UserCard id={userID} key={userID} />)}
                    </UsersList>
                }
            </Container>
        </Page>
    )
}

const Page = styled.div`
width: 100%; 
padding: 20px;
box-sizing: border-box;
min-height: calc(100vh - 61px);
`

const UsersList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export default Users
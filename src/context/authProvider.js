import authContext from "./context";
import { useEffect, useState } from "react";
import { userSignUp, userLogIn, addNewUser} from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { setUserDataToLocalStorage, getDataFromLocalStorage } from "utils/localStorage";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [userId, setUserId] = useState()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true)
                setUserId(user.uid)
            }
            else setIsLoggedIn(false)
        })
    }, [])


    const navigation = useNavigate()

    const handleLogInSubmit = (e, email, password) => {
        e.preventDefault()
        setIsLoading(true)
        setPersistence(auth, browserLocalPersistence).then(() => {
            userLogIn(email, password).then(() => {
                navigation(`auniverse/profile`)
                setIsLoading(false)
            })
            .catch(({code}) => {
                toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
                    position: toast.POSITION.TOP_CENTER
                })
                setIsLoading(false)
            });
        })
        
    }

    const handleSignUp = (e, email, password, username) => {
        e.preventDefault() 

        setIsLoading(true)
        userSignUp(email, password, username).then(({user}) => {
                const {uid} = user

                addNewUser(uid, email, password, [], username)
                navigation(`/auniverse/login/login-page`)
                setIsLoading(false)
        })
        .catch(({code}) => {
            toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
                position: toast.POSITION.TOP_CENTER
            })
            setIsLoading(false)
        });
    }

    return(
        <authContext.Provider value={{handleLogInSubmit, isLoading, userId, handleSignUp, isLoggedIn}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
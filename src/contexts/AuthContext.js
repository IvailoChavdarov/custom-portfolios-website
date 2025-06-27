import React, { useContext, useEffect, useState } from "react";
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [userIsAdmin, setUserIsAdmin] = useState(null);
    const [currentUserNames, setCurrentUserNames] = useState('')

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signout(){
        return signOut(auth)
    }

    function signin(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    //sets user data to use from components
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
            if(user){
                async function fetchUserNames() {
                    await getDoc(doc(db, 'profiles', user.uid)).then(data=>
                    {
                        let userData = data.data()
                        setCurrentUserNames(userData.firstName + " " + userData.lastName);
                        setUserIsAdmin(!!userData.isAdmin)
                    });
                }  
                fetchUserNames();
            }
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        currentUserNames,
        userIsAdmin,
        signup,
        signout,
        signin,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
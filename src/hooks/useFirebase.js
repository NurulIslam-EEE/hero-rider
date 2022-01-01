import { useEffect, useState } from "react";
import initializeFirebase from "../components/Login/firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";


initializeFirebase();
const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');
    // console.log(user)

    const auth = getAuth();

    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser)
                //save user to database
                // saveUser(email, name, 'POST');
                //send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {

                    })
                    .catch((error) => {

                    });
                const destination = '/profile';
                navigate(destination);

            })
            .catch((error) => {

                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false))
    }

    // const signInWithGoogle = (location, navigate) => {
    //     setIsLoading(true);
    //     signInWithPopup(auth, googleProvider)
    //         .then((result) => {
    //             const user = result.user;
    //             saveUser(user.email, user.displayName, 'PUT');
    //             setAuthError('');
    //             const destination = location?.state?.from || '/';
    //             navigate(destination);
    //         })
    //         .catch((error) => {
    //             setAuthError(error.message);
    //         })
    //         .finally(() => setIsLoading(false))
    // }

    const loginUser = (email, password, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = '/profile';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {

                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false))
    }


    //observer user state
    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unSubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://pacific-shelf-98657.herokuapp.com/admin/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user?.email])
    console.log(admin)
    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        console.log(user)
        fetch('https://murmuring-meadow-62116.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return {
        user,
        admin,
        token,
        isLoading,
        registerUser,
        logOut,
        loginUser,
        authError
    }
}

export default useFirebase;
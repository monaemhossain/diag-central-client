import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)


    const signUp = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (isUser) => {
            setUser(isUser)
            if (isUser) {
                setIsLoading(false)

            } else {
                setIsLoading(false)
            }
        });
        return unSubscribe;

    }, [])

    const [dbUsers, setDbUsers] = useState(null);

    useEffect(() => {
        const fetchUserDatabase = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://diag-central-server.vercel.app/users', { withCredentials: true });
                setDbUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDatabase();
    }, []);  


    const AuthInfo = {
        signUp,
        logIn,
        logOut,
        user,
        isLoading,
        dbUsers,
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.any
}
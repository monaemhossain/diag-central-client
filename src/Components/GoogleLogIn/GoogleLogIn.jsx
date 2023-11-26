import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";


const GoogleLogIn = () => {
    const { logInWithGoogle } = useContext(AuthContext)

    logInWithGoogle()
    .then(() =>{
        toast.success('Successfully Logged in with Google')
    })
    .catch(err => console.log(err))
}

export default GoogleLogIn;
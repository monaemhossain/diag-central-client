import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Profile = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {displayName, email, photoURL} = user
    return (
        <div className="lg:w-[1000px] md:w-[600px] mx-auto">
            hi
        </div>
    );
};

export default Profile;
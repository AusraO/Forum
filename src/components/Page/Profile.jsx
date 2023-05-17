import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const Profile = () => {
    const { currentUser} = useContext(UsersContext);
    return ( 
        <>
        <p>Your profile</p>
         <img style={{ width: "70px", height: "auto" }} src={currentUser.avatarURL} alt="user avatar" />
                <p>{currentUser.userName}</p>
        </>
     );
}
 
export default Profile;
import React from "react";

const Profile_page = ({ user }) =>
{

    let profile_picture = user.profile_picture;

    //If user doesn't have profile picture it take picture from images (make it default)
    if (user.profile_picture === "")
    {
        profile_picture = "../../images/profile_picture.png"
    }

    return (
        <div>
            <h1>This is yours profile page</h1>
            <h2>{user.username}</h2>
            <p>{user.description}</p>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <img src={profile_picture} alt={user.username} />
        </div>
    )
}


export default Profile_page;
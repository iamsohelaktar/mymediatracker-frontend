import ProfileWatchComponent from '../components/ProfileWatchComponent';
// import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
    const { username } = useParams();
    const { user } = useAuthContext();

    if (!user) return;

    return (
        <div className="list-page" id="profile">
            <div className="profile-info">
                <img className="pfp"src="https://i.pinimg.com/736x/90/d1/ac/90d1ac48711f63c6a290238c8382632f.jpg"/>
                <h2>@{username}</h2>
                {/* {user.username === username && <button>Change Icon</button>}
                {!(user.username === username) && <button>Add Friend</button>} */}
            </div>
            <div className="list-container-wrapper">
            <h2>{username}'s Anime</h2>
            <ProfileWatchComponent type='anime' username={username}/>
            <h2>{username}'s Books</h2>
            <ProfileWatchComponent type='book' username={username}/>
            <h2>{username}'s Manga</h2>
            <ProfileWatchComponent type='manga' username={username}/>
            <h2>{username}'s Movies</h2>
            <ProfileWatchComponent type='movie' username={username}/>
            <h2>{username}'s TV Shows</h2>
            <ProfileWatchComponent type='tv' username={username}/>
            </div>
        </div>
    );
}

export default Profile;

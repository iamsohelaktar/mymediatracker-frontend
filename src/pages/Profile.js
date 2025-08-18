import ProfileWatchComponent from '../components/ProfileWatchComponent';
import { baseUrl } from '../Urls.js';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    const { username } = useParams();
    const { user } = useAuthContext();
    // const [found, setFound] = useState(null);
    const [privacy, setPrivacy] = useState(null);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState('');

    useEffect( () => {
        if (!user) return; 
        const fetchProfileMedia = async () => {
            // setFound(false);
            setLoading(true);
            try{
                const response = await fetch(baseUrl+'/api/medias/'+username, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                if (response.ok){
                    setWatchList(json.watchList);
                    setPrivacy(json.private);
                }
                console.log(response.status);
                if (response.ok){
                    getFollowing();
                    getFollowers();
                    getIcon();
                    // setFound(true);
                } else {
                    toast.error(response.message);
                }
            } catch (error){
                toast.error('User not found');
                // setFound(false);
            }
            setLoading(false);
        }
        if (user){
            fetchProfileMedia();
        } 
    }, [username, user]);

    //Getting the following list of the current profile
    const getFollowing = async () => {
        // The base follow route is /api/followers/:username
        // The route includes the username of the current profile.
        const res = await fetch(baseUrl+'/api/user/following/'+username, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        setFollowingList(json);
    }

    //Getting the follower list of the current profile
    const getFollowers = async () => {
        // The base follow route is /api/followers/:username
        // The route includes the username of the current profile.
        try{
            const res = await fetch(baseUrl+'/api/user/followers/'+username, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await res.json();
            setFollowerList(json);
        }catch (error){
            toast.error("Couldn't load followers")
        }
    }

    //Getting the following list of the current profile
    const getIcon = async () => {

        // The base follow route is /api/user/icon/:username
        // The route includes the username of the current profile.
        try{
            const res = await fetch(baseUrl+'/api/user/icon/'+username, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await res.json();
            if (json.message === 'none'){
                setIcon('https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg');
            } else {
                setIcon(json);
            }
        }catch (error){
            toast.error("Couldn't load icon")
            console.log(error);
        }
    }

    if (!user) return;

    //If the user wants to follow the current profile
    const followRequest = async () => {
        // The base follow route is /api/user/follow
        // The body includes the current user which is used to identify the sender.
        // The route includes the username of the current profile which is used to identify the receiver.
        const res = await fetch(baseUrl+'/api/user/follow/'+username, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        toast(json.message);
        getFollowers();
    }

    //If the user wants to unfollow the current profile
    const unfollowRequest = async () => {
        // The base follow route is /api/user/unfollow
        // The body includes the current user which is used to identify the sender.
        // The route includes the username of the current profile which is used to identify the receiver.
        const res = await fetch(baseUrl+'/api/user/unfollow/'+username, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await res.json();
        toast(json.message);
        getFollowers();
    }
    
    const changePrivacy = async (newValue) => {
        let updatedData;
        switch (newValue){
            case 'private':
                updatedData = JSON.stringify({ private: true });
                setPrivacy(true);
                break;
            case 'public':
                updatedData = JSON.stringify({ private: false });
                setPrivacy(false);
                break;
            default:
                break;
        }
        const res = await fetch(baseUrl+"/api/user/"+username+"/privacy/", {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: updatedData
        });
        const json = await res.json();
        if (!res.ok) return toast.error(json.error || "Failed to update privacy");
        toast.success(`Account set to ${json.private ? "private" : "public"}`);
    }

    function changeIcon(e){
        const file = e.target.files[0];
        
        const formData = new FormData();
        formData.append('image', file);

        async function upload_img_to_database() {
            try{
                const res = await fetch( baseUrl + '/api/user/'+username+'/process-icon', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: formData
                })

                const json = await res.json();
                if (res.ok) {
                    toast.success(json.message)
                    setIcon(json.image_url);
                } else {
                    console.log(res)
                    toast.error('Error processing image')
                }
            } catch (error) {
                console.error('Error:', error)
                toast.error('Error while processing the image')
            }
        }
        upload_img_to_database();
    }  

    return (
        <div className="list-page" id="profile">
            <div className="list-container-wrapper">
                {loading && <p>Loading profile...</p>}
                {watchList.length === 0 && !loading && <p>Looks like there's nothing here...</p>}
                {watchList.length !== 0 && !loading && 
                <>
                <h2>{username}'s Anime</h2>
                <ProfileWatchComponent type='anime' watchList={watchList}/>
                <h2>{username}'s Books</h2>
                <ProfileWatchComponent type='book' watchList={watchList}/>
                <h2>{username}'s Manga</h2>
                <ProfileWatchComponent type='manga' watchList={watchList}/>
                <h2>{username}'s Movies</h2>
                <ProfileWatchComponent type='movie' watchList={watchList}/>
                <h2>{username}'s TV Shows</h2>
                <ProfileWatchComponent type='tv' watchList={watchList}/>
                <h2>{username}'s Video Games</h2>
                <ProfileWatchComponent type='game' watchList={watchList}/>
                </>
                }
            </div>
            <div className="profile-info">
                <div>
                    {icon && <img className="pfp" src={icon} alt="Icon"/>}
                </div>
                <h2>@{username}</h2>
                <div>{watchList.length} Titles</div>
                {user.username === username &&
                <div>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        style={{'display' : 'none'}}
                        onChange={changeIcon}
                    />
                    <label htmlFor="image">Change Icon <EditIcon /></label>
                </div> }
                {privacy !== null && user.username === username && 
                    <select value={privacy ? 'private' : 'public'} onChange={(e) => changePrivacy(e.target.value)}>
                        <option value="private">Hidden Account</option>
                        <option value="public">Public Account</option>
                    </select>
                }

                {console.log(privacy)}

                {privacy !== null && !(user.username === username) && !followerList.includes(user.username) && 
                <button onClick={followRequest} >
                    <PersonAddIcon />Follow
                </button>
                }
                
                {privacy !== null && !(user.username === username) && followerList.includes(user.username) &&
                <button onClick={unfollowRequest} style={{'backgroundColor' : 'var(--primary-border)'}}>
                    <PersonRemoveIcon />Unfollow
                </button>
                }
                {privacy !== null && <div>
                    <details>
                        <summary><span>Following ({followingList.length})</span></summary>
                        <div>
                        {followingList.length > 0 && followingList.map((following, i) => {
                            return <p key={i}><a href={"/profile/"+following} >@{following}</a></p>
                        })}
                        </div>
                    </details>
                    <details>
                        <summary><span>Followers ({followerList.length})</span></summary>
                        <div>
                        {followerList.length > 0 && followerList.map((follower, i) => {
                            return <p key={i}><a href={"/profile/"+follower} >@{follower}</a></p>
                        })}
                        </div>
                    </details>
                </div> }
            </div>
        </div>
    );
}

export default Profile;

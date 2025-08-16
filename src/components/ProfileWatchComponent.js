import { useState, useEffect } from 'react';
import {baseUrl} from '../Urls.js';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

const ProfileWatchComponent = ({type, username}) => {
    const {user} = useAuthContext();
    const [loading, setLoading] = useState(true);

    const [watchList, setWatchList] = useState([]);
    useEffect( () => {
        if (!user) return; 
        const fetchProfileMedia = async () => {
            setLoading(true);
            const response = await fetch(baseUrl+'/api/medias/'+username, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok){
                setWatchList(json);
            } else { 
                toast.success(response); 
            }
            setLoading(false);
        }
        if (user){
            fetchProfileMedia();
        } 
    }, [username, user]);

    const filteredList = [...watchList].filter(item => item.type===type);

    return (
            <div className="list-container">
            {loading && <p>Loading your media...</p>}
            {filteredList.length === 0 && !loading && <p>Looks like there's nothing here...</p>}
            {filteredList && filteredList.map((media, i) => {
                const savedRating  = media?.rating || '';
                const savedProgress = media?.progress || '';
                const savedStatus = media?.status || '';

                let status;

                switch (savedStatus){
                    case "done":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">✔ Watched</div> : <div className="status">✔ Read</div>
                        break;
                    case "to-do":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">👁 Plan to Watch</div> : <div className="status">👁 Plan to Read</div>
                        break;
                    case "doing":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">▶ Watching</div> : <div className="status">▶ Reading</div>
                        break;
                    case "on-hold":
                        status =  <div className="status">❚❚ On Hold</div>
                        break;
                    default:
                        break;
                }

                return (
                    <div className="search-result" key={media._id}>
                        <img className="cover" loading="lazy" src={media.image_url} alt={media.name}/>
                        <div className="info">
                            <div className="title" title={media.name + " | Added " + media?.createdAt.slice(0,10)}><p>{media.name}</p></div>
                            <div className="more-info">
                                <div className="rating">
                                    {savedRating === 5 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 4 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 3 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 2 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 1 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                </div>
                                {['anime', 'book', 'manga', 'tv'].includes(type) && ['doing', 'on-hold'].includes(media.status) && savedProgress && <div className="episodes"><p>Progress: {savedProgress}</p></div>}
                                {status}
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
    );
}
 
export default ProfileWatchComponent;
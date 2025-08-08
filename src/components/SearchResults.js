import useFetchMedia from '../hooks/useFetchMedia';
import { useAuthContext } from '../hooks/useAuthContext';
import {baseUrl} from '../Urls.js';
import { toast } from 'react-toastify';

const SearchResults = ({ title, type, sort }) => {
    let mediaUrl;
    const {user} = useAuthContext();

    switch (type){
        case "tv":
            mediaUrl = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`;
            break;
        case "movie":
            mediaUrl = `https://imdb.iamidiotareyoutoo.com/justwatch?q=${encodeURIComponent(title)}`;
            break;
        case "book":
            mediaUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`;
            break;
        default: // For anime or manga aka Jikan
            mediaUrl = `https://api.jikan.moe/v4/${type}?q=${encodeURIComponent(title)}&sfw=true`;
            if (sort==='rating'){
                mediaUrl += '&order_by=score&sort=desc';
            }
            break;
    }
    
    const { data: mediaList, isLoading, error } = useFetchMedia(mediaUrl, type);

    if (isLoading) return <p style={{'paddingLeft': '2rem'}}>(╭ರ_•́)<br />Loading results for "{title}"...</p>;
    if (error) return <p style={{'paddingLeft': '2rem'}}>(ﾟヘﾟ)？<br />Error: {error}</p>;
    if (!mediaList || mediaList.length === 0) return <p style={{'paddingLeft': '2rem'}}>(ﾟヘﾟ)？<br />No results found for "{title}"</p>;
    
    return (
        <div>
            <div className="search-results-container">
                {mediaList.map((media, i) => {
                    const information = {
                        name: media?.title_english || media?.title || media?.show?.name || media?.name,
                        author: media?.title,
                        image_url:
                            media?.images?.jpg?.image_url ||
                            media?.show?.image?.medium ||
                            media?.photo_url?.[1] ||
                            media?.image ||
                            (media?.cover_i ? 'https://covers.openlibrary.org/b/id/'+media?.cover_i+'-M.jpg' : null) ||
                            "https://placehold.co/150x200/cccccc/333333?text=No+Cover",
                        score: type==="tv" ? ((media?.show?.rating?.average!==null && media?.show?.rating?.average!==undefined) ? media?.show?.rating?.average : null) : ((media?.score!==null && media?.score!==undefined) ? media?.score : null),
                        progress: "",
                        type: type,
                        fav: false,
                        rating: 0,
                        status: "to-do",
                    };
                    return (
                        <div className="search-result" key={i}>
                            {information?.score && <p className="score">{information?.score + "⭐"}</p>}
                            <img className="cover" src={information.image_url} alt={information.name} />
                            <div className="info">
                                <div className="title" title={information.name}><p>{information.name}</p></div>
                                <div className="more-info">
                                </div>
                                <button onClick={
                                    async () => {
                                        if (!user){
                                            toast.error('You must be logged in!');
                                            return;
                                        }
                                        const cached = JSON.parse(sessionStorage.getItem('watchlist') || '[]');
                                        console.log(cached);
                                        const index = cached.findIndex(item => item.name === information.name && item.type === information.type);
                                        console.log(index);
                                        if (index === -1) {
                                            const response = await fetch(baseUrl+'/api/medias', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${user.token}`
                                                },
                                                body: JSON.stringify(information)
                                            });

                                            const json = await response.json();
                                            if (response.ok){
                                                cached.push(json);
                                                sessionStorage.setItem('watchlist', JSON.stringify(cached));
                                                toast.success(information.name+' added to your list!');
                                            } else {
                                                toast.error('Error:', response);
                                            }
                                        } else {
                                            toast.warn(information.name+' is already in your list!');
                                        }
                                    }
                                }>Add to List</button>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        <div className="more-details">
        </div>
        </div>
    );
};

export default SearchResults;

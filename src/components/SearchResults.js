import useFetchMedia from '../hooks/useFetchMedia';
import { useAuthContext } from '../hooks/useAuthContext';
import {baseUrl} from '../Urls.js';
import { toast } from 'react-toastify';

const SearchResults = ({ title, type, sort }) => {
    let mediaUrl;
    //Determining if the user is logged in or not.
    const {user} = useAuthContext();

    //Creating url for external apis based on the provdied type.
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
        case "game":
            mediaUrl = baseUrl + '/api/search/games/'+encodeURIComponent(title);
            break;
        case "top-anime":
            mediaUrl = 'https://api.jikan.moe/v4/top/anime?limit=5';
            break;
        case "top-manga":
            mediaUrl = 'https://api.jikan.moe/v4/top/manga?limit=5';
            break;
        default: // For anime or manga aka Jikan
            mediaUrl = `https://api.jikan.moe/v4/${type}?q=${encodeURIComponent(title)}&sfw=true`;
            if (sort==='rating'){
                mediaUrl += '&order_by=score&sort=desc';
            }
            break;
    }
    
    //Using custom hook to fetch the data from external api
    const { data: mediaList, isLoading, error } = useFetchMedia(mediaUrl, type);

    //If something goes wrong with the fetch (or the data is loading), these will appear.
    if (isLoading) return <p>(╭ರ_•́)<br />Loading results for "{title}"...</p>;
    if (error) return <p>(ﾟヘﾟ)？<br />Error: {error}</p>;
    if (!mediaList || mediaList.length === 0) return <p>(ﾟヘﾟ)？<br />No results found for "{title}"</p>;
    
    return (
        <div>
            <div className="search-results-container">
                {mediaList.map((media, i) => {
                    const information = {
                        name: media?.title_english || media?.title || media?.show?.name || media?.name || media?.aliases,
                        image_url:
                            media?.images?.jpg?.image_url ||
                            media?.show?.image?.medium ||
                            media?.image?.medium_url ||
                            media?.photo_url?.[1] ||
                            media?.image ||
                            (media?.cover_i ? 'https://covers.openlibrary.org/b/id/'+media?.cover_i+'-M.jpg' : null) ||
                            "https://placehold.co/150x200/cccccc/333333?text=No+Cover",
                        progress: "",
                        type: type,
                        rating: 0,
                        status: "to-do"
                    };
                    return (
                        <div className="search-result" key={i}>
                            {type === "tv"
                                // If the media type is TV and a score is present
                                ? media?.show?.rating?.average !== null && media?.show?.rating?.average !== undefined && (
                                    <p className="score">{media.show.rating.average}⭐</p>
                                ) 
                                // Else if the media type is not TV but a score is present
                                : media?.score !== null && media?.score !== undefined && (
                                    <p className="score">{media.score}⭐</p>
                                )
                            }
                            <img className="cover" src={information.image_url} alt={information.name} />
                            <div className="info">
                                <div className="title" title={information.name}><p>{information.name}</p></div>
                                <div className="more-info">
                                </div>
                                <button onClick={
                                    async () => {
                                        // Checking if the user is logged in
                                        if (!user){
                                            toast.error('You must be logged in!');
                                            return;
                                        }

                                        //Getting the sessionStorage watchlist
                                        const cached = JSON.parse(sessionStorage.getItem('watchlist') || '[]');

                                        let index;
                                        //Seeing if the item already exists in the watchlist
                                        if (type==='book'){
                                            index = -1;
                                        } else {
                                            index = cached.findIndex(item => item.name === information.name && item.type === information.type);
                                        }
                                        //If the item isn't already in the list:
                                        if (index === -1) {
                                            toast('Adding to your list. This may take a moment...');
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
                                                toast.error('Sorry, an error has occured!');
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

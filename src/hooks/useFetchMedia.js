import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const useFetchMedia = (mediaUrl, type) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const abortCont = new AbortController();

        if (!user) return;

        const fetchData = async () => {

            try {
                // resetting loading and error states
                setIsLoading(true);
                setError(null);

                // getting raw response from source
                let res;
                if (type==='game'){
                    res = await fetch(mediaUrl, {
                        signal: abortCont.signal,
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                } else {
                    res = await fetch(mediaUrl, { signal: abortCont.signal });
                }
                console.log('fetching from external api') // DEBUG CHECKPOINT

                // If there's an error code, it will throw an error
                if (!res.ok) throw new Error("Failed to fetch");

                //obtaining the json file from the source
                const json = await res.json();

                // checking the type of the media to determine where our source data is in the json file.
                switch(type){
                    case 'game':
                    case 'tv':
                        setData(json);
                        break;
                    case 'movie':
                        setData(json.description); 
                        break;
                    case 'amiibo':
                        setData(json.amiibo);
                        break;
                    case 'book':
                        setData(json.docs);
                        break;
                    default:
                        setData(json.data); // for Jikan API aka anime, manga
                        break;
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData();

        return () => abortCont.abort();
    }, [mediaUrl, type, user]); 
    //our dependencies are the mediaUrl and type and user which means this useEffect occurs whenever mediaUrl and type change.

    return { data, isLoading, error };
};

export default useFetchMedia;
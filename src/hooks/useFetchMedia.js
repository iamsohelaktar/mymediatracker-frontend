import { useState, useEffect } from 'react';

const useFetchMedia = (mediaUrl, type) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {

            try {
                // resetting loading and error states
                setIsLoading(true);
                setError(null);

                // getting raw response from source
                const res = await fetch(mediaUrl, { signal: abortCont.signal });
                console.log('fetching from external api') // DEBUG CHECKPOINT

                // If there's an error code, it will throw an error
                if (!res.ok) throw new Error("Failed to fetch");

                //obtaining the json file from the source
                const json = await res.json();

                // checking the type of the media to determine where our source data is in the json file.
                switch(type){
                    case 'tv':
                        setData(json);
                        break;
                    case 'movie':
                        setData(json.description); 
                        console.log(json.description);
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
    }, [mediaUrl, type]); //our dependencies are the mediaUrl and type which means this useEffect occurs whenever mediaUrl and type change.

    return { data, isLoading, error };
};

export default useFetchMedia;
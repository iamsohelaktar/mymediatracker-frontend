import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import {baseUrl} from '../Urls.js';
import { toast } from 'react-toastify';

const useLoadMedia = (type) => {
    const [watchList, setWatchList] = useState([]);
    const {user} = useAuthContext();
    
    useEffect(() => {
        const cached = JSON.parse(sessionStorage.getItem('watchlist')) || [];
        const fetchMedias = async () => {
            const response = await fetch(baseUrl+'/api/medias', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok){
                setWatchList(json);
                sessionStorage.setItem('watchlist', JSON.stringify(json));
            } else { 
                console.log(response);
            }
        }
        if (user){
            if (cached.length > 0){
                console.log('Fetching from browser...');
                setWatchList(cached);
            } else {
                console.log('Fetching from database...');
                fetchMedias();
            }
        }
    }, [user]);

    const filteredList = [...watchList].filter(item => item.type===type);

    const handleRemove = async (media) => {
        if (!user){
            toast.error('You must be logged in!');
            return;
        }
        const res = await fetch(baseUrl+"/api/medias/"+media._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (res.ok){
            const updatedList = watchList.filter(
                item => !(item._id === media._id)
            );

            setWatchList(updatedList);
            sessionStorage.setItem('watchlist', JSON.stringify(updatedList));
            return (media.name+' removed from your list');
        }
    }

    const handleChange = async (property, newValue, media) => {
        if (!user){
            return;
        }
        const updatedData = JSON.stringify({ [property]: newValue });
        const res = await fetch(baseUrl+"/api/medias/"+media._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: updatedData
        });
        console.log('updating database...');

        const index = watchList.findIndex(item => item.name === media.name && item.type === media.type);
        if (index !== -1) {
            const updatedList = [...watchList];

            if (property === 'rating'){
                updatedList[index].rating = newValue;
            } else if (property === 'status'){
                updatedList[index].status = newValue;
            } else if (property === 'progress'){
                updatedList[index].progress = newValue;
            }
            setWatchList(updatedList);
            sessionStorage.setItem('watchlist', JSON.stringify(updatedList));
            console.log('Updating browser...');
            return (property+' changed to '+newValue+"!");
        }
    }
    
    return { mediaList: filteredList, handleRemove, handleChange };
};

export default useLoadMedia;
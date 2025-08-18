import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
import {baseUrl} from '../Urls.js';
import { toast } from 'react-toastify';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async(email, password, username, recaptchaToken) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(baseUrl+'/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, username, recaptchaToken})
        })

        const json = await response.json();

        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            toast.success('Signed up successfully.')
            setIsLoading(false);
        }
    }

    return {signup, isLoading, error}
}
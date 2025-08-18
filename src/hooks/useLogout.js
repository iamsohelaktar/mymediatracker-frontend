import { useAuthContext } from "./useAuthContext";
import { toast } from 'react-toastify';

export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');

        //remove reCAPTCHA token from local storage
        localStorage.removeItem('grecaptcha');

        // remove cached watchlist from session storage
        sessionStorage.removeItem('watchlist');

        dispatch({type: "LOGOUT"});
        toast.success('Logged out successfully.')
    }

    return {logout}
}
import { useAuthContext } from "./useAuthContext";

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
    }

    return {logout}
}
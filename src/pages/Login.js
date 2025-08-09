import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import ReCaptcha from "../components/ReCaptcha";

export default function Login() {
    // Creating state variables for information that the user will submit
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');

    //Creating a state variable to check if 'submitting' should be available
    const [submitEnabled, setSubmitEnabled] = useState(false);

    //Only if there is a valid reCAPTCHA token, the submit button will be enabled
    useEffect(() => {
        if(recaptchaToken.length){
            setSubmitEnabled(true);
        }
    }, [recaptchaToken]);
    
    // The login function from the useLogin hook sends the data to serverside
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        // Preventing the page from reloading on form submit
        e.preventDefault();
        
        // Only if submitEnabled returns true, the user will be able to login
        if (submitEnabled){
            await login(email, password, recaptchaToken);
        }
    }

    //Updating the reCAPTCHA state variable
    const handleRecaptchaToken = (recaptchaToken) => {
        setRecaptchaToken(recaptchaToken);
    }

    // If the reCAPTCHA token has expired, the submit button will disable
    const handleRecaptchaTokenExpired = (recaptchaToken) => {
        setRecaptchaToken('');
        setSubmitEnabled(false); 
    }

    return ( 
        <div className="sign-up">
            <div className="wrapper">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">❌ {error}</div>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <ReCaptcha 
                    sitekey='6LcB5JwrAAAAABjANHRqOYzSyUu4w456sCJvI2cU' 
                    callback={handleRecaptchaToken}
                    onExpired={handleRecaptchaTokenExpired}
                />
                <button disabled={isLoading || !submitEnabled} type="submit">Login</button>
                <span>Don't Have an Account? <Link to="/signup">Register</Link></span>
            </form>
            </div>
        </div> 
    );
}
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import ReCaptcha from "../components/ReCaptcha";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(() => {
        if(recaptchaToken.length){
            setSubmitEnabled(true);
        }
    }, [recaptchaToken]);

    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (submitEnabled){
            await signup(email, password, username, recaptchaToken);
        }
    }

    const handleRecaptchaToken = (recaptchaToken) => {
        setRecaptchaToken(recaptchaToken);
    }

    const handleRecaptchaTokenExpired = (recaptchaToken) => {
        setRecaptchaToken('');
        setSubmitEnabled(false); 
    }

    return ( 
        <div className="sign-up">
            <div className="wrapper">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">❌ {error}</div>}
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        placeholder="Enter Username"
                        autoComplete="off"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <details>
                        <summary style={{'cursor': 'pointer'}}>Password requirements</summary>
                        <li>8 characters</li>
                        <li>Minimum: 1 number, 1 lowercase letter</li>
                    </details>
                </div>
                <ReCaptcha 
                    sitekey='6LcB5JwrAAAAABjANHRqOYzSyUu4w456sCJvI2cU' 
                    callback={handleRecaptchaToken}
                    onExpired={handleRecaptchaTokenExpired}
                />
                <button disabled={isLoading || !submitEnabled} type="submit">Sign up</button>
                <span>Already Have an Account? <Link to="/login">Login</Link></span>
            </form>
            </div>
        </div> 
    );
}
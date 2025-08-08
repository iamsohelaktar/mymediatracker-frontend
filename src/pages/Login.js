import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import ReCaptcha from "../components/ReCaptcha";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(() => {
        if(recaptchaToken.length){
            setSubmitEnabled(true);
        }
    }, [recaptchaToken]);

    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitEnabled){
            await login(email, password, recaptchaToken);
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
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useRegisterMutation, useLoginMutation } from '../../store/slices/authApiSlice';
import { Eye, EyeSlash } from "../../assets/icons";
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import { useTitle } from '../../hooks/useTitle';
import PulseLoader from 'react-spinners/PulseLoader';

export const Register = () => {
    
    useTitle('Register here to join')

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg]     = useState('');

    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();
    const [ login ] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { message } = await register({ username, password }).unwrap();
            console.log(message);
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setPassword('');
            navigate('/dash');
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);

    const errClass = errMsg ? "errmsg" : "offscreen";

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="public">
            <NavBar />
            <main className="public__register">

                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <input
                            id="username"
                            className="form__field"
                            type="text"

                            placeholder="username"
                            onChange={handleUserInput}
                            value={username}
                            ref={userRef}

                            autoComplete="off"
                            required
                        />
                        <label className="form__label" htmlFor="username">Username:</label>
                    </div>

                    <div className="form__group">
                        <input
                            className="form__field"
                            placeholder="password"
                            type={passwordShown ? "text" : "password"}
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                        <span className="password-reveal" onClick={togglePassword}>
                            {passwordShown ? (
                                <EyeSlash className="icon-eye-closed" />
                            ) : (
                                <Eye className="icon-eye-open" />
                            )}
                        </span>
                        <label className="form__label" htmlFor="password">Password:</label>
                    </div>

                    <button className="form__submit-button">Register</button>

                </form>
            </main>
            <Footer />
        </section>
    )

    return content;
};

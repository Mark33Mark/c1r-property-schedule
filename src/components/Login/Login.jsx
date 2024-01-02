import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../store/slices/authApiSlice';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import { Eye, EyeSlash } from '../../assets/icons';
import { usePersist, useTitle } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
// import { Button } from '@mark33mark/react-component-library';
// import {
// 	BasicButton,
// 	OutlineButton,
// } from '@mark33mark/medium_published_reusable-button-component';

export const Login = () => {
	useTitle('Authorised User Login');

	const userRef = useRef();
	const errRef = useRef();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();
	const [passwordShown, setPasswordShown] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
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
	};

	const handleUserInput = (e) => setUsername(e.target.value);
	const handlePwdInput = (e) => setPassword(e.target.value);
	const handleToggle = () => setPersist((prev) => !prev);

	const errClass = errMsg ? 'errmsg' : 'offscreen';

	if (isLoading) return <PulseLoader color={'#FFF'} />;

	const content = (
		<section className='public'>
			<NavBar />
			<main className='public__login'>
				<p
					ref={errRef}
					className={errClass}
					aria-live='assertive'
				>
					{errMsg}
				</p>

				<form
					className='form'
					onSubmit={handleSubmit}
				>
					<div className='form__group'>
						<input
							id='username'
							className='form__field'
							type='text'
							placeholder='username'
							onChange={handleUserInput}
							value={username}
							ref={userRef}
							autoComplete='off'
							required
						/>
						<label
							className='form__label'
							htmlFor='username'
						>
							Username:
						</label>
					</div>

					<div className='form__group'>
						<input
							className='form__field'
							placeholder='password'
							type={passwordShown ? 'text' : 'password'}
							id='password'
							onChange={handlePwdInput}
							value={password}
							required
						/>
						<span
							className='password-reveal'
							onClick={togglePassword}
						>
							{passwordShown ? (
								<EyeSlash className='icon-eye-closed' />
							) : (
								<Eye className='icon-eye-open' />
							)}
						</span>
						<label
							className='form__label'
							htmlFor='password'
						>
							Password:
						</label>
					</div>

					<button className="form__submit-button">Login</button>
					{/* <Button>Login </Button> */}
					{/* <BasicButton
						buttonSize='btn--wide'
						buttonColor='red'
					>
						Login-basic
					</BasicButton>

					<OutlineButton
						buttonSize='btn--wide'
						buttonBorderColor='red-border'
					>
						Login-outline
					</OutlineButton> */}

					<div className='form__persist'>
						<input
							type='checkbox'
							className='form__checkbox'
							id='persist'
							onChange={handleToggle}
							checked={persist}
						/>

						<span className='form__persist-message'>
							<span className='form__persist-logo'> ℹ </span>a tick here means
							you trust your device and you want me to keep you logged in.
						</span>
					</div>
				</form>

				<div className='dev-logins'>
					<div style={{ paddingTop: '2rem' }}>
						⚠️ example username: test1 | password: test1234{' '}
					</div>
					<div> ⚠️ example username: test2 | password: test1234 </div>
					<div> ⚠️ example username: test3 | password: test1234 </div>
				</div>
			</main>
			<Footer />
		</section>
	);

	return content;
};

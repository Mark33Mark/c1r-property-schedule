import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from '../../store/slices/usersApiSlice';
import { ROLES } from '../../config/roles';
import { useTitle } from '../../hooks/useTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Eye, EyeSlash } from '../../assets/icons';

const USER_REGEX = /^[A-z0-9~!@#$%]{3,20}$/;
const PWD_REGEX = /^[A-z0-9~!@#$%]{4,12}$/;

const NewUserForm = () => {
	useTitle('CSR: New User');

	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation();

	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [roles, setRoles] = useState(['Employee']);
	const [passwordShown, setPasswordShown] = useState(false);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setUsername('');
			setPassword('');
			setRoles([]);
			navigate('/dash/users');
		}
	}, [isSuccess, navigate]);

	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		);
		setRoles(values);
	};

	const canSave =
		[roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewUser({ username, password, roles });
		}
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option
				key={role}
				value={role}
			>
				{' '}
				{role}
			</option>
		);
	});

	const errClass = isError ? 'errmsg' : 'offscreen';
	const validUserClass = !validUsername ? 'form__input--incomplete' : '';
	const validPwdClass = !validPassword ? 'form__input--incomplete' : '';
	const validRolesClass = !Boolean(roles.length)
		? 'form__input--incomplete'
		: '';

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<form
				className='form user'
				onSubmit={onSaveUserClicked}
			>
				<div className='form__title-row'>
					<h2>New User</h2>
					<div className='form__action-buttons'>
						<button
							className='icon-button'
							title='Save'
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>
				<label
					className='form__label'
					htmlFor='username'
				>
					Username: <span className='nowrap'>[3-20 letters]</span>
				</label>
				<input
					className={`form__input ${validUserClass}`}
					id='username'
					name='username'
					type='text'
					autoComplete='off'
					value={username}
					onChange={onUsernameChanged}
				/>

				<label
					className='form__label'
					htmlFor='password'
				>
					Password:{' '}
					<span className='nowrap'>[4-12 chars including ~!@#$%]</span>
				</label>
                <div className='form__group user__edit-form'>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id='password'
                        name='password'
                        type={passwordShown ? 'text' : 'password'}
                        value={password}
                        onChange={onPasswordChanged}
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
                </div>

				<label
					className='form__label'
					htmlFor='roles'
				>
					ASSIGNED ROLES:
				</label>
				<select
					id='roles'
					name='roles'
					className={`form__select ${validRolesClass}`}
					multiple={true}
					size='3'
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</form>
		</>
	);

	return content;
};

export { NewUserForm };

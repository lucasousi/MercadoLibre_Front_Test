import './Login.scss';

import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import logo from 'src/assets/images/logo.png';
import Button from 'src/components/Button/Button';
import useLoginService from 'src/services/login.service';

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
	const history = useHistory();
	const { isAuthenticatedSync, postLogin } = useLoginService();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isAuth] = useState(isAuthenticatedSync());
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	useEffect(() => {
		document.title = 'Mercado Livre - Login';
	}, []);

	async function handleSubmit() {
		try {
			setIsLoggingIn(true);
			await postLogin(username, password);
			setIsLoggingIn(false);
			history.push('/catalogo');
		} catch (ex) {
			setIsLoggingIn(false);
			console.log(ex);
		}
	}

	return isAuth ? (
		<Redirect to='/catalogo' />
	) : (
		<div className='login-container d-flex justify-content-center align-items-center'>
			<div className='login-form-container row p-5'>
				<div className='row'>
					<div className='col-12 mb-5'>
						<img src={logo} alt='logo' className='logo' width='100%' />
					</div>
				</div>
				<form
					className='row'
					onSubmit={(e) => {
						handleSubmit();
						e.preventDefault();
					}}
				>
					<fieldset className='col-12'>
						<div className='row'>
							<div className='col-12 credentials-container'>
								<label
									className='text-left w-100 lead-color'
									htmlFor='email-input'
								>
									Informe seu e-mail:
								</label>
								<input
									id='email-input'
									required
									type='email'
									autoComplete='email'
									className='form-control mb-3'
									placeholder='ex: meuemail@meuprovedor.com'
									maxLength={50}
									value={username}
									onChange={(e) => setUsername(e.currentTarget?.value)}
								/>

								<label
									className='text-left w-100 lead-color'
									htmlFor='password-input'
								>
									Informe sua senha:
								</label>
								<div className='position-relative  mb-5'>
									<input
										id='password-input'
										required
										type={showPassword ? 'text' : 'password'}
										className='form-control'
										autoComplete='current-password'
										placeholder='******'
										maxLength={10}
										value={password}
										onChange={(e) => setPassword(e.currentTarget?.value)}
									/>
									<div className='show-password-container position-absolute'>
										<FontAwesomeIcon
											className='pointer-on-hover'
											icon={showPassword ? faEyeSlash : faEye}
											onClick={() => setShowPassword(!showPassword)}
										/>
									</div>
								</div>
							</div>
							<div className='col-12 buttons-container'>
								<Button
									isLoading={isLoggingIn}
									containerClass='my-3'
									variant='primary'
									type='submit'
									disabled={!username || !password || isLoggingIn}
									icon={<i className='fas fa-sign-in-alt mr-2' />}
								>
									{isLoggingIn ? 'Realizando acesso...' : 'Acessar o Portal'}
								</Button>
							</div>
						</div>
					</fieldset>
					<div className='col-12 text-center'>
						<small className='gray-color'>Versão do sistema: 1.0.0</small>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

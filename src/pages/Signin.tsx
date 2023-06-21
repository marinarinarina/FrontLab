import { LoginForm } from 'components/Form/LoginForm';
import { StyledButton } from 'components/Button/Button';
import { Container, Title } from './styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validation } from 'utils/validator';
import { login } from 'api/post';

const Signin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const isPass = validation(email, password);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/todo');
		}
	}, []);

	const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		login({ email, password, navigate });
	};

	return (
		<Container>
			<Title>로그인</Title>
			<LoginForm
				email={email}
				password={password}
				handleOnChangeEmail={handleOnChangeEmail}
				handleOnChangePassword={handleOnChangePassword}
			/>
			<StyledButton
				isSignup={false}
				label={'로그인'}
				colorType={'green'}
				size={'medium'}
				disabled={!isPass}
				onClick={clickHandler}
			/>
		</Container>
	);
};

export default Signin;

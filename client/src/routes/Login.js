import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import Cookies from 'universal-cookie';
import Logout from '../components/Logout';

const Login = () => {
	const [userID, setUserID] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const cookies = new Cookies();
	cookies.get('token');

	const submitForm = async (event) => {
		event.preventDefault();
		try {
			await axios.post('http://localhost:5000/login', {
				userID: userID,
				password: password,
			});
			setSuccess('Login successful');
			setError('');
		} catch (err) {
			setError('Incorrect userID or password');
			setSuccess('');
		}
	};
	if (!cookies.cookies.token) {
		return (
			<Flex justifyContent='center' alignItems='center'>
				<Box
					w='md'
					mt='25'
					p='8'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Box textAlign='center'>
						<Heading>Login</Heading>
					</Box>
					<Box my={4} textAlign='left'>
						<form onSubmit={(event) => submitForm(event)}>
							{error && <ErrorMessage message={error} />}
							{success && <SuccessMessage message={success} />}
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									type='text'
									onChange={(event) => setUserID(event.target.value)}
								/>
							</FormControl>
							<FormControl mt={6} isRequired>
								<FormLabel>Password</FormLabel>
								<Input
									type='password'
									onChange={(event) => setPassword(event.target.value)}
								/>
							</FormControl>
							<Button type='submit' color='teal' width='full' mt={4}>
								Login
							</Button>
						</form>
					</Box>
				</Box>
			</Flex>
		);
	} else {
		return <Logout />;
	}
};
export default Login;

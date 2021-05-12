import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';
import ErrorMessage from './ErrorMessage';

const AddressForm = () => {
	const cookies = new Cookies();
	const history = useHistory();
	const [data, setData] = useState({
		company: 'N/A',
		address2: 'N/A',
		region: 'N/A',
	});
	const [error, setError] = useState('');

	const back = () => {
		history.goBack();
	};
	const changeHandler = (event) => {
		setData({ ...data, [event.target.id]: event.target.value });
	};
	const submitForm = () => {
		cookies.getAll();
		const token = cookies.cookies.token || null;
		if (!token) {
			setError('You have not logged in!');
		} else {
			const cart = JSON.parse(localStorage.getItem('cart'));
			localStorage.removeItem('cart');
			history.push({ pathname: '/invoice', address: data, cart: cart });
		}
	};

	return (
		<Box
			maxWidth='lg'
			mt='25'
			p='8'
			borderWidth={1}
			borderRadius={8}
			boxShadow='lg'>
			<Box textAlign='center'>
				<Heading size='lg'>Delivery Address</Heading>
			</Box>
			<form
				onSubmit={() => {
					submitForm();
				}}>
				<FormControl isRequired onChange={changeHandler} id='fullname'>
					<FormLabel>Full Name</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl onChange={changeHandler} id='company'>
					<FormLabel>Company Name</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl isRequired onChange={changeHandler} id='address1'>
					<FormLabel>Address Line 1</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl onChange={changeHandler} id='address2'>
					<FormLabel>Address Line 2</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl isRequired onChange={changeHandler} id='city'>
					<FormLabel>City</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl onChange={changeHandler} id='region'>
					<FormLabel>Region/State/District</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl isRequired id='country' onChange={changeHandler}>
					<FormLabel>Country</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				<FormControl isRequired id='postcode' onChange={changeHandler}>
					<FormLabel>Postcode/Zip Code</FormLabel>
					<Input type='text'></Input>
				</FormControl>
				{error && <ErrorMessage message={error} />}
				<HStack mt='4' spacing='2'>
					<Button type='submit'>Checkout</Button>
					<Button onClick={back}>Back</Button>
				</HStack>
			</form>
		</Box>
	);
};

export default AddressForm;

import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from '@chakra-ui/breadcrumb';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/layout';
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/number-input';
import { useState } from 'react';
import { useLocation } from 'react-router';

const Book = () => {
	const [Number, setNumber] = useState(0);
	const [alert, setAlert] = useState('');
	const [success, setSuccess] = useState('');
	const [cart, setCart] = useState(
		JSON.parse(localStorage.getItem('cart')) || ''
	);
	const { state } = useLocation();
	const addCart = (event) => {
		event.preventDefault();
		if (Number === 0) {
			setAlert('Cannot Add Zero Item!');
			setSuccess('');
		} else {
			if (cart === '') {
				const item = {
					name: state.bookName,
					quantity: Number,
					price: state.price,
				};
				localStorage.setItem('cart', JSON.stringify([item]));
				setSuccess('Book(s) Added!');
				setCart([item]);
			} else {
				let i = Number;
				for (let index = 0; index < cart.length; index++) {
					const element = cart[index];
					if (element.name === state.bookName) {
						i += element.quantity;
						cart.splice(index, 1);
					}
				}
				const item = {
					name: state.bookName,
					quantity: i,
					price: state.price,
				};
				localStorage.setItem('cart', JSON.stringify([...cart, item]));
				setAlert('');
				setSuccess('Book(s) Added!');
				setCart([...cart, item]);
			}
		}
	};
	if (state) {
		const book = state;
		const imagePath = `http://127.0.0.1:5000/images/${book.bookImage}`;
		const newArrival = book.newArrival ? 'New Arrival' : '';
		return (
			<Flex
				width='full'
				height='full'
				justifyContent='center'
				mt='4'
				mb='4'
				alignItems='center'>
				<Box p='2' borderWidth='1px' borderRadius='lg' maxW='sm'>
					<Breadcrumb>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<BreadcrumbLink isCurrentPage>{book.bookName}</BreadcrumbLink>
						</BreadcrumbItem>
					</Breadcrumb>

					<Text fontSize='lg'>{book.bookName}</Text>
					<Image src={imagePath} w='sm' h='sm' objectFit='contain' />
					<Badge colorScheme='green'>{newArrival}</Badge>
					<Text>Author: {book.author}</Text>
					<Text>Published: {book.published}</Text>
					<Text>Category: {book.category}</Text>
					<Text>Language: {book.lang}</Text>
					<Text>Publisher: {book.publisher}</Text>
					<Text>Description: {book.description}</Text>
					<Text>Price: {book.price}</Text>
					<form
						onSubmit={(event) => {
							addCart(event);
						}}>
						{alert && (
							<Alert my='4' status='error'>
								<AlertIcon />
								<AlertTitle>{alert}</AlertTitle>
							</Alert>
						)}
						{success && (
							<Alert my='4' status='success'>
								<AlertIcon />
								<AlertTitle>{success}</AlertTitle>
							</Alert>
						)}
						<FormControl mt='5'>
							<HStack>
								<NumberInput
									min={0}
									precision={0}
									onChange={(num) => setNumber(parseInt(num))}>
									<NumberInputField placeholder='Quantity' />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
								<Button type='submit'>Add to Cart</Button>
							</HStack>
						</FormControl>
					</form>
				</Box>
			</Flex>
		);
	} else {
		return <p>404 not found</p>;
	}
};

export default Book;

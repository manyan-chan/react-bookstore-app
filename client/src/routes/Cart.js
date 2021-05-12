import {
	Box,
	Heading,
	Text,
	VStack,
	Flex,
	Button,
	Alert,
	AlertIcon,
	HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Cart = () => {
	const [cart, setCart] = useState(
		JSON.parse(localStorage.getItem('cart')) || ''
	);

	const history = useHistory();
	const back = () => {
		history.goBack();
	};

	const deleteItem = (event) => {
		cart.splice(event.target.id, 1);
		setCart([...cart]);
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	if (cart === '' || !cart.length) {
		return (
			<Flex width='full' justifyContent='center'>
				<Box my='4' maxWidth='md'>
					<Alert status='warning'>
						<AlertIcon />
						Seems that your cart is empty, go add some books now!
					</Alert>
				</Box>
			</Flex>
		);
	} else {
		let sum = 0;
		return (
			<Flex width='full' justifyContent='center'>
				<VStack mt='4' align='stretch' maxW='md'>
					<Heading>My Shopping Cart</Heading>
					{cart.map((element, index) => {
						sum += element.quantity * element.price;
						return (
							<Box
								w='full'
								key={index}
								my='2'
								p='4'
								borderWidth='1px'
								borderRadius='lg'>
								<Text>Bookname: {element.name}</Text>
								<Text>Quantity: {element.quantity}</Text>
								<Button
									size='sm'
									colorScheme='red'
									id={index}
									onClick={(event) => deleteItem(event)}>
									Delete
								</Button>
							</Box>
						);
					})}
					<Box>Total Price: ${sum}</Box>
					<HStack>
						<Button
							size='xs'
							colorScheme='teal'
							onClick={() => history.push('/checkout')}>
							Checkout
						</Button>
						<Button size='xs' colorScheme='teal' onClick={back}>
							Back
						</Button>
					</HStack>
				</VStack>
			</Flex>
		);
	}
};

export default Cart;

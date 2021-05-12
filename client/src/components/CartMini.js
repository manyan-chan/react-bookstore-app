import {
	Box,
	Heading,
	Text,
	VStack,
	Flex,
	Alert,
	AlertIcon,
	HStack,
} from '@chakra-ui/react';

const CartMini = () => {
	const cart = JSON.parse(localStorage.getItem('cart')) || '';

	if (cart === '' || !cart.length) {
		//empty cart
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
		// not empty cart
		let sum = 0;
		return (
			<Flex width='full' justifyContent='center'>
				<VStack
					w='md'
					mt='25'
					p='8'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Heading>My Shopping Cart</Heading>
					{cart.map((element, index) => {
						let p = element.quantity * element.price;
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
								<Text>Price: ${p}</Text>
							</Box>
						);
					})}
					<Box>Total Price: ${sum}</Box>
					<HStack></HStack>
				</VStack>
			</Flex>
		);
	}
};

export default CartMini;

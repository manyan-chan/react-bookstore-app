import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';

const Invoice = (state) => {
	const { address, cart } = state.location;
	console.log(address);
	console.log(cart);

	let sum = 0;
	if (address && cart) {
		return (
			<Flex justifyContent='center'>
				<Box
					maxWidth='lg'
					mt='25'
					p='8'
					borderWidth={1}
					borderRadius={8}
					boxShadow='lg'>
					<Heading textAlign='center'>Invoice Page</Heading>
					<Text>Fullname: {address.fullname}</Text>
					<Text>Company: {address.company}</Text>
					<Text>Address line 1: {address.address1}</Text>
					<Text>Address line 2: {address.address2}</Text>
					<Text>City: {address.city}</Text>
					<Text>Region: {address.region}</Text>
					<Text>Country:{address.country}</Text>
					<Text>Postcode: {address.postcode}</Text>
					<Divider my='4' />
					{cart.map((element, index) => {
						let p = element.quantity * element.price;
						sum += element.quantity * element.price;
						return (
							<Box my='2'>
								<Text>Bookname: {element.name}</Text>
								<Text>Quantity: {element.quantity}</Text>
								<Text>Price: ${p}</Text>
							</Box>
						);
					})}
					<b>Total Price: ${sum}</b>
					<Divider my='4' />
					<Text>Thanks for ordering🎉</Text>
				</Box>
			</Flex>
		);
	} else {
		return <div>404</div>;
	}
};

export default Invoice;

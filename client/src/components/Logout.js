import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import Cookies from 'universal-cookie';

const Logout = () => {
	const cookies = new Cookies();

	return (
		<Flex justifyContent='center' alignItems='center'>
			<Box
				maxWidth='lg'
				mt='25'
				p='8'
				borderWidth={1}
				borderRadius={8}
				boxShadow='lg'>
				<Heading>You Have Logged In</Heading>
				<Button
					w='full'
					mt='4'
					colorScheme='red'
					onClick={() => {
						cookies.remove('token');
						window.location.reload();
					}}>
					Logout
				</Button>
			</Box>
		</Flex>
	);
};

export default Logout;

import { Box, Flex, Heading } from '@chakra-ui/layout';
import Cookies from 'universal-cookie';
import Register from './Register';
import Login from './Login';
import CartMini from '../components/CartMini';
import AddressForm from '../components/AddressForm';

const cookies = new Cookies();
cookies.getAll();
const token = cookies.cookies.token || null;

const Checkout = () => {
	if (token) {
		//logged in
		return (
			<Flex justifyContent='center'>
				<Box>
					<AddressForm />
					<CartMini />
				</Box>
			</Flex>
		);
	} //not logged in
	else {
		return (
			<Flex justifyContent='center' alignItems='flex-start' flexFlow='row wrap'>
				<Box mx='4'>
					<Heading textAlign='center'>I'm a new customer</Heading>
					<Register />
					<AddressForm />
				</Box>
				<Box mx='4'>
					<Heading textAlign='center'>I'm a already a customer</Heading>
					<Login />
					<CartMini />
				</Box>
			</Flex>
		);
	}
};

export default Checkout;

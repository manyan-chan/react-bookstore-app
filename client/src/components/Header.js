import { Box, Flex, Link, Spacer } from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <Flex bg='teal.500'>
        <Box m='2' color='white'>
          <Link href='/'>Home</Link>
        </Box>
        <Spacer />
        <Box m='2' color='white'>
          <Link href='/register'>Register</Link>
        </Box>
        <Box m='2' color='white'>
          <Link href='/login'>Login</Link>
        </Box>
        <Box m='2' color='white'>
          <Link href='/Cart'>Cart</Link>
        </Box>
      </Flex>
    </header>
  );
};

export default Header;

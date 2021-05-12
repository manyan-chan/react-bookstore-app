import { Alert, AlertDescription, AlertIcon, Box } from '@chakra-ui/react';

function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status='error' borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
export default ErrorMessage;

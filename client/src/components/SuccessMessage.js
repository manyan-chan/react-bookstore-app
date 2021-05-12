import { Alert, AlertDescription, AlertIcon, Box } from '@chakra-ui/react';

function SuccessMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status='success' borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
export default SuccessMessage;

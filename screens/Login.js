import { Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Text, VStack } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function Login() {

    const [passVisible, setPassVisible] = useState(false)

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading> */}

                <VStack space={3} mt="5">

                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input InputLeftElement={<Icon as={Ionicons} ml={2} name="person" size="md" />} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>

                        <Input
                            type={passVisible ? "text" : "password"}
                            InputRightElement={
                                <Icon onPress={() => setPassVisible(!passVisible)} as={Ionicons} mr={2} name={passVisible ? "eye-off" : "eye"} size="md" />
                            }
                        />

                        <Text color={"teal.500"} _text={{
                            fontSize: "xs",
                            fontWeight: "500"
                        }} alignSelf="flex-end" mt="1" underline>
                            Forget Password?
                        </Text>
                    </FormControl>

                    <Button mt="2" colorScheme="teal">
                        Sign in
                    </Button>

                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Text color={"teal.500"} _text={{
                            fontWeight: "medium",
                            fontSize: "sm",

                        }} underline>
                            Sign Up
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}
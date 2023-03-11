import { Box, Button, Center, FormControl, Heading, HStack, Icon, Input, ScrollView, Text, VStack, WarningOutlineIcon } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Snackbar } from "react-native-paper";


export default function Login({ navigation }) {

    const [passVisible, setPassVisible] = useState(false)
    const authContext = useContext(AuthContext)
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState(null)
    // const [visible, setVisible] = useState(false);
    // const [isPassword, setIsPassword] = useState()
    // const [isEmail, setEmail] = useState()

    const validate = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (password && email) {

            if (reg.test(email)) {

                var response = await authContext.authFunctions.signIn(email, password)
                if (response.error) {
                    setError(response.error)
                }

            } else {
                setError("Please enter a valid email")
            }

        } else {

            setError("Please enter all the required fields")
            if (!email) {
                setEmail("")
            }
            if (!password) {
                setPassword("")
            }

        }


    }

    return (
        <ScrollView w="100%" h="100%" contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Box p="2" py="8" w="90%" maxW="290" >
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">

                    <FormControl isRequired isInvalid={email == "" ? true : false} >
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input
                            InputLeftElement={<Icon as={MaterialIcons} ml={2} name="alternate-email" size="md" />}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter an Email.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={password == "" ? true : false} >
                        <FormControl.Label>Password</FormControl.Label>

                        <Input
                            type={passVisible ? "text" : "password"}
                            InputRightElement={
                                <Icon onPress={() => setPassVisible(!passVisible)} as={Ionicons} mr={2} name={passVisible ? "eye-off" : "eye"} size="md" />
                            }
                            onChangeText={(text) => setPassword(text)}

                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter a Password.
                        </FormControl.ErrorMessage>
                        {/* <Text color={"teal.500"} _text={{
                            fontSize: "xs",
                            fontWeight: "500"
                        }} alignSelf="flex-end" mt="1" underline>
                            Forget Password?
                        </Text> */}
                    </FormControl>

                    <Button mt="2" colorScheme="teal" onPress={() => validate()}>
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

                        }} onPress={() => navigation.navigate("Signup")} >
                            Sign Up
                        </Text>
                    </HStack>

                </VStack>
            </Box>
            <Snackbar
                visible={error == null ? false : true}
                onDismiss={() => { setError(null) }}
                duration={3000}
            >
                {error}
            </Snackbar>
        </ScrollView >
    )
}
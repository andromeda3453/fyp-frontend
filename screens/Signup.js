import { Box, Button, Center, FormControl, Heading, HStack, Icon, Input, ScrollView, Text, VStack, WarningOutlineIcon } from "native-base";
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Snackbar } from "react-native-paper";


export default function Signup({ navigation }) {

    const [passVisible, setPassVisible] = useState(false)
    const [confirmPassVisible, setconfirmPassVisible] = useState(false)
    const authContext = useContext(AuthContext)
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [userName, setUserName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [error, setError] = useState(null)


    const validate = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (password && confirmPassword && email && phoneNumber && userName && firstName && lastName) {

            if (reg.test(email)) {

                if (password == confirmPassword) {

                    var response = await authContext.authFunctions.signUp(email, password, userName, phoneNumber, firstName, lastName)
                    if (response.error) {

                        let error = ""
                        for (const err in response.error) {

                            error = error + response.error[err] + "\n"

                        }
                        setError(error)

                    } else {
                        setError(response)

                    }
                }
                else {
                    setError("Passwords do not match")
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
            if (!confirmPassword) {
                setConfirmPassword("")
            }
            if (!userName) {
                setUserName("")
            }
            if (!firstName) {
                setFirstName("")
            }
            if (!lastName) {
                setLastName("")
            }
            if (!phoneNumber) {
                setPhoneNumber("")
            }


        }


    }

    return (
        <ScrollView w={"full"} h={"full"} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

            <Box p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }} fontWeight="semibold">
                    Welcome
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">

                    <FormControl isRequired isInvalid={firstName == "" ? true : false} >
                        <FormControl.Label>First Name</FormControl.Label>
                        <Input
                            InputLeftElement={<Icon as={Ionicons} ml={2} name="person" size="md" />}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter your first name.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={lastName == "" ? true : false} >
                        <FormControl.Label>Last Name</FormControl.Label>
                        <Input
                            InputLeftElement={<Icon as={Ionicons} ml={2} name="person" size="md" />}
                            onChangeText={(text) => setLastName(text)}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter your last name.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={userName == "" ? true : false} >
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            InputLeftElement={<Icon as={Ionicons} ml={2} name="person" size="md" />}
                            onChangeText={(text) => setUserName(text)}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter a username.
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={phoneNumber == "" ? true : false} >
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                            InputLeftElement={<Icon as={FontAwesome} ml={2} name="phone" size="md" />}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please enter a phone number.
                        </FormControl.ErrorMessage>
                    </FormControl>

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
                    </FormControl>


                    <FormControl isRequired isInvalid={confirmPassword == "" ? true : false} >
                        <FormControl.Label>Confirm Password</FormControl.Label>

                        <Input
                            type={confirmPassVisible ? "text" : "password"}
                            InputRightElement={
                                <Icon onPress={() => setconfirmPassVisible(!confirmPassVisible)} as={Ionicons} mr={2} name={confirmPassVisible ? "eye-off" : "eye"} size="md" />
                            }
                            onChangeText={(text) => setConfirmPassword(text)}

                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please re-enter your password.
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => validate()}>
                        Sign up
                    </Button>
                </VStack>
            </Box>
            <Snackbar
                visible={error == null ? false : true}
                onDismiss={() => { setError(null) }}
                duration={3000}
            >
                {error}
            </Snackbar>
        </ScrollView>
    )

}
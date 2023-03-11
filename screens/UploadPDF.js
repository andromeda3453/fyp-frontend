import React, { useContext, useEffect, useState } from "react";
import * as config from '../config.json'
import {

    Center,
    Button,
    Icon,
    Text,
    VStack,
    CloseIcon,
    HStack,
    FormControl,
    Spinner,
    Box,
    Toast
} from "native-base";

import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import ComboBox from "../components/ComboBox";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Select } from "@mobile-reality/react-native-select-pro";
import { Snackbar } from "react-native-paper";
import { AuthContext } from "../components/AuthContext";

function displayMessage(message) {

    Toast.show({
        duration: 2000,
        render: () => {
            return <Box bg="teal.600" px="5" py="3" rounded="sm" mb={5} >
                <Text color={"#F3EFE0"}>{message}</Text>
            </Box>
        }

    })

}

export default function UploadPDF({ navigation }) {

    const [lab, setLab] = useState()
    const [labs, setLabs] = useState([])
    const [loading, setLoading] = useState(true)
    const [testType, setTestType] = useState()
    const [testTypes, setTestTypes] = useState([])
    const [file, setFile] = useState()
    const [error, setError] = useState(null)
    const [visible, setVisible] = useState(false);
    const authContext = useContext(AuthContext)


    const fetchData = async () => {

        var labResponse = null
        var testTypeResponse = null

        try {

            labResponse = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/lab/search`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                    , "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })

            testTypeResponse = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/testtype`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                },
            })

            labResponse = await labResponse.json()
            testTypeResponse = await testTypeResponse.json()

            if (labResponse.data != null && testTypeResponse != null) {

                setLabs(labResponse.data)
                setTestTypes(testTypeResponse)
                setLoading(false)
            }
            else {
                setError("Data not available")
                setLoading(false)
            }


        } catch (error) {

            console.log(error)
            setError("An error occured, Please try again later")
            setLoading(false)

        }

    }


    useEffect(() => {

        fetchData()

    }, [])



    const selectFiles = async () => {

        try {
            const doc = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });

            if (doc.type != "cancel") {

                setFile(doc)
                // var fileUri = doc.uri
                // const response = await FileSystem.uploadAsync(`${config.SERVER_HOST}:8000/uploadfile`, fileUri, {
                //     fieldName: 'file',
                //     httpMethod: 'POST',
                //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                //     headers: { "Content-Type": "multipart/form-data" }
                // });
                // console.log(JSON.stringify(response));

            } else {

                console.log("file upload cancelled")
            }


        } catch (error) {

            console.log(error)
        }

    }

    const validateAndSubmit = async () => {


        if (lab && file && testType) {

            var response = null
            try {

                var fileUri = file.uri
                const textresponse = await FileSystem.uploadAsync(`${config.SERVER_HOST}:8000/uploadfile`, fileUri, {
                    fieldName: 'file',
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: { "Content-Type": "multipart/form-data" }
                });


                if (textresponse.body) {

                    console.log(JSON.parse(textresponse.body));
                    response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/parser`, {
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${authContext.token}`
                            , "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "reportText": JSON.parse(textresponse.body),
                            "labName": lab,
                            "testType": testType
                        })
                    })

                    response = await response.json()

                    if (response) {
                        navigation.navigate("Edit Results", { ...response.patientDetails })
                        // console.log(response.patientDetails)
                    }
                    else {
                        return { error: "Data not found" }
                    }

                }


            } catch (error) {

                console.log(error)
                return { error: "Data not found" }

            }


        } else {
            setError("Please fill all the required fields")
        }


    }

    return (

        <Center flex={1} >
            {
                labs.length > 0 && testTypes.length > 0 ?
                    <>
                        <VStack px={0}>
                            <FormControl isRequired>
                                <FormControl.Label>Select Lab</FormControl.Label>
                                <Select
                                    options={labs.map(lab => { return { value: lab.id, label: lab.name } })}
                                    clearable={false}
                                    closeOptionsListOnSelect={true}
                                    theme="light"
                                    styles={{ select: { container: { borderColor: "teal.600", height: 50, minWidth: 170 }, text: { fontWeight: "600" } } }}
                                    onSelect={(option) => { setLab(option.label) }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label mt={7}>Select Test Type</FormControl.Label>
                                <Select
                                    options={testTypes.map(testType => { return { value: testType.id, label: testType.name } })}
                                    clearable={false}
                                    closeOptionsListOnSelect={true}
                                    theme="light"
                                    styles={{ select: { container: { borderColor: "teal.600", height: 50, minWidth: 170 }, text: { fontWeight: "600" } } }}
                                    onSelect={(option) => { setTestType(option.label) }}
                                />
                            </FormControl>
                        </VStack>
                        <Button onPress={() => selectFiles()}
                            mt={10} leftIcon={<Icon as={AntDesign} name="addfile" size="md" />}>
                            Select file
                        </Button>
                        {
                            file ? (
                                <HStack space="xs" justifyContent="center"
                                    alignItems="center" padding={1} mt={3}
                                >
                                    <Button variant="unstyled" _text={{ fontSize: 20, fontWeight: "600" }} rightIcon={<Entypo onPress={() => setFile(undefined)} name="cross" size={26} color="red" />}>{file.name.length <= 16 ? file.name : file.name.slice(0, 16) + "..."}</Button>

                                </HStack>
                            )
                                : undefined
                        }
                        <Button onPress={() => validateAndSubmit()}
                            mt={5} leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />}>
                            Upload
                        </Button>
                    </> : undefined


            }

            {loading && (
                <HStack space={3} justifyContent="center">
                    <Spinner color="teal.600" size={70} />
                </HStack>
            )}

            {/* {error && Toast.show({
                render: () => {
                    return <Box bg="teal.400" px="2" py="1" rounded="sm" mb={5}>
                        {error}
                    </Box>
                }

            })
            } */}
            <Snackbar
                visible={error == null ? false : true}
                onDismiss={() => { setError(null) }}
                duration={2000}
            >
                {error}
            </Snackbar>

        </Center >

    )

}

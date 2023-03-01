import React, { useEffect, useState } from "react";
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

import { Ionicons } from "@expo/vector-icons";
import ComboBox from "../components/ComboBox";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Select } from "@mobile-reality/react-native-select-pro";

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
    const [error, setError] = useState()


    const fetchLabs = async () => {

        var response = null

        try {

            response = await fetch('http://192.168.10.2:5000/api/lab/search', {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${config.AUTH_TOKEN}`
                    , "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })

            response = await response.json()

            if (response.data != null) {

                setLabs(response.data)
                setLoading(false)
            }
            else {
                displayMessage("Lab data not available")
            }


        } catch (error) {

            console.log(error)
            displayMessage("An error occured, Please try again later")
            setLoading(false)

        }

    }

    const fetchTestTypes = async () => {

        var response = null

        try {

            response = await fetch('http://192.168.10.2:5000/api/testtype', {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${config.AUTH_TOKEN}`
                    //, "Content-Type": "application/json"
                },
                //body: JSON.stringify({})
            })

            response = await response.json()

            if (response != null) {

                setTestTypes(response)
                setLoading(false)
            }
            else {
                displayMessage("Test Type data not available")
            }


        } catch (error) {

            console.log(error)
            displayMessage("An error occured, Please try again later")
            setLoading(false)

        }

    }


    useEffect(() => {

        fetchLabs()
        fetchTestTypes()

    }, [])


    // const labs = [
    //     {
    //         id: 0,
    //         name: 'Saifee Hospital',
    //     },
    //     {
    //         id: 1,
    //         name: 'Aga Khan',
    //     },
    //     {
    //         id: 2,
    //         name: 'Dow Lab',
    //     }
    // ]

    // const testTypes = [
    //     {
    //         id: 0,
    //         name: 'Blood Test',
    //     },
    //     {
    //         id: 1,
    //         name: 'ANTI HCV',
    //     },
    //     {
    //         id: 2,
    //         name: 'HBS AG',
    //     }
    // ]

    const selectFiles = async () => {

        try {
            const doc = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });

            if (doc.type == "cancel") {

                console.log("File upload cancelled")

            } else {

                setFile(doc)
                // var fileUri = doc.uri
                // const response = await FileSystem.uploadAsync(`http://10.0.2.2:8000/test`, fileUri, {
                //   fieldName: 'file',
                //   httpMethod: 'POST',
                //   uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                //   headers: { "Content-Type": "multipart/form-data" }
                // });
                // console.log(JSON.stringify(response, null, 4));
            }


        } catch (error) {

            console.log(error)
        }

    }

    return (

        <Center flex={1} >
            {
                labs.length > 0 && testTypes.length > 0 ?
                    <>
                        <VStack px={0}>
                            <FormControl.Label>Select Lab</FormControl.Label>
                            {/* <ComboBox selectProps={{ minWidth: "200" }} getValue={setLab} values={labs} /> */}
                            <Select
                                options={labs.map(lab => { return { value: lab.id, label: lab.name } })}
                                clearable={false}
                                closeOptionsListOnSelect={true}
                                theme="light"
                                styles={{ select: { container: { borderColor: "teal.600", height: 50, minWidth: 170 }, text: { fontWeight: "600" } } }}
                                onSelect={(option) => { setLab(option.value) }}
                            />
                            <FormControl.Label mt={7}>Select Test Type</FormControl.Label>
                            <Select
                                options={testTypes.map(testType => { return { value: testType.id, label: testType.name } })}
                                clearable={false}
                                closeOptionsListOnSelect={true}
                                theme="light"
                                styles={{ select: { container: { borderColor: "teal.600", height: 50, minWidth: 170 }, text: { fontWeight: "600" } } }}
                                onSelect={(option) => { setTestType(option.value) }}
                            />
                            {/* <ComboBox selectProps={{ minWidth: "200" }} getValue={setTestType} values={testTypes} /> */}
                        </VStack>

                        <Button onPress={() => navigation.navigate("Edit Results")}
                            mt={10} leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />}>
                            Upload file
                        </Button>
                        {
                            file ? (
                                <HStack space="sm" justifyItems="center"
                                    alignItems="center" padding={3} mt={3}
                                    style={{ borderColor: "#22A39F", borderWidth: 3, borderRadius: 7 }}  >
                                    <Text fontSize="xl">{file.name}</Text><CloseIcon size={4} onPress={() => { setFile(undefined) }} />
                                </HStack>
                            )
                                : undefined
                        }
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


        </Center >

    )

}

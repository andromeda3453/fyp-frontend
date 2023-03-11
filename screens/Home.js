import React, { useContext, useEffect, useState } from "react";
import {

    VStack,
    Box,
    Pressable,
    Menu,
    HamburgerIcon,
    Center,
    Icon,
    Button

} from "native-base";
import FlatButton from "../components/FlatButton"
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from "react-native";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { AuthContext } from "../components/AuthContext";

export default function Home({ navigation }) {

    const authContext = useContext(AuthContext)

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (

                <Button variant="unstyled"
                    rightIcon={<Ionicons name="exit-outline" size={24} color="white" />}
                    _text={{ color: "white" }}
                    onPress={() => authContext.authFunctions.signOut()}
                >SIGN OUT</Button>

            )
        })

    }, [])

    const selectDoc = async () => {

        // try {
        //   const doc = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        //   if (doc.type == "cancel") {
        //     console.log("File upload cancelled")
        //   } else {

        //     var fileUri = doc.uri
        //     const response = await FileSystem.uploadAsync(`http://10.0.2.2:8000/test`, fileUri, {
        //       fieldName: 'file',
        //       httpMethod: 'POST',
        //       uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        //       headers: { "Content-Type": "multipart/form-data" }
        //     });
        //     console.log(JSON.stringify(response, null, 4));
        //   }


        // } catch (error) {

        //   console.log(error)
        // }


        // fetch('http://192.168.10.2:8000/test', {
        //   method: 'GET',
        //   //Request Type
        // })
        //   .then((response) => response.json())
        //   //If response is in json then in success
        //   .then((responseJson) => {
        //     //Success
        //     console.log(responseJson);
        //   })
        //   //If response is not in json then in error
        //   .catch((error) => {
        //     //Errorr
        //     console.log("hereeee")
        //     console.error(error);
        //   });


    }


    return (

        <Center
            flex={1}
            px={4}
        >
            <VStack space={5} alignItems="center">

                <FlatButton icon={<Icon style={{ textShadowColor: "#C7FFD8", textShadowRadius: 3 }} color="#C7FFD8" as={AntDesign} name="pdffile1" size={35} />} text="Upload a PDF" action={() => { navigation.navigate("Upload PDF") }} />
                {/* <FlatButton text="Upload Pdf" action={() => openModal('CompareAnalyteModal')} /> */}
                <FlatButton icon={<Icon style={{ textShadowColor: "#C7FFD8", textShadowRadius: 3 }} color="#C7FFD8" as={Octicons} name="graph" size={35} />} text="View Graphs" action={() => { navigation.navigate("AnalyteList") }} />
            </VStack>
        </Center>
    );
}

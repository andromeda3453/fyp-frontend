import React, { useState } from "react";
import {

    VStack,
    Box,
    Pressable,
    Menu,
    HamburgerIcon,
    Center

} from "native-base";
import FlatButton from "../components/FlatButton"
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from "react-native";

export default function Home({ navigation }) {

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
                <FlatButton text="Upload Pdf" action={() => { navigation.navigate("Upload PDF") }} />
                {/* <FlatButton text="Upload Pdf" action={() => openModal('CompareAnalyteModal')} /> */}
                <FlatButton text="Show health graphs" action={() => { navigation.navigate("AnalyteList") }} />
            </VStack>
        </Center>
    );
}

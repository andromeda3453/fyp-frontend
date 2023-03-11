import { ScrollView, VStack, Button, Popover, HStack, Box, Center, Text, View, Spinner } from "native-base";
import { useContext, useEffect, useState } from "react";
import FlatButton from "../components/FlatButton";
import { Snackbar } from "react-native-paper";
import Dropdown from "../components/Dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { Select, SelectModalProvider } from "@mobile-reality/react-native-select-pro";
import { Modal, Portal } from 'react-native-paper'
import { useModal } from 'react-native-modalfy'
import * as config from '../config.json'
import { AuthContext } from "../components/AuthContext";



export default function AnalyteList({ navigation }) {

    // const [analytes, setAnalytes] = useState([{ id: 1, name: 'Haemoglobin' }, { id: 2, name: 'M.C.V' }, { id: 3, name: 'Platelets' }, { id: 4, name: 'R.B.C' }])
    const [analytes, setAnalytes] = useState([])
    const { openModal, closeModal } = useModal()
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [buttons, setButtons] = useState([])
    const authContext = useContext(AuthContext)

    // buttons = analytes.map((analyte) => <FlatButton text={analyte.name} key={analyte.id} action={() => navigation.navigate("Graphs", { id: analyte.id })} />)


    // const fetchData = async () => {

    //     var response = null

    //     try {


    //         response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/analyte/search`, {
    //             method: 'post',
    //             headers: {
    //                 'Authorization': `Bearer ${authContext.token}`
    //                 , "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({})
    //         })

    //         response = await response.json()

    //         if (response.data != null) {

    //             setAnalytes(response.data)
    //             setLoading(false)
    //         }
    //         else {
    //             setError("Data not available")
    //             setLoading(false)
    //             setVisible(true)
    //         }


    //     } catch (error) {

    //         console.log(error)
    //         setError("An error occured, Please try again later")
    //         setLoading(false)
    //         setVisible(true)

    //     }

    // }

    useEffect(() => {

        // fetchData()

        if (authContext.analyteData.length > 0) {
            setButtons(authContext.analyteData.map((analyte) => <FlatButton text={toTitleCase(analyte.name)} key={analyte.id} action={() => navigation.navigate("Graphs", { id: analyte.id })} />))

            navigation.setOptions({
                headerRight: () => (

                    <Button
                        size="md"
                        variant='subtle'
                        colorScheme={"gray"}
                        onPress={() => openModal('CompareAnalyteModal', { analytes: analytes })}
                        mr={3}
                    >
                        Compare
                    </Button>

                )
            })
        }


    }, [analytes])

    return (

        <Box>
            <ScrollView w="full" h="full" contentContainerStyle={{ padding: 20 }}>
                <VStack flex={1} space={5}>
                    {/* <FlatButton text={"1"} />
                <FlatButton text={"2"} />
                <FlatButton text={"3"} />
                <FlatButton text={"4"} />
                <FlatButton text={"5"} />
                <FlatButton text={"6"} />
                <FlatButton text={"7"} />
                <FlatButton text={"8"} />
                <FlatButton text={"9"} />
                <FlatButton text={"10"} />
                <FlatButton text={"11"} />
                <FlatButton text={"12"} />
                <FlatButton text={"13"} />
                <FlatButton text={"14"} />
                <FlatButton text={"15"} /> */}
                    {buttons}

                </VStack>
            </ScrollView>
            {loading && (
                <HStack space={3} justifyContent="center">
                    <Spinner color="teal.600" size={70} />
                </HStack>
            )}

            <Snackbar
                visible={visible}
                onDismiss={() => { setVisible(false) }}
                duration={3000}
            >
                {error}
            </Snackbar>
        </Box>
    )

}

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}
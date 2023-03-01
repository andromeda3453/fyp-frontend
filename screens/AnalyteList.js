import { ScrollView, VStack, Button, Popover, NativeBaseProvider, Box, Center, Text, View } from "native-base";
import { useEffect, useState } from "react";
import FlatButton from "../components/FlatButton";
// import { Button } from 'react-native-paper';
import Dropdown from "../components/Dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { Select, SelectModalProvider } from "@mobile-reality/react-native-select-pro";
import { Modal, Portal } from 'react-native-paper'
import { useModal } from 'react-native-modalfy'


export default function AnalyteList({ navigation }) {

    const [analytes, setAnalytes] = useState([{ id: 1, name: 'Haemoglobin' }, { id: 2, name: 'M.C.V' }, { id: 3, name: 'Platelets' }, { id: 4, name: 'R.B.C' }])
    const { openModal, closeModal } = useModal()

    const buttons = analytes.map((analyte) => <FlatButton text={analyte.name} id={analyte.id} action={(id) => console.log()} />)

    useEffect(() => {

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

    }, [analytes])

    return (

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

    )

}
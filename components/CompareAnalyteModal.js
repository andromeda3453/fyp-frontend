import { Select } from "@mobile-reality/react-native-select-pro";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Center, CloseIcon, Divider, HStack, Icon, Text, VStack, useTheme } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function CompareAnalyteModal({ modal: { closeModal, params } }) {


    const { colors } = useTheme()
    const [open, setOpen] = useState(false);
    const [analytes, setAnalytes] = useState(params.analytes ? params.analytes.map(a => { return { label: a.name, value: a.id } }) : [])
    const [value, setValue] = useState([]);

    return (
        <Center px={2} py={4} borderRadius={12} backgroundColor="teal.50">
            <HStack space={2} m={3}>
                <Text fontWeight={"bold"} fontSize={"md"}>Please select atleast 2 analytes to compare</Text>
                <CloseIcon size="5" color="teal.600" onPress={closeModal} />
            </HStack>
            <Divider />
            <VStack m={3} minWidth="80%" maxWidth="80%" space={2}>
                {/* <Select
                    options={params.analytes ? params.analytes.map(a => { return { label: a.name, value: a.id } }) : []}
                    multiple={true}
                    defaultOption={{ label: 'Haemoglobin', value: 1 }}
                    onSelect={option => setAnalytes([...analytes, option.value])}
                    onRemove={option => setAnalytes(analytes.filter(a => a !== option.value))}
                    styles={{
                        select: {
                            multiSelectedOption: {
                                container: {
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: colors['teal'][200],
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",


                                },
                                text: {
                                    fontSize: 15,
                                    fontWeight: "600"
                                }
                            }
                        }
                    }}
                /> */}
                <DropDownPicker
                    open={open}
                    items={analytes}
                    setOpen={setOpen}
                    setItems={setAnalytes}
                    setValue={setValue}
                    multiple={true}
                    min={2}
                    max={3}
                />
                <Button rightIcon={<Icon as={MaterialCommunityIcons} name="compare-horizontal" size="md" />} colorScheme="teal">
                    Compare
                </Button>
            </VStack>
        </Center>
    )

}

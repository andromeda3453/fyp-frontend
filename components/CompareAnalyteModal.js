import { Select } from "@mobile-reality/react-native-select-pro";
import { Button, Center, CloseIcon, Divider, HStack, Icon, Text, VStack, useTheme, Input } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CompareAnalyteModal({ modal: { closeModal, params } }) {


    const { colors } = useTheme()
    const [analytes, setAnalytes] = useState([])
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);


    return (
        <Center px={2} py={4} borderRadius={12} backgroundColor="teal.50">
            <HStack space={2} m={3}>
                <Text fontWeight={"bold"} fontSize={"md"}>Please select atleast 2 analytes to compare</Text>
                <CloseIcon size="5" color="teal.600" onPress={closeModal} />
            </HStack>
            <Divider />
            <VStack m={3} minWidth="80%" maxWidth="80%" space={2}>

                {/* Dropdown to select analytes */}
                <Select
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
                                    backgroundColor: colors['teal'][600],
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 0

                                },
                                text: {
                                    fontSize: 15,
                                    fontWeight: "400",
                                    color: "#FFFFFF"
                                }
                            }
                        }
                    }}
                />

                {/* Date Modals */}
                <DateTimePickerModal
                    isVisible={endOpen}
                    mode="date"
                    onConfirm={(date) => {
                        setEndOpen(false)
                        setRange({
                            ...range,
                            endDate: date
                        })
                    }}
                    onCancel={() => setEndOpen(false)}
                />
                <DateTimePickerModal
                    isVisible={startOpen}
                    mode="date"
                    onConfirm={(date) => {
                        setStartOpen(false)
                        setRange({
                            ...range,
                            startDate: date
                        })
                    }}
                    onCancel={() => setStartOpen(false)}
                />

                {/* Date Modal Buttons */}
                <HStack space={2}>
                    <Button
                        onPress={() => setStartOpen(true)}
                        colorScheme="teal"
                        leftIcon={<Icon as={MaterialCommunityIcons} name="calendar" size="md" />}
                    >
                        From
                    </Button>
                    {/* <Text>{range.startDate ? range.startDate.toDateString() : undefined}</Text> */}
                    <Input width={"70%"}
                        value={range.startDate ? range.startDate.toDateString() : undefined}
                        isReadOnly style={{ textAlign: "center" }}
                    />
                </HStack>
                <HStack space={2}>
                    <Button
                        onPress={() => setEndOpen(true)}
                        colorScheme="teal"
                        leftIcon={<Icon as={MaterialCommunityIcons} name="calendar" size="md" />}
                    >
                        To
                    </Button>
                    {/* <Text bg="red">{range.endDate ? range.endDate.toDateString() : undefined}</Text> */}
                    <Input width={"70%"}
                        value={range.endDate ? range.endDate.toDateString() : undefined}
                        isReadOnly style={{ textAlign: "center" }}
                    />
                </HStack>

                {/* Submit Button */}
                <Button
                    onPress={() => console.log(analytes)}
                    rightIcon={<Icon as={MaterialCommunityIcons} name="compare-horizontal" size="md" />} colorScheme="teal"
                >
                    Compare
                </Button>
            </VStack>
        </Center>
    )

}

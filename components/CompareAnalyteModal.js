import { Select } from "@mobile-reality/react-native-select-pro";
import { Button, Center, CloseIcon, Divider, HStack, Icon, Text, VStack, useTheme, Input } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Pressable } from "react-native";

export default function CompareAnalyteModal({ modal: { closeModal, params } }) {


    const { colors } = useTheme()
    const [analytes, setAnalytes] = useState([])
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);


    // const validate = () => {



    // }


    return (
        <Center px={2} py={4} borderRadius={12} backgroundColor="#161D6F">
            <HStack space={2} m={3}>
                <Text fontWeight={"bold"} fontSize={20} color="#C7FFD8">Please select atleast 2 analytes to compare</Text>
                <CloseIcon size="5" color="#C7FFD8" onPress={closeModal} />
            </HStack>
            <Divider style={{ backgroundColor: "#C7FFD8" }} />
            <VStack m={3} minWidth="80%" maxWidth="80%" space={2}>

                {/* Dropdown to select analytes */}
                <Select
                    options={params.analytes ? params.analytes.map(a => { return { label: toTitleCase(a.name), value: a.id } }) : []}
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
                <Pressable onPress={() => setStartOpen(true)}>
                    <HStack space={4}>
                        <HStack space={2} justifyContent="center" alignItems="center">
                            <Icon style={{ textShadowColor: "#C7FFD8", textShadowRadius: 3 }} color="#C7FFD8" as={MaterialCommunityIcons} name="calendar" size="md" />
                            <Text color={"#C7FFD8"}>From</Text>
                        </HStack>
                        <Input width={"70%"}
                            value={range.startDate ? range.startDate.toDateString() : undefined}
                            isReadOnly style={{ textAlign: "center" }}
                            color="#C7FFD8"
                        />
                    </HStack>
                </Pressable>
                <Pressable onPress={() => setEndOpen(true)}>
                    <HStack space={8}>
                        <HStack space={2} justifyContent="center" alignItems="center">
                            <Icon style={{ textShadowColor: "#C7FFD8", textShadowRadius: 3 }} color="#C7FFD8" as={MaterialCommunityIcons} name="calendar" size="md" />
                            <Text color={"#C7FFD8"}>To</Text>
                        </HStack>
                        <Input width={"70%"}
                            value={range.endDate ? range.endDate.toDateString() : undefined}
                            isReadOnly style={{ textAlign: "center" }}
                            color="#C7FFD8"
                        />
                    </HStack>
                </Pressable>

                {/* Submit Button */}
                <Button
                    onPress={() => validate()}
                    rightIcon={<Icon style={{ textShadowColor: "#C7FFD8", textShadowRadius: 3 }} color="#C7FFD8" as={MaterialCommunityIcons} name="compare-horizontal" size="md" />}
                    variant="outline"
                    _text={{ color: "#C7FFD8" }}
                >
                    Compare
                </Button>
            </VStack>
        </Center>
    )

}

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}
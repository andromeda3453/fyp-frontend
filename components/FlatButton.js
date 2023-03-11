import {
    Text,
    Box,
    Pressable,
    HStack,
    Icon,

} from "native-base";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function FlatButton({ text, action, buttonId, icon }) {

    return <Pressable onPress={action} >
        <Box alignItems="center" style={{
            backgroundColor: "#161D6F", paddingHorizontal: 25, paddingVertical: 30, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.32,
            shadowRadius: 2,
            elevation: 9,
            shadowOffset: { height: 1 }
        }}>
            {/* {({
                isPressed
            }) => {
                return <Box bg={isPressed ? "#1F918E" : "#22A39F"} p="5" rounded="8" shadow={0.7} borderWidth="0.5" borderColor="coolGray.300">

                    <Text color={isPressed ? "#E6E2D3" : "#F3EFE0"} m="3" fontWeight="bold" fontSize="2xl">
                        {text}
                    </Text>
                </Box>;
            }} */}
            <HStack space={2} alignItems="center" >
                {icon &&
                    <Box alignItems="center" justifyContent="center" h={10} w={10} >
                        {icon}
                    </Box>
                }
                <Text style={{ textShadowColor: "#C7FFD8", textShadowRadius: 5, fontWeight: "600", }} fontSize={25} color="#C7FFD8">{text}</Text>
            </HStack>
        </Box>
    </Pressable>;

}



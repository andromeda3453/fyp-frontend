import {
    Text,
    Box,
    Pressable,

} from "native-base";
import { useState } from "react";


export default function FlatButton({ text, action, buttonId }) {

    return <Box alignItems="center">
        <Pressable onPress={action} >
            {({
                isPressed
            }) => {
                return <Box bg={isPressed ? "#1F918E" : "#22A39F"} p="5" rounded="8" shadow={0.7} borderWidth="0.5" borderColor="coolGray.300">

                    <Text color={isPressed ? "#E6E2D3" : "#F3EFE0"} m="3" fontWeight="bold" fontSize="2xl">
                        {text}
                    </Text>
                </Box>;
            }}
        </Pressable>
    </Box>;

}



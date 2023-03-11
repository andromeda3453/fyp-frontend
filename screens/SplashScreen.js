import { Button, NativeBaseProvider, Text } from "native-base";


export default function SplashScreen() {

    return (
        <NativeBaseProvider>
            <Text>
                This is the loading screen
            </Text>
        </NativeBaseProvider>
    )
}
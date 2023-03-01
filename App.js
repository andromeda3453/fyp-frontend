import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import { ModalProvider, createModalStack } from 'react-native-modalfy'

import Home from "./screens/Home";
import UploadPDF from "./screens/UploadPDF";
import EditResults from "./screens/EditResults";
import Graphs from './screens/Graphs';
import AnalyteList from './screens/AnalyteList';
import { Button } from 'native-base';
import CompareAnalyteModal from "./components/CompareAnalyteModal";


const MainStack = createNativeStackNavigator();
const modalStack = createModalStack({ CompareAnalyteModal })



export default function App() {
  return (
    <NativeBaseProvider>
      <SelectProvider>
        <ModalProvider stack={modalStack}>
          <NavigationContainer>
            <MainStack.Navigator
              screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: '#22A39F' },
                headerTitleStyle: { color: "#F3EFE0" }
              }}
              initialRouteName="Home"
            >
              <MainStack.Screen name="Home" component={Home} />
              <MainStack.Screen name="Upload PDF" component={UploadPDF} />
              <MainStack.Screen name="Edit Results" component={EditResults} />
              <MainStack.Screen name="Graphs" component={Graphs} />
              <MainStack.Screen name="AnalyteList"
                component={AnalyteList}
                options={{
                  headerRight: () => (
                    <Button
                      size="md"
                      variant='ghost'
                    >
                      Compare
                    </Button>
                  )
                }}
              />

            </MainStack.Navigator>
          </NavigationContainer>
        </ModalProvider>
      </SelectProvider>
    </NativeBaseProvider>
  );
};


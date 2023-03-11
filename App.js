import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import { ModalProvider, createModalStack } from 'react-native-modalfy'
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Home from "./screens/Home";
import UploadPDF from "./screens/UploadPDF";
import EditResults from "./screens/EditResults";
import Graphs from './screens/Graphs';
import AnalyteList from './screens/AnalyteList';
import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";
import Signup from "./screens/Signup";

import { Button } from 'native-base';
import CompareAnalyteModal from "./components/CompareAnalyteModal";
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { AuthContext } from "./components/AuthContext";
import * as config from './config.json'

const MainStack = createNativeStackNavigator();
const modalStack = createModalStack({ CompareAnalyteModal })

const bgTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#e8e8e8',
  },
};

// export const AuthContext = createContext();

export default function App() {

  // const authContext = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)
  const [analyteData, setAnalyteData] = useState(null)

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            // isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            // isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            // isSignout: true,
            userToken: null,
          };
      }
    },
    {
      // isLoading: true,
      // isSignout: false,
      userToken: null,
    }
  );


  useEffect(() => {
    const bootstrapAsync = async () => {
      let uToken;
      try {

        uToken = await SecureStore.getItemAsync('userToken');
        if (uToken) {
          uToken = JSON.parse(uToken)
          const expiryTime = new Date(uToken.refreshTokenExpiryTime).toDateString()

          if (new Date(Date.now()).toDateString() == expiryTime) {
            setUserToken(null)

          } else {
            console.log(1, uToken.token);
            var token = await authContext.refresh()
            if (token) {
              var analyteData = await fetchAnalyteData(token)
              if (!analyteData.error) {
                setAnalyteData(analyteData)

              } else {
                setUserToken(null)

              }
            }


          }

        } else {

          setUserToken(null)
        }

        setIsLoading(false)
      } catch (e) {
        // Restoring token failed
      }

    }
    bootstrapAsync();
  }, []);


  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {

        var result = {}
        try {

          var response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/tokens`, {
            method: 'post',
            headers: {
              'tenant': `root`
              , "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "email": `${email}`,
              "password": `${password}`
            })
          })

          response = await response.json()

          if (response) {

            if (response.statusCode == 401) {

              if (response.exception == "Provided Credentials are invalid.") {
                result.error = "Incorrect Password"
              } else if (response.exception == "Authentication Failed.") {
                result.error = "User with email does not exist"
              }

            } else if (response.token) {

              // dispatch({ type: 'SIGN_IN', token: response.token });
              var analyteData = await fetchAnalyteData(response.token)
              if (!analyteData.error) {
                setAnalyteData(analyteData)
                setUserToken(response.token)
                await SecureStore.setItemAsync("userToken", JSON.stringify(response))

              } else {
                result.error = "Error loading data. Please try again"
                console.log("here error")

              }

            }

          }


        } catch (error) {
          console.log(error)
          result.error = "A network error occurred. Please try again"
        }

        return result

      },
      refresh: async () => {
        try {
          let userToken = await SecureStore.getItemAsync('userToken');
          userToken = JSON.parse(userToken)
          var response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/tokens/refresh`, {
            method: 'post',
            headers: {
              'tenant': 'root'
              , "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "token": userToken.token,
              "refreshToken": userToken.refreshToken
            })
          })
          if (response) {
            response = await response.json()

            if (response.token) {
              console.log(2, response.token);
              await SecureStore.setItemAsync("userToken", JSON.stringify(response))
              setUserToken(response.token)
              return response.token
            } else if (response.exception) {

              setUserToken(null)
              return null

            }

          }



        } catch (error) {

          console.log(error)

        }

      },
      signOut: async () => {

        try {
          setUserToken(null)
          await SecureStore.deleteItemAsync("userToken")
        } catch (error) {

        }

      },
      signUp: async (email, password, userName, phoneNumber, firstName, lastName) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        var result = {}
        try {

          var response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/users/self-register`, {
            method: 'post',
            headers: {
              'tenant': `root`
              , "Content-Type": "application/json"
            },
            body: JSON.stringify({

              "firstName": `${firstName}`,
              "lastName": `${lastName}`,
              "email": `${email}`,
              "userName": `${userName}`,
              "password": `${password}`,
              "confirmPassword": `${password}`,
              "phoneNumber": `${phoneNumber}`
            })
          })


          if (response) {

            const t = await response.clone()

            if (!t.text().then((text) => { return text.includes("verify your account!") })) {

              response = await response.json()

              if (response.status == 400) {

                result.error = response.errors

              }
            }
            else {

              result = "Account created successfuly. Please login"

            }

          }


        } catch (error) {
          console.log(error)
          result.error = "A network error occurred. Please try again"
        }

        return result

      },
    }),
    []
  );


  const fetchAnalyteData = async (token) => {

    var response = null
    try {


      response = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/api/analyte/search`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`
          , "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      })

      response = await response.json()

      if (response.data != null) {
        return response.data
      }
      else {
        return { error: "Data not found" }
      }


    } catch (error) {

      console.log(error)
      return { error: "Data not found" }

    }

  }



  if (isLoading) {
    return (
      <SplashScreen />
    )
  } else {


    return (
      <AuthContext.Provider value={{ authFunctions: authContext, token: userToken, analyteData: analyteData }}>
        {/* <AuthContext.Provider value={{ token: 1 }}> */}
        <NativeBaseProvider>
          <SelectProvider>
            <ModalProvider stack={modalStack}>
              <NavigationContainer theme={bgTheme}>
                <MainStack.Navigator
                  screenOptions={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#161D6F' },
                    headerTitleStyle: { color: "#C7FFD8" }
                  }}
                  initialRouteName={userToken == null ? "Login" : "Home"}
                >
                  {userToken != null ? (
                    <>
                      <MainStack.Screen name="Home" component={Home}
                        options={{
                          headerRight: () => (
                            <Button variant="unstyled" rightIcon={<Ionicons name="exit-outline" size={24} color="white" />}>Sign Out</Button>
                          )
                        }} />
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
                    </>) :
                    <>
                      <MainStack.Screen name="Login" component={Login} />
                      <MainStack.Screen name="Signup" component={Signup} />
                    </>
                  }
                </MainStack.Navigator>
              </NavigationContainer>
            </ModalProvider>
          </SelectProvider>
        </NativeBaseProvider>
      </AuthContext.Provider>
    );
  }
};


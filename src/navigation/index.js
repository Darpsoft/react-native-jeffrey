import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Paragraph, useTheme } from "react-native-paper";
import "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import { updateReduxAuthStart } from "@redux/actions";
import { customUseReducer } from "@utils/customHooks";
import { storage } from "../../index";

import Icon from "react-native-vector-icons/FontAwesome";

var { height } = Dimensions.get("window");
// Auth
import Home from "@screens/Home";
import Setting from "@screens/Setting";

// Inicio
import Login from "@screens/Login";
import Register from "@screens/Register";

// SplashScreen
import SplashScreen from "@components/SplashScreen";
import { throttle } from "lodash";
import { database } from "@database";

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const UserStackScreen = () => {
  const theme = useTheme();
  const iconProps = { size: 28, style: { marginBottom: -6 } };
  const labelProps = { fontSize: 13, marginBottom: 6 };

  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: "Home",
        activeTintColor: theme.colors.accent,
        inactiveTintColor: theme.colors.inactiveS,
        allowFontScaling: false,
        style: {
          backgroundColor: theme.colors.surfaceTop,
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
          overflow: "hidden",
          position: "absolute",
          height: height / 12.8,
        },
      }}
    >
      <Tab.Screen
        name="bookings"
        component={Home}
        options={{
          tabBarLabel: ({ color }) => <Paragraph style={[{ color: color }, labelProps]}>Reservaciones</Paragraph>,
          tabBarIcon: ({ color }) => <Icon name="home" color={color} {...iconProps} />,
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarLabel: ({ color }) => <Paragraph style={[{ color: color }, labelProps]}>Configuración</Paragraph>,
          tabBarIcon: ({ color }) => <Icon name="cog" color={color} {...iconProps} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}

export const Root = ({ loading }) => {
  const { auth } = useSelector((store) => store);
  if (loading) {
    return <SplashScreen />; // OPTIONAL: Aquí podría estar el SplashScreen (Donde se tenga que cargar algo) **(Opcional)
  }
  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      headerMode="none"
      mode="card"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {auth?.tokenUser === null ? (
        <>
          <RootStack.Screen name="AuthStack" component={AuthStackScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name="UserStack" component={UserStackScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

const initialState = {
  loading: true,
};

export default AppCreate = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [state, dispatchComponent] = customUseReducer(initialState);

  useEffect(() => {
    initialRequest();
    suscribeStorage();
  }, []);

  const initialRequest = async () => {
    return new Promise((resolve, reject) => {
      dispatch(updateReduxAuthStart({ resolve, reject }));
    })
      .then((res) => {
        console.log(res);
        dispatchComponent({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        dispatchComponent({ loading: false });
      });
  };

  /**
   * Función para guardar los datos cuando se actualice el Storage, en este caso solo guardará <user, auth>
   */
  const suscribeStorage = () => {
    storage.subscribe(
      throttle(() => {
        const { auth } = storage.getState();
        database.auth.set(auth, "object");
      }, 200)
    );
  };
  return (
    <NavigationContainer theme={theme}>
      <Root loading={state.loading} />
    </NavigationContainer>
  );
};

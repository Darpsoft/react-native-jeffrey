import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import App from "./src/navigation";
import { name as appName } from "./app.json";

import { Provider as PaperProvider } from "react-native-paper";
import { changeTheme } from "./src/assets/styles/themes";

import { Provider, useSelector } from "react-redux";
import reduxStore from "./src/redux";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";

export const storage = reduxStore();

const WithPaper = () => {
  const { theme } = useSelector(({ settings }) => settings);
  return (
    <PaperProvider
      settings={{
        icon: (props) => <AwesomeIcon {...props} />,
      }}
      theme={changeTheme(theme)}
    >
      <App />
    </PaperProvider>
  );
};

function Main() {
  useEffect(() => {
    console.log("Versión 0.0.1");
  }, []);

  return (
    <Provider store={storage}>
      <WithPaper />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

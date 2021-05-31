import { StyleSheet, Dimensions } from "react-native";
var { width, height } = Dimensions.get("window");

export const useStyleUniversal = (theme) => {
  return StyleSheet.create({
    containers: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

import React from "react";
import { StyleSheet, TextInput as Input } from "react-native";
import { TextInput as TextInputPaper, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

export const TextInput = (props) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return <TextInputPaper {...props} render={(props) => <Input {...props} />} />;
};

const useStyle = (theme) => StyleSheet.create({});

export default TextInput;

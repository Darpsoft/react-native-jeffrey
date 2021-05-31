import React from "react";
import { StyleSheet } from "react-native";
import { Text as TextPaper, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

export const Text = (props) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return <TextPaper {...props} />;
};

const useStyle = (theme) => StyleSheet.create({});

export default Text;

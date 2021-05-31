import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

const Register = () => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return (
    <View style={styles.containers}>
      <Text>Hello world</Text>
    </View>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default Register;

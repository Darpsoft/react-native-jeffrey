import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

export const SplashScreen = () => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return (
    <View style={styles.containers}>
      <ActivityIndicator size="large" />
      <Text>Cargando datos...</Text>
    </View>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default SplashScreen;

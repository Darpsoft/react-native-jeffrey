import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";

export const Wrapper = ({ children, style, scrollview = true }) => {
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  return (
    <View style={[styles.containerWrapper, style]}>
      {scrollview && <ScrollView contentContainerStyle={styles.containerScrollView}>{children}</ScrollView>}
      {!scrollview && <View style={styles.containerScrollView}>{children}</View>}
    </View>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    containerWrapper: {
      flex: 1,
    },
    containerScrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });

export default Wrapper;

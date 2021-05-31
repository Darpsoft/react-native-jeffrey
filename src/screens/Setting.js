import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import { signOutSuccess } from "@redux/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };

  const signOut = () => {
    dispatch(signOutSuccess());
  };

  return (
    <View style={styles.containers}>
      <Button mode="contained" onPress={signOut}>
        Cerrar sesión
      </Button>
    </View>
  );
};

const useStyle = (theme) => StyleSheet.create({});

export default Home;

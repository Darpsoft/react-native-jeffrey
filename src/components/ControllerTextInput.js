import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export const ControllerTextInput = (props) => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Controller {...props} />
      {props.errors[props.name] && (
        <Text style={{ color: "red" }}>
          {props.errors[props.name].type === "validate" && !!props.validateMessageError ? props.validateMessageError : props.errors[props.name].message}
        </Text>
      )}
    </View>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 16,
    },
  });
export default ControllerTextInput;

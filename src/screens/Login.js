import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useStyleUniversal } from "@assets/styles/styles";
import { Wrapper, Text } from "@components/index";
import { useDispatch } from "react-redux";
import { loginStart } from "@redux/actions";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

const getInputsForm = () => {
  return [
    {
      status: true,
      label: "Correo Electronico",
      placeholder: "Ingrese un correo electronico",
      name: "email",
      defaultValue: "testapis@tuten.cl",
      // rules: { required: { value: true, message: "Debes escribir un número telefonico" } },
    },
    {
      status: true,
      label: "Contraseña",
      placeholder: "La contraseña es 1234",
      name: "password",
      defaultValue: "",
      secureTextEntry: true,
      // rules: { required: { value: true, message: "Debe escribir una contraseña" } },
    },
  ];
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Debes escribir su correo electronico";
  }
  if (!values.password) {
    errors.password = "Debe escribir una contraseña";
  }
  return errors;
};

const Login = () => {
  const { settings } = useSelector((store) => store);
  const theme = useTheme();
  const styles = { ...useStyle(theme), ...useStyleUniversal(theme) };
  const inputsForm = useMemo(() => getInputsForm(), []);
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    dispatch(loginStart(values));
  };

  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/logo-tutenlabs.png")} style={{ resizeMode: "cover" }} />
          <Text style={styles.title}>Bienvenido</Text>
        </View>
        <Form
          onSubmit={handleRegister}
          validate={validate}
          render={({ handleSubmit }) => (
            <>
              {inputsForm
                .filter((input) => input.status)
                .map((inputForm, key) => (
                  <Field
                    {...inputForm}
                    key={key}
                    render={({ input, meta }) => {
                      return (
                        <>
                          <TextInput {...inputForm} {...input} style={styles.input} />
                          {meta.error && meta.touched && <Text>{meta.error}</Text>}
                        </>
                      );
                    }}
                  />
                ))}
              <Button mode="outlined" style={styles.button} loading={settings.loader} disabled={settings.loader} onPress={handleSubmit}>
                Iniciar Sesión
              </Button>
            </>
          )}
        />
      </View>
    </Wrapper>
  );
};

const useStyle = (theme) =>
  StyleSheet.create({
    title: {
      marginVertical: 16,
    },
    input: {
      marginVertical: 8,
    },
    button: {
      marginVertical: 8,
    },
  });

export default Login;

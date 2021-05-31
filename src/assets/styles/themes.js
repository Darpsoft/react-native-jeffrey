import { DarkTheme, DefaultTheme } from "react-native-paper";

const codGray900 = "#090909"; // 900
const codGray800 = "#121212"; // 800
const codGray700 = "#1a1a1a"; // 700
const codGray600 = "#1f1e1e"; // 600
const codGray500 = "#434343"; // 500
const codGray400 = "#595959"; // 400
const codGray200 = "#696969"; // 200
const codGray90 = "#828282"; // 90
const codGray70 = "#a7a7a7"; // 70
const codGray50 = "#c0c0c0"; // 50
const codGray30 = "#d9d9d9"; // 30
const codGray20 = "#e6e6e6"; // 30
const codGray10 = "#f2f2f2"; // 10
const codGray5 = "#f0f0f0"; // 5

const customDark = {
  background: "#141212",
  textSecondary: codGray70,
  inactive: "#302e2e",
  inactiveS: codGray400,
  surfaceTop: "#2b2929",
  surfaceNav: "#201e1e",
  surface: "#201e1e",
  shadows: "rgba(16, 15, 15, 0.5)",
  titleChange: "#302e2e",
  textChange: "#8f9599",
  text: codGray20,
  onBackground: codGray20,
  onSurface: codGray20,
};

const customBright = {
  // backgroundColor: '#fcfcfc',
  textSecondary: "#8f9599",
  inactive: "#C6C9CC",
  inactiveS: "#ACB7BF",
  text: "#302e2e",
  surface: "#fafafa",
  surfaceNav: "#fff",
  surfaceTop: "#fff",
  onBackground: "#2e3135",
  onSurface: "#2e3135",
  shadows: codGray10,
  titleChange: "white",
  textChange: codGray10,
};

export const changeTheme = (selectedTheme) => {
  const theme = selectedTheme ? DarkTheme : DefaultTheme;
  const customs = selectedTheme ? customDark : customBright;
  const themes = {
    ...theme,
    roundness: 5,
    colors: {
      ...theme.colors,
      primary: "#201e1e",
      border: "transparent",
      accent: "#EB6547",
      ...customs,
    },
  };

  return themes;
};

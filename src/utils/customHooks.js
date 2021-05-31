const { useReducer } = require("react");

export const reducer = (state, action) => {
  switch (typeof action) {
    case "function":
      return { ...state, ...action(state) };
    default:
      return { ...state, ...action };
  }
};

export const customUseReducer = (initialState) => {
  return useReducer(reducer, initialState);
};

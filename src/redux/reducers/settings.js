import { HIDE_LOADER, SHOW_LOADER } from "../constants";

const initialStateSettings = {
  loader: false,
  theme: false, // false = Modo normal, true = Modo noche o modo oscuro
};

export function settingsReducer(state = initialStateSettings, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    default:
      return state;
  }
}

export default settingsReducer;

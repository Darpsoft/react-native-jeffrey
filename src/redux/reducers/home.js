import { REQUEST_HOME_SUCCESS } from "../constants";

const initialState = {
  data: [],
  filter: {},
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HOME_SUCCESS:
      return { ...state, data: action.payload.data, filter: action.payload.filter ?? {} };
    default:
      return state;
  }
}

export const globalReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

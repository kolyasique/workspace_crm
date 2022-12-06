export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, user: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

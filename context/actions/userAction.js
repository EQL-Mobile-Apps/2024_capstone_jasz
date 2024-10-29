// userAction.js

// Action Types
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

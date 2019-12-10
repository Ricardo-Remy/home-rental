import axios from 'axios';
import { Record } from 'immutable';
import setToken from '../utils/setToken';
/**
 * Constans
 * */

export const moduleName = 'auth';
export const REGISTRATION_SUCCESS = `${moduleName}/REGISTRATION_SUCCESS`;
export const USER_LOADED = `${moduleName}/USER_LOADED`;
export const REGISTRATION_FAIL = `${moduleName}/REGISTRATION_FAIL`;
export const AUTH_ERROR = `${moduleName}/AUTH_ERROR`;
export const LOGIN_SUCCESS = `${moduleName}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${moduleName}/LOGIN_FAIL`;
export const LOGOUT = `${moduleName}/LOGOUT`;
export const CLEAR_PROFILE = `${moduleName}/CLEAR_PROFILE`;
export const ACCOUNT_DELETED = `${moduleName}/ACCOUNT_DELETED`;

/**
 * Reducer
 * */
const ReducerState = Record({
  token: localStorage.getItem('token'),
  isUserAuthenticated: null,
  user: null,
  isloading: true,
});

export const authState = new ReducerState();

export default function reducer(state = authState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isUserAuthenticated: true,
        isloading: false,
        user: payload,
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isUserAuthenticated: true,
      };
    case REGISTRATION_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isUserAuthenticated: false,
      };
    default:
      return state;
  }
}

/**
 * Action Creators
 */

// load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// User login
export const userLogin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
      'Access-Control-Allow-Origin': 'http://localhost:5000',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      console.log(errors);
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Signup User
export const userRegister = ({
  firstName,
  lastName,
  email,
  password,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
      'Access-Control-Allow-Origin': 'http://localhost:5000',
    },
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    const res = await axios.post('api/users', body, config);

    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(console.log(error.msg)));
    }

    dispatch({
      type: REGISTRATION_FAIL,
    });
  }
};

// Logout / Clear Profile
export const userLogout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

import axios from 'axios';
import { setAuthFail, setAuthRequest, setAuthSuccess, setLogOutSuccess } from '../reducers/userSlice';

// Login Action

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(setAuthRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v2/login`,
            { email, password },
            config
        )

        dispatch(setAuthSuccess(data));
    } catch (error) {
        dispatch(setAuthFail(error.response.data.message))
    }
}

// Logout user

export const logout = () => async (dispatch) => {
    try {

        const url = `/api/v2/logout`;
        await axios.get(url);

        dispatch(setLogOutSuccess());
    } catch (error) {
        dispatch(setAuthFail(error.response.data.message));
    }
}

// Register Action.

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(setAuthRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `/api/v2/registration`, userData, config
        )

        console.log(data);

        dispatch(setAuthSuccess(data));

    } catch (error) {
        dispatch(setAuthFail(error.response.data.message));
    }
}

// Load user action

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(setAuthRequest());

        const url = `/api/v2/me`;
        const { data } = await axios.get(url);

        dispatch(setAuthSuccess(data));

    } catch (error) {
        dispatch(setAuthFail(error.response.data.message));
    }
}

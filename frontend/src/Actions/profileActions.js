import axios from 'axios';
import { setUpdateFail, setUpdateRequest, setUpdateReset, setUpdateSuccess } from '../reducers/profileSlice';

// update profile

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(setUpdateRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v2/me/update/info`, userData, config);

        dispatch(setUpdateSuccess(data.success));
    } catch (error) {
        dispatch(setUpdateFail(error.response.data.message))
    }
}

// update password

export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch(setUpdateRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v2/me/update`, password, config);

        dispatch(setUpdateSuccess(data.success));
    } catch (error) {
        dispatch(setUpdateFail(error.response.data.message));
    }
}
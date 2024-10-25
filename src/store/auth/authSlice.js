import { createSlice } from '@reduxjs/toolkit';

export const   authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state,{payload}) => {
            state.status = 'autheticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state,{payload}) => {
            state.status = 'not-autheticated';
            state.user = {};
            state.errorMessage =  undefined ;
        },
        onErrorLogin: (state,{payload = "Error en login y/o Registro"}) => {
            state.status = 'not-autheticated';
            state.user = {};
            state.errorMessage =  payload ;
        },
        onDeleteMessage: (state,{payload}) => {
            state.status = 'not-autheticated';
            state.user = {};
            state.errorMessage = undefined;
        },
    }
});



export const { onChecking, onLogin, onLogout,onDeleteMessage,onErrorLogin } = authSlice.actions;
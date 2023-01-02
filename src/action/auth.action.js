import {authConstants} from "./constants";
import axios from "axios";
import axiosInstance from "../helpers/axios";
export const login = (user)=>{
    return async (dispatch)=>{

        dispatch({type:authConstants.LOGIN_REQUEST})
        const res = await axiosInstance.post(`/admin/signin`,{
            ...user
        });

        if (res.status === 200){
            const {token,user} = res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else {
            if (res.status === 400){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error:res.data.error}
                })
            }
        }
    }


}



export function isUserLoggedIn(){
    return async dispatch =>{
        const token = localStorage.getItem('token')
        if (token){
           const user = JSON.parse(localStorage.getItem('user'));
           dispatch({
               type:authConstants.LOGIN_SUCCESS,
               payload:{
                   token,user
               }
           })
        }else {
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{error:'Failed to login'}
            })
        }
    }
}

export function signout(){

    return async dispatch =>{

        dispatch({type:authConstants.LOGOUT_REQUEST})
        const res = await axiosInstance.post('/admin/signout');
        if (res.status === 200){
            localStorage.clear();
            dispatch({
                type:authConstants.LOGOUT_SUCCESS
            })
        }
        else{
            dispatch({
                type:authConstants.LOGOUT_FAILURE,
                payload:{error:res.data.error}
            })
        }

    }
}



import axiosInstance from "../helpers/axios";
import {orderConstants} from "./constants";


export const getCustomerOrders=()=>{
    return async  dispatch=>{
        dispatch({type:orderConstants.GET_CUSTOMER_ORDER_REQUEST});
        try{
            const res = await axiosInstance.post('/order/getCustomerOrders');
            if (res.status === 200){
                const {orders} = res.data;
                dispatch({
                    type:orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                    payload:{orders}
                })
            }else{
                const {error} = res.data;
                dispatch({
                    type:orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                    payload:{error}
                })
            }
        }catch (error){
            console.log(error)
        }
    }
}


export const updateOrder=(payload)=>{
    return async dispatch=>{
        dispatch({type:orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST})
        try{
            const res = await axiosInstance.post('/order/update',payload);
            console.log(res)
            if (res.status === 201){
                dispatch({
                    type:orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS
                });
                dispatch(getCustomerOrders());
            }else{
                const {error} = res.data
                dispatch({
                    type:orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
                    payload:{error}
                })
            }
        }catch (error){
            console.log(error)
        }
    }

}

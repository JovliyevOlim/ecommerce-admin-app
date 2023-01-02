import authReducer from "./auth.reducers";
import userReducer from "./user.reducer"
import orderReducer from "./order.reducer"
import productReducer from "./product.reducer"
import categoryReducer from "./category.reducer"
import pageReducer from './page.reducer'
import {combineReducers} from "redux";

const rootReducer =  combineReducers({
    auth:authReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer,
    page:pageReducer
})

export default rootReducer;

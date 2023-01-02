import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Layout from "./components/Layout";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategory, getInitialData, isUserLoggedIn} from "./action";
import Index from "./containers/Product";
import Product from "./containers/Product";
import Order from "./containers/Order";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";

function App() {

    const  dispatch = useDispatch()
    const  auth = useSelector(state => state.auth)

    useEffect(()=>{
        if (!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
        if (auth.authenticate){
            dispatch(getInitialData())
        }

    },[auth.authenticate])

  return (
    <div>
          <Routes>
              <Route path='/'  element={<PrivateRoute/>}>
                  <Route path='/' exact={true} element={<Home/>}/>
                  <Route path='/page'  element={<NewPage/>}/>
                  <Route path='/category' element={<Category/>}/>
                  <Route path='/products'  element={<Product/>}/>
                  <Route path='/orders'  element={<Order/>}/>
              </Route>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/signup' element={<Signup/>}/>
          </Routes>
    </div>
  );
}

export default App;

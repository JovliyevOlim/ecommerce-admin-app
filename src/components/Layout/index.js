import React, {useState} from 'react';
import Header from "../Header";
import {Col, Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import './style.css'

function Layout(props) {

    const [classter,setClasster] = useState('')

    return (
        <>
            <Header/>
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className={'sidebar'}>
                                <ul>
                                    <li className={'link'}><NavLink exact to={'/'}>Home</NavLink></li>
                                    <li className={'link'}><NavLink to={'/page'}>Page</NavLink></li>
                                    <li className={'link'}><NavLink to={'/category'}>Category</NavLink></li>
                                    <li className={'link'}><NavLink to={'/products'}>Products</NavLink></li>
                                    <li className={'link'}><NavLink to={'/orders'}>Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{marginLeft:'auto',paddingTop:'60px'}}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </>
    );
}

export default Layout;

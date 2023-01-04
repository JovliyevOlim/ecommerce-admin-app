import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Input from "../../components/Ui/Input";
import {isUserLoggedIn, login} from "../../action";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


function Signin(props) {

    const dispatch =  useDispatch()
    const auth = useSelector(state=>state.auth)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');


    useEffect(()=>{
        if (!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
    },[])

    function userLogin(e){
        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user))
    }

    if (auth.authenticate){
        return  <Navigate to={'/'}/>
    }

    return (
        <Layout>
            <Container>
                <Row style={{marginTop:'100px'}}>
                    <Col md={{span:6,offset:3}}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label='Email'
                                placeholder='Email'
                                value={email}
                                type="email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                            <Input
                                label='Password'
                                placeholder='Password'
                                value={password}
                                type="password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Signin;

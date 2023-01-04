import React, {useEffect,useState} from 'react';
import Layout from "../../components/Layout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Input from "../../components/Ui/Input";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../action";

function Signup(props) {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (!user.loading){
            setFirstName('')
            setLastName("")
            setEmail("")
            setPassword("")
        }
    },[user.loading])

    if (auth.authenticate){
        return  <Navigate to={'/'}/>
    }

    if (user.loading){
        return  <p>Loading...!</p>
    }

    function userSignup(e){
        e.preventDefault()
        const user ={
            firstName,lastName,email,password
        }

        dispatch(signup(user))
    }

    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{marginTop:'100px'}} >
                    <Col md={{span:6,offset:3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label='First Name'
                                        placeholder='First Name'
                                        value={firstName}
                                        type="text"
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label='Last Name'
                                        placeholder='Last Name'
                                        value={lastName}
                                        type="text"
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
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

export default Signup;

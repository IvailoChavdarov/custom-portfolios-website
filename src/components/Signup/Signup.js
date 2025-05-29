import { useAuth } from '../../contexts/AuthContext';
import React, {useRef, useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'
import { Container } from 'react-bootstrap';

export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [error, setError] = useState('')

    const {signup} = useAuth()

    async function handleSubmit(e){
        e.preventDefault();
        //TODO: add validation (password match, etc.), loading screen, disable buttons
        try{
            await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch(er){
            setError('Account creation not successful')
            console.log(er)
        }
        
    }

    return(
    <Container className='d-flex align-items-center justify-content-center'>
      <div className='w-100' style={{maxWidth:"800px"}}>
            <Card className='w-100 p-5 mt-5'>
                <h2 className='text-center mb-3'>Sign up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} required/>
                    </Form.Group>
                    <Button className="w-100 mt-5" type="submit">Sign up</Button>
                </Form>
            </Card>
      </div>
    </Container>
    )
}
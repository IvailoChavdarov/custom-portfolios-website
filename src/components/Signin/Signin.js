import { useAuth } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

export default function Signin(){
    const { signin } = useAuth();
    const [ firebaseError, setFirebaseError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
            resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data) => {
        setFirebaseError('');
        setLoading(true);
        try {
            await signin(data.email, data.password);
            navigate('/account');
        }
        catch (err) {
            setFirebaseError('Sign in not successful');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'>
                  <div className='w-100' style={{ maxWidth: "800px" }}>
                    <Card className='w-100 p-5 mt-5'>
                      <h2 className='text-center mb-3'>Sign in</h2>
                      {firebaseError && <Alert variant="danger">{firebaseError}</Alert>}
            
                      <Form onSubmit={handleSubmit(onSubmit)}>   
                        <Form.Group className='mb-3'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" {...register("email")} isInvalid={!!errors.email} />
                          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" {...register("password")} isInvalid={!!errors.password} />
                          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </Form.Group>
            
                        <Button disabled={loading} type="submit" className="w-100"> Sign up </Button>
                      </Form>
                    </Card>
                  </div>
                </Container>
        </>
    )
}
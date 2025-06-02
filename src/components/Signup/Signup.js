import { useAuth } from '../../contexts/AuthContext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { db } from "../../firebase.js";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


const singupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
        message:
            'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
    }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

export default function Signup(){
    const { signup } = useAuth();
    const [firebaseError, setFirebaseError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
        resolver: zodResolver(singupSchema),
    });

  const onSubmit = async (data) => {
    setFirebaseError('');
    setLoading(true);
    try {
      const credentials = await signup(data.email, data.password);
      await setDoc(doc(db, 'profiles', credentials.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      navigate('/account');
    } catch (err) {
      setFirebaseError('Account creation not successful');
    } finally {
      setLoading(false);
    }
  };

    return(
    <Container className='d-flex align-items-center justify-content-center'>
      <div className='w-100' style={{ maxWidth: "800px" }}>
        <Card className='w-100 p-5 mt-5'>
          <h2 className='text-center mb-3'>Sign up</h2>
          {firebaseError && <Alert variant="danger">{firebaseError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" {...register("firstName")} isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" {...register("lastName")} isInvalid={!!errors.lastName} />
              <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group className='mb-4'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" {...register("confirmPassword")} isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100"> Sign up </Button>
          </Form>
        </Card>
      </div>
    </Container>
    )
}
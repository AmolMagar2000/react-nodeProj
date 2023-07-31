import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', signupData);
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSignup}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={signupData.name} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={signupData.email} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={signupData.password} onChange={handleInputChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;

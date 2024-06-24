import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const SignUp = ({ handleSignUp, toggleForm }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() === '' || formData.password.trim() === '') {
      alert('Please enter both username and password.');
      return;
    }
    handleSignUp(formData);
    setFormData({ username: '', password: '' });
  };

  return (
    <Container style={{
        width: "30rem",
        height: "32rem",
        
         textAlign:"center"
      }}>
      <Card 
    >
        <Card.Body>
          <Card.Title className='fw-bold'>Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="text-primary fw-bold">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-primary fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Sign Up
            </Button>
            <p>
              Already have an account? <Button variant="link" onClick={toggleForm}>Sign In</Button>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;

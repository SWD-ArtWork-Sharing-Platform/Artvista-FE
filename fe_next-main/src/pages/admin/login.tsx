import { LoginRequestDTO } from '@/models/LoginRequestDTO';
import { AuthService } from '@/services/AuthService';
import { useRouter } from 'next/router'; // Corrected import statement
import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter(); // Access useRouter directly

    const handleLogin = async () => {
        const loginRequest: LoginRequestDTO = {
            username: username,
            password: password
        };

        try {
            const response = await AuthService.login(loginRequest);
            setError('Loading...');

            if (response.isSuccess) {
                const token = response.result.token;
                AuthService.setToken(token);
                // Redirect or perform any other action upon successful login
                router.push('/admin/dashboard'); // Use router.push for navigation
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (error: any) {
            setError(error.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card className='mt-3'>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" onClick={handleLogin} className='mt-3' block>
                                    Login
                                </Button>

                                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;

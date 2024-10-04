import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Input, Label, Row, Button, Spinner, FormFeedback } from 'reactstrap';
import AuthSlider from '../authCarousel';
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js"; // Assuming you are using CryptoJS for encryption
import withRouter from "../../../Components/Common/withRouter";
import { useAuth } from "../../../contexts/AuthContext";

const CoverSignIn = (props) => {
    const navigate = useNavigate();
    document.title = "Login | MRV_PROJECT - Login";
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        
        if (savedEmail && savedPassword) {
            validation.setFieldValue('email', savedEmail);
            validation.setFieldValue('password', CryptoJS.AES.decrypt(savedPassword, 'secret-key').toString(CryptoJS.enc.Utf8));
            setRememberMe(true);
        }
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]); 

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Please enter your email"),
            password: Yup.string().required("Please enter your password"),
        }),
        onSubmit: async (values) => {
            setError(null); // Clear any previous errors
            setLoading(true); // Start loading spinner
            try {
                const encryptedPassword = CryptoJS.SHA256(values.password).toString();
                const response = await fetch("https://atlas.smartgeoapps.com/MRVAPI/api/Authentication/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email, password: encryptedPassword }),
                });

                const data = await response.json();

                if (data.token) {
                    if (rememberMe) {
                        // Encrypt and save credentials in localStorage
                        localStorage.setItem("savedEmail", values.email);
                        localStorage.setItem("savedPassword", CryptoJS.AES.encrypt(values.password, 'secret-key').toString());
                    } else {
                        // Clear any saved credentials if "Remember Me" is unchecked
                        localStorage.removeItem("savedEmail");
                        localStorage.removeItem("savedPassword");
                    }
                    localStorage.setItem("UserPermissions", JSON.stringify(data));
                    localStorage.setItem("AuthToken", data.token);
                    navigate("/dashboard")
                    login(data.token);
                   
                } else {
                    setError("Invalid login credentials");
                }
            } catch (err) {
                setError("Invalid login credentials.");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        }
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Welcome Back!</h5>
                                                    <p className="text-muted">Sign in to continue to MRV.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form onSubmit={validation.handleSubmit}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">Email</Label>
                                                            <Input
                                                                type="email"
                                                                name="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder="Enter email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email}
                                                                invalid={validation.touched.email && !!validation.errors.email}
                                                            />
                                                            {validation.touched.email && validation.errors.email && (
                                                                <FormFeedback>{validation.errors.email}</FormFeedback>
                                                            )}
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    id="password-input"
                                                                    name="password"
                                                                    type={showPassword ? "text" : "password"}
                                                                    className="form-control pe-5"
                                                                    placeholder="Enter Password"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.password}
                                                                    invalid={validation.touched.password && !!validation.errors.password}
                                                                />
                                                                {validation.touched.password && validation.errors.password && (
                                                                    <FormFeedback>{validation.errors.password}</FormFeedback>
                                                                )}
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    onClick={togglePasswordVisibility}
                                                                    type="button"
                                                                    id="password-addon"
                                                                >
                                                                    <i className={`ri-eye${showPassword ? '-off' : ''}-fill align-middle`}></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="auth-remember-check"
                                                                checked={rememberMe}
                                                                onChange={handleRememberMeChange}
                                                            />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">
                                                                Remember me
                                                            </Label>
                                                        </div>

                                                        {error && <div className="text-danger mb-3">{error}</div>}

                                                        <div className="mt-4">
                                                            <Button color="success" disabled={loading} className="w-100" type="submit">
                                                                {loading ? <Spinner size="sm" className="me-2" /> : null}
                                                                Sign In
                                                            </Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <div className="signin-other-title">
                                                                <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                            </div>
                                                            <div>
                                                                <Link
                                                                    to="#"
                                                                    className="btn btn-primary btn-icon me-1"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        socialResponse("facebook");
                                                                    }}
                                                                >
                                                                    <i className="ri-facebook-fill fs-16" />
                                                                </Link>
                                                                <Link
                                                                    to="#"
                                                                    className="btn btn-danger btn-icon me-1"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        socialResponse("google");
                                                                    }}
                                                                >
                                                                    <i className="ri-google-fill fs-16" />
                                                                </Link>
                                                                <Button color="dark" className="btn-icon">
                                                                    <i className="ri-github-fill fs-16"></i>
                                                                </Button>
                                                                <Button color="info" className="btn-icon">
                                                                    <i className="ri-twitter-fill fs-16"></i>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">
                                                        Don't have an account? <Link to="/register" className="fw-semibold text-primary text-decoration-underline">Signup</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(CoverSignIn);

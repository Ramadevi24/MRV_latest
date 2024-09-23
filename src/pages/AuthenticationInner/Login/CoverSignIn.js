import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Input, Label, Row ,Button} from 'reactstrap';
import AuthSlider from '../authCarousel';

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../../slices/thunks";

// import logoLight from "../../assets/images/logo-light.png";
import { createSelector } from 'reselect';


const CoverSignIn = (props) => {
document.title="Cover SignIn | Velzon - React Admin & Dashboard Template";
const dispatch = useDispatch();
const selectLayoutState = (state) => state;
const loginpageData = createSelector(
    selectLayoutState,
    (state) => ({
        user: state.Account.user,
        error: state.Login.error,
        loading: state.Login.loading,
        errorMsg: state.Login.errorMsg,
    })
);
  // Inside your component
  const {
    user, error, loading, errorMsg
} = useSelector(loginpageData);

const [userLogin, setUserLogin] = useState([]);
const [showPassword, setShowPassword] = useState(false);


useEffect(() => {
    if (user && user) {
        const updatedUserData = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? user.multiFactor.user.email : user.user.email;
        const updatedUserPassword = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? "" : user.user.confirm_password;
        setUserLogin({
            email: updatedUserData,
            password: updatedUserPassword
        });
    }
}, [user]);

const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
        email: userLogin.email || "admin@themesbrand.com" || '',
        password: userLogin.password || "123456" || '',
    },
    validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
        dispatch(loginUser(values, props.router.navigate));
    }
});

const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate));
};

//handleTwitterLoginResponse
// const twitterResponse = e => {}

//for facebook and google authentication
const socialResponse = type => {
    signIn(type);
};


useEffect(() => {
    if (errorMsg) {
        setTimeout(() => {
            dispatch(resetLoginFlag());
        }, 3000);
    }
}, [dispatch, errorMsg]);
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
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue to MRV.</p>
                                                </div>
                                                

                                                <div className="mt-4">
                                                    <form 
                                                       onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validation.handleSubmit();
                                                        return false;
                                                    }}
                                                    action="#"
                                                    >

                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">Email</Label>
                                                            <Input    type="email" name="email" className="form-control" id="username" placeholder="Enter email" 
                                                                  onChange={validation.handleChange}
                                                                  onBlur={validation.handleBlur}
                                                                  value={validation.values.email || ""}
                                                                  invalid={
                                                                      validation.touched.email && validation.errors.email ? true : false
                                                                  }/>
                                                                     {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input   id="password-input"
                                                                name="password"
                                                                value={validation.values.password || ""}
                                                                type={showPassword ? "text" : "password"}
                                                                className="form-control pe-5"
                                                                placeholder="Enter Password"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                invalid={
                                                                    validation.touched.password && validation.errors.password ? true : false
                                                                } />
                                                                   {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" onClick={() => setShowPassword(!showPassword)} type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" disabled={error ? null : loading ? true : false} className="w-100" type="submit">
                                                            {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}Sign In</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <div className="signin-other-title">
                                                                <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                            </div>
                                                            <div>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-primary btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                socialResponse("facebook");
                                                            }}
                                                            >
                                                            <i className="ri-facebook-fill fs-16" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="btn btn-danger btn-icon me-1"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                socialResponse("google");
                                                            }}
                                                            >
                                                            <i className="ri-google-fill fs-16" />
                                                        </Link>
                                                        <Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                                        <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                    </div>

                                                            {/* <div>
                                                                <Button color="primary" className="btn-icon me-1"><i className="ri-facebook-fill fs-16"></i></Button>
                                                                <Button color="danger" className="btn-icon me-1"><i className="ri-google-fill fs-16"></i></Button>
                                                                <Button color="dark" className="btn-icon me-1"><i className="ri-github-fill fs-16"></i></Button>
                                                                <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                            </div> */}
                                                        </div>

                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link></p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer> */}

            </div>
        </React.Fragment>
    );
};

export default withRouter(CoverSignIn);
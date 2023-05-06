import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

//create a scheme for validation
const schema = Yup.object().shape({
    email: Yup.string().required("Email is a required field").email("Invalid email format"),
    password: Yup.string().required("password is a required field").min(8, "password must be at least 8 characters"),
})

const Login = () => {
    const navigate = useNavigate();

    function handleNaigate(values) {
        //Alert the input values of the form that we filled
        alert(values);

        //setTimeout for navigate from login page to home page
        setTimeout(() => {
            navigate(-1);
        }, 0);
    }
    return (
        <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    //call handleNavigate and pass input field data
                    handleNaigate(JSON.stringify(values));
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <div className="login-container">
                        <div className="login-form">
                            {/* Passing handleSubmit parameter to html form onSubmit property */}
                            <form noValidate onSubmit={handleSubmit}>
                                <span>Login</span>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Enter your email" className="form-control inp_text" id="email" />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.email && touched.email && errors.email}
                                </p>
                                {/* input with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Enter your password" className="form-control" />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p>
                                {/* Click on submit button to submit the form */}
                                <button type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                )}

            </Formik>
        </>
    )
}
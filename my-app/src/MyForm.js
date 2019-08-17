import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import { __values } from 'tslib';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm({ errors, touched, values, status}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(status){
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <label className="checkbox-container">
                Terms of Service 
                <Field type="checkbox" name="terms" checked={values.terms} />
                {touched.terms && errors.terms && <p>{errors.terms}</p>}
                <span className="checkmark" />
            </label>
            <button>Submit!</button>
            {users.map(user => (
                <p key={user.id}>{user.name}</p>
            ))}
        </Form>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || ""
        };
    },
    handleSubmit(values) {
        console.log(values);
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is required!"),
        email: Yup.string()
            .email("This is not a valid email!")
            .required("Email is required!"),
        password: Yup.string()
            .min(6)
            .required("Password is required!")
    })
})(LoginForm);

export default FormikLoginForm;
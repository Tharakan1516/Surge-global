import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';

const LoginPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const onSubmit = async (e) => {

        setIsLoading(true);
        e.preventDefault();
        console.log("Inserted Data: ", formData)
        let data = await axios
            .post('http://localhost:8000/users/signin', formData);
        console.log("data", data?.data);

        if (formData.email === data?.data?.email) {
            if (formData.password === data?.data?.password) {
                try {
                    localStorage.setItem("Token", data?.data?.token);
                    localStorage.setItem("AccountType", data?.data?.accountType);
                    localStorage.setItem("Email", data?.data?.email);
                    localStorage.setItem("Status", data?.data?.status);
                    localStorage.setItem("Id", data?.data?.id);

                    alert('Login Success...');
                    if (data?.data?.status == false) {
                        navigate(`/updatepword/${data?.data?.id}`);
                        setIsLoading(false);
                    }
                    else if (data?.data?.accountType == "Student") {
                        navigate(`/allnotes`);
                        setIsLoading(false);
                    }
                    else {
                        navigate('/allusers');
                        setIsLoading(false);
                    }
                }
                catch (err) {
                    console.log(err);
                    //alert("Error While Logging!!!", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed!',
                        text: 'Oops... Error While Logging!!!',
                    })
                }
            }
            else {
                setIsLoading(false);
                //alert("Invalid Password!!!")
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed!',
                    text: 'Oops... Invalid Password!!!',
                })
            }
        }
        else {
            setIsLoading(false);
            //alert("Invalid Email Address!!!")
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Oops... Invalid Email Address!!!',
            })
        }
    };

    const renderUser = (
        <div style={{ marginTop: '30px', marginLeft: '35%' }}>

        </div>
    );

    return (
        <div>
            <h1>Log into your account here...</h1>
            {isLoading ? <LoadingSpinner /> : renderUser}
            <div className='' style={{ marginTop: '30px', marginLeft: '35%' }}>
                <form>
                    <div className='form-group'>
                        <label>Email</label><br />
                        <input type='email' name='email' value={email} onChange={(e) => onChange(e)} className='form-control' style={{ width: '400px', marginBottom: '20px' }} />
                    </div>

                    <div className='form-group'>
                        <label>Password</label><br />
                        <input type='password' name='password' value={password} onChange={(e) => onChange(e)} className='form-control' style={{ width: '400px', marginBottom: '20px' }} />
                    </div>

                    <button type='submit' onClick={(e) => onSubmit(e)} style={{ marginTop: '20px' }} className='btn btn-success' disabled={isLoading}>Login</button>
                </form>
            </div>
            <div style={{ marginTop: '30px', marginLeft: '35%' }}>
                Don't you have an account? <a href='/register'>Register here</a>
            </div>
        </div>
    )
}

export default LoginPage
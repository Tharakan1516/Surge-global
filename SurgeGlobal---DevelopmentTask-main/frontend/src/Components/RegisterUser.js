import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import emailjs from '@emailjs/browser';

const RegisterUser = () => {

    const navigate = useNavigate();
    const form = useRef();

    const [userId, setUserId] = useState("");
    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobile, setMobile] = useState("");
    const [accountType, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const rand = (min, max) => {
        return Math.floor(Math.random() * max - min + 1) + min;
    }

    const handleIds = () => {
        setUserId(rand(999, 99999))
    }

    const handleIdChange = (e) => {

        e.preventDefault();
        setUserId(e.target.value);
    }

    const handleFnameChange = (e) => {

        e.preventDefault();
        setFname(e.target.value);
    }

    const handleLnameChange = (e) => {

        e.preventDefault();
        setLname(e.target.value);
    }

    const handleEmailChange = (e) => {

        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleDobChange = (e) => {

        e.preventDefault();
        setDateOfBirth(e.target.value);
    }

    const handleMobileChange = (e) => {

        e.preventDefault();
        setMobile(e.target.value);
    }

    const handleAccTypeChange = (e) => {

        e.preventDefault();
        setAccountType(e.target.value);
    }

    const handlePasswordChange = (e) => {

        e.preventDefault();
        setPassword(e.target.value);
    }

    const handlePws = () => {
        setPassword(rand(999999, 99999999))
    }

    const handleStatusChange = (e) => {

        e.preventDefault();
        setStatus(e.target.value);
    }

    const addNewUser = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        const userData = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            mobile: mobile,
            accountType: accountType,
            password:password,
            status:'0'
        }

        console.log("Sending User Data...", userData);
        let data = await axios
        .post('http://localhost:8000/users/', {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            mobile: mobile,
            accountType: accountType,
            password:password,
            status:'0'
        })
        .then((res) => {
            console.log("Saved User: ", res.data);
            alert('Registration Success...');
            setIsLoading(false);
            sendEmail(e);
            navigate('/');
        })
        .catch((err) => {
            setIsLoading(false);
            console.log(err);
        })
        
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_y4h1h0d', 'template_e6tenye', form.current, 'user_4Ty61vRi47OewtmEVjcGx')
          .then((result) => {
              console.log(result.text);
              alert("Email Has Been Sent...")
          }, (error) => {
              console.log(error.text);
          });
      };

    const renderUser = (
        <div style={{ marginTop: '30px', marginLeft: '35%' }}>

        </div>
    );


    return (
        <div>
            <h1>Register your account here...</h1>
            {isLoading ? <LoadingSpinner /> : renderUser}
            <div className='' style={{ marginTop: '30px', marginLeft: '35%' }}>
                <form ref={form}>

                    <div className='form-group'>
                        <label>ID</label><br />
                        <input type='text' name='' onChange={() => handleIds()} value={userId} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>First Name</label><br />
                        <input type='text' name='user_first_name' onChange={(e) => handleFnameChange(e)} value={firstName} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Last Name</label><br />
                        <input type='text' name='' onChange={(e) => handleLnameChange(e)} value={lastName} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Email</label><br />
                        <input type='text' name='user_email' onChange={(e) => handleEmailChange(e)} value={email} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Date of Birth</label><br />
                        <input type='date' name='' onChange={(e) => handleDobChange(e)} value={dateOfBirth} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                        <label>Mobile No</label><br />
                        <input type='text' name='' onChange={(e) => handleMobileChange(e)} value={mobile} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                    <label>Password</label>
                        <input type='password' name='user_password' onChange={() => handlePws()} value={password} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' />
                    </div>

                    <div className='form-group'>
                    <label>Status</label>
                        <input type='hidden' name='' onChange={(e) => handleStatusChange(e)} value={status} className='form-control' style={{ width: '400px', marginBottom: '20px' }} required='true' readOnly='true' />
                    </div>

                    <div class="form-group">
                        <label>Account Type</label>
                        <select class="form-control" name='' onChange={(e) => handleAccTypeChange(e)} value={accountType} style={{ width: '400px', marginBottom: '80px' }} required='true'>
                            <option selected>Choose...</option>
                            <option>Student</option>
                            <option>Admin</option>
                        </select>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required='true' />
                        <label class="form-check-label" for="defaultCheck1">
                            I hereby confirm the details are correct
                        </label>
                    </div>

                    <button type='submit' onClick={(e) => addNewUser(e)} style={{ marginTop: '20px' }} className='btn btn-primary' disabled={isLoading}>Register</button>
                </form>
                <div>
                    Already having an account? <a href='/'>Login here</a>
                </div>
            </div>

        </div>
    )
}

export default RegisterUser
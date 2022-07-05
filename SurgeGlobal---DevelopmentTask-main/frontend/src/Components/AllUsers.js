import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AllUsers = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then((res) => {
                console.log(res.data);
                setUserList(res.data);
            })
    }, [])

    return (
        <div>
            <h1>All Users</h1>
            <div className='container' style={{ marginTop: '30px' }}>
                <table className='table table-hover table-dark'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((val, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{val.id}</td>
                                <td>{val.firstName}</td>
                                <td>{val.email}</td>
                                <td>{val.accountType}</td>
                                <td>
                                    <Popup
                                        trigger={<button className="btn btn-info btn-sm"> View Details </button>}
                                        modal
                                        nested>
                                        <div className="model"><center>
                                            <div className="header" style={{ marginBottom: '10px' }}> <b>User Details</b> </div>
                                            <div className="content">
                                                ID: <br />
                                                First Name: <br />
                                                Last Name: <br />
                                                Email: <br />
                                                Date of Birth: <br />
                                                mobile No: <br />
                                                Status: <br />
                                                Account Type: <br />
                                            </div></center>
                                        </div>
                                    </Popup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers
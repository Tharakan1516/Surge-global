import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";

const UpdateNote = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [note, setNote] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {

        function getNote() {
            axios
                .get(`http://localhost:8000/notes/${id}`)
                .then((res) => {
                    setNote(res.data);
                    console.log("Note Details: ", res.data);
                })
        }
        getNote();
    }, []);

    const handleTitleChange = (e) => {

        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {

        e.preventDefault();
        setDescription(e.target.value);
    }

    const UpdateNote = async (e) => {
        e.preventDefault();

        const dataSet = {
            title: title,
            description: description,
        }

        console.log("Sending Note Data...", dataSet);
        let data = await axios
            .put(`http://localhost:8000/notes/${id}`, {
                title: title,
                description: description,
            })
            .then(() => {
                alert('Update Success...');
                navigate('/allnotes');
            })
        console.log("Updated Data: ", data);
    }


    return (
        <div>
            <h1>Update Notes here...</h1>
            <div className='container' style={{ marginTop: '30px', marginLeft: '760px' }}>
                <form>
                    <div className='form-group'>
                        <label>Title</label><br />
                        <input type='text' name="title" value={title.title} onChange={(e) => handleTitleChange(e)} className='form-control' style={{ width: '400px', marginBottom: '20px' }} />
                    </div>

                    <div className='form-group'>
                        <label>Description</label><br />
                        <textarea rows='5' name="description" value={description.description} onChange={(e) => handleDescriptionChange(e)} className='form-control' style={{ width: '400px', marginBottom: '20px' }} />
                    </div>

                    <button type='submit' onClick={(e) => UpdateNote(e)} style={{ marginTop: '20px' }} className='btn btn-success'>Update Note</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateNote
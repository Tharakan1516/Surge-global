import React, { useState, useEffect } from 'react'
import axios from 'axios';

const InsertNote = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => {

        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {

        e.preventDefault();
        setDescription(e.target.value);
    }

    const addNote = async (e) => {
        e.preventDefault();

        const dataSet = {
            title: title,
            description: description,
        }

        console.log("Sending Note Data...", dataSet);
        let data = await axios.post('http://localhost:8000/notes', {
            title: title,
            description: description,
        });
        console.log("Saved Data: ", data);
    }



    return (
        <div>
            <h1>Insert Notes here...</h1>
            <div className='container' style={{ marginTop: '30px', marginLeft: '760px' }}>
                <form>
                    <div className='form-group'>
                        <label>Title</label><br />
                        <input type='text' value={title} className='form-control' style={{ width: '400px', marginBottom: '20px' }} onChange={(e) => handleTitleChange(e)} />
                    </div>

                    <div className='form-group'>
                        <label>Description</label><br />
                        <textarea rows='5' name={description} className='form-control' style={{ width: '400px', marginBottom: '20px' }} onChange={(e) => handleDescriptionChange(e)} />
                    </div>

                    <button type='submit' style={{ marginTop: '20px' }} onClick={(e) => addNote(e)} className='btn btn-success'>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default InsertNote
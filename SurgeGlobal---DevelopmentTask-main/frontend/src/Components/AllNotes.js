import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AllNotes = () => {

    let userEmail = localStorage.getItem('Email');

    const navigate = useNavigate();

    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/notes?email=${userEmail}`)
            .then((res) => {
                console.log(res.data);
                setNotesList(res.data);
            })
    }, [])

    const deleteNote = async (id) => {

        let data = await axios
            .delete(`http://localhost:8000/notes/${id}`)
            .then(() => {
                alert('Delete Success...');
                navigate('/allnotes');
            })
    }

    return (
        <div>
            <h1>All Notes</h1>
            <div className='container' >
                <section class="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>
                    {notesList.map((val, index) => (
                        <article class="card" style={{ flex: '0 1 24%', marginBottom: '20px', backgroundColor:'#ffa64d' }}>
                            <h4>{val.title}</h4>
                            <p>{val.description}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a className='btn btn-primary' href={`/updatenote/${val?._id}`}>Update Note</a>
                                <a className='btn btn-danger' onClick={(e) => deleteNote(val?._id)} >Delete Note</a>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default AllNotes
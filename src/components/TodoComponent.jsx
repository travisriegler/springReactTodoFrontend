import React, { useState, useEffect } from 'react'
import { saveTodo } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, updateTodo } from "../services/TodoService";

const TodoComponent = () => {

    const navigate = useNavigate();
    const { id } = useParams();



    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });



    useEffect(() => {
        if (id) {
            getTodo(id).then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCompleted(response.data.completed);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])



    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center mt-3'>Update Todo</h2>
        } else {
            return <h2 className='text-center mt-3'>Add Todo</h2>
        }
    }
    
    const saveOrUpdateTodo = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const todo = {
                title,
                description,
                completed
            }
    
            if (id) {
                updateTodo(id, todo).then(response => {
                    navigate("/todos");
                }).catch(error => {
                    console.error(error);
                })
            } else {
                saveTodo(todo).then(response => {
                    navigate("/todos");
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {...errors}

        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = "Title is required";
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = "Description is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Title:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Todo Title'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                />
                                { errors.title && <div className="invalid-feedback">{errors.title}</div> }
                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Description:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Todo Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                />
                                { errors.description && <div className="invalid-feedback">{errors.description}</div> }
                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Todo Completed:</label>
                                <select 
                                    className='form-control'
                                    name='completed'
                                    value={completed}
                                    onChange={(e) => setCompleted(JSON.parse(e.target.value))}
                                >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>  

                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-success mt-2' onClick={(e) => saveOrUpdateTodo(e)}>Submit</button>
                            </div>
                                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent
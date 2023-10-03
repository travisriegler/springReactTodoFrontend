import { useState, useEffect } from "react"
import { getAllTodos, deleteTodo, completeTodo, incompleteTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";



const ListTodoComponent = () => {

    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        listTodos();
    }, [])

    const listTodos = () => {
        getAllTodos().then(response => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const [todos, setTodos] = useState([]);

    const addNewTodo = () => {
        navigate("/add-todo");
    }

    const updateTodo = (todoId) => {
        navigate(`/update-todo/${todoId}`);
    }

    const removeTodo = (todoId) => {
        deleteTodo(todoId).then(response => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    const markCompleteTodo = (todoId) => {
        completeTodo(todoId).then(response => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    const markIncompleteTodo = (todoId) => {
        incompleteTodo(todoId).then(response => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container">
            <h2 className="text-center mt-4">List of Todos</h2>
            {
                isAdmin && <button className="btn btn-primary mb-2" onClick={addNewTodo}>Add Todo</button>
            }
            
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Todo Title</th>
                            <th>Todo Description</th>
                            <th>Todo Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo) => {
                                return (
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed ? "YES" : "NO"}</td>
                                        <td>
                                            {
                                                isAdmin && <button className="btn btn-secondary" onClick={() => updateTodo(todo.id)}>Update</button>
                                            }
                                            {
                                                todo.completed 
                                                    ? <button className="btn btn-outline-danger ms-2" onClick={() => markIncompleteTodo(todo.id)}>Incomplete</button>
                                                    : <button className="btn btn-outline-success ms-2" onClick={() => markCompleteTodo(todo.id)}>Complete</button>
                                            }
                                            {
                                                isAdmin && <button className="btn btn-outline-danger ms-2" onClick={() => removeTodo(todo.id)}>Delete</button>
                                            }
                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ListTodoComponent
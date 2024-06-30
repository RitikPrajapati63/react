import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


export default function TodoList() {
    const [allTodos, setTodos] = useState([]);
    const [newname, setNewname] = useState("");
    const [newdescription, setNewdescription] = useState("");
    const [newphone, setNewphone] = useState("");
    const [newaddress, setNewaddress] = useState("");
    const [editIndex, setEditIndex] = useState(null);

 
    // input names k liye
    const handleAddTodo = () => {
        let newTodoItem = {
            name: newname,
            description: newdescription,
            phone: newphone,
            address: newaddress
        }


        let updatedTodoArr = [...allTodos];

        if (editIndex !== null) {
            updatedTodoArr[editIndex] = newTodoItem;
            setEditIndex(null);
        } else {
            updatedTodoArr.push(newTodoItem);
        }
        setTodos(updatedTodoArr);
        setNewname("");
        setNewdescription("");
        setNewphone("");
        setNewaddress("");

        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    };


    // handleEditTodo
    const handleEditTodo = (index) => {
        const todoItem = allTodos[index];
        setNewname(todoItem.name);
        setNewdescription(todoItem.description);
        setNewphone(todoItem.phone);
        setNewaddress(todoItem.address);
        setEditIndex(index);
    };


    // handleDeleteTodo
    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index,1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo)
    }


    // handleToggleComplete
    const handleToggleComplete = (index) => {
        let updatedTodos = [...allTodos];
        updatedTodos[index].completed = !updatedTodos[index].completed;

        setTodos(updatedTodos);
        localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    }


    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        if (savedTodo) {
            setTodos(savedTodo);
        }
    }, [])

    return (
        <>
            <div className=''>
                <h1 className='text-center text-success mt-4'>My TODO-LIST</h1>
                <div className='todo-wrapper'>
                    <div className='todo-input row  '>
                        <div className='todo-item col-md-6 col-12  '>
                            <label htmlFor="name">Name</label><br />
                            <input type="text" value={newname} onChange={(e) => setNewname(e.target.value)} name='name' placeholder='Todo Name' />
                        </div>
                        <div className='todo-item col-md-6 col-12  '>
                            <label htmlFor="description">Description</label><br />
                            <input type="text" value={newdescription} onChange={(e) => setNewdescription(e.target.value)} name='description' placeholder='Todo Description' />
                        </div>
                        <div className='todo-item col-md-6 col-12  '>
                            <label htmlFor="phone">Phone</label><br />
                            <input type="number" max={10} value={newphone} onChange={(e) => setNewphone(e.target.value)} name='phone' placeholder='Todo Phone' />
                        </div>
                        <div className='todo-item col-md-6 col-12  '>
                            <label htmlFor="address">Address</label><br />
                            <input type="text" value={newaddress} onChange={(e) => setNewaddress(e.target.value)} name='address' placeholder='Todo Address' />
                        </div>
                        <div className='todo-item col-12'>
                            <button type='submit' onClick={handleAddTodo} className='butt'>{editIndex !== null ? 'Update Todo' : 'Add Todo'}</button>
                        </div>

                        <div className='todo-list row justify-content-between'>
                            {allTodos.map((item, index) => {
                                return (
                                   
                                    <div className='todo-list-item mt-4   inner  bg-info-subtle rounded-4 px-3 py-2' key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none', }}>
                                        <div>
                                            <h4 >NAME: {item.name}</h4>
                                            <p >DESCRIPTION: {item.description}</p>
                                            <p >PHONE: {item.phone}</p>
                                            <p >ADDRESS: {item.address}</p>
                                        </div>
                                        <div>
                                            <FaEdit className='icon-edit' onClick={() => handleEditTodo(index)} />
                                            <MdDeleteForever className='icon-delete' onClick={() => handleDeleteTodo(index)} title="Delete" />

                                             <button className='btt' onClick={() => handleToggleComplete(index)}>
                                                {item.completed ? 'Not Complete' : 'Complete'}
                                            </button>    
                                                
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

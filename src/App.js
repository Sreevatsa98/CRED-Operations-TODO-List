import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCircleCheck, faPen, faTrashCan
// }from '@fortawesome/free-solid-svg-icons'

import './App.css';

import AddTaskFrom from './components/AddTaskForm.jsx';
import UpdateFrom from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';


function App() {

  //Task State
  const [toDo, setToDo] = useState([
    {"id": 1, "title": "Task 1", "status": false},
    {"id": 2, "title": "Task 2", "status": false}
  ]);

  //Temp Task
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add Task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }
  
  //Deletion of Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }

  //Mark Done
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id ){
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  //Cancle Task Update
  const cancelUpdate = () => {
      setUpdateData('');
  }

  //Change Task
  const changeTask = (e) => {
      let newEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false
      }
      setUpdateData(newEntry);
    }

  //Upddate Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br /><br />
      <h2>Todo List App</h2>
      <br /><br />

    {/* Update Task */}
    {updateData && updateData ? (
      <UpdateFrom 
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ):(

      <AddTaskFrom 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

    )}

      {/* Display TO-DO's */}
      {toDo && toDo.length ? '' : 'Wow! you have completed all the task'}

      <ToDo 
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />

    </div>
  );
}

export default App;

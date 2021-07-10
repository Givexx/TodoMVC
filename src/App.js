import { useState } from "react";

function App() { 

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [erti, setErti] = useState(0);
  const [del, setDel] = useState(0);

  const AddTask = () => {
    if(task !== '' && !task[0].match(new RegExp(/\s/i)) ){
      setTask('');
      const taskDetails = {
        id : Math.floor(Math.random() * 1000),
        value : task,
        isCompleted : false,
      }
      setTaskList([...taskList, taskDetails]);
    }
  }

  const deleteTask = (e, id) => {
    e.preventDefault();
    setTaskList(taskList.filter((t) => t.id !== id));
    const element = taskList.findIndex(elem => elem.id === id);
    if(taskList[element].isCompleted){
      setDel(del + 1);
      setErti(erti - 1)
    } else {
      setDel(del+1);
    }
  }

  const marked = (e, id) => {
    e.preventDefault();
    const element = taskList.findIndex(elem => elem.id === id);
    const newTaskList = [...taskList];
    if(!newTaskList[element].isCompleted){
      setErti(erti + 1);
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted:true
    };
    setTaskList(newTaskList);
  } else {
    setErti(erti - 1);
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted:false
    };
    setTaskList(newTaskList);
  }
  }

  const reset = () => {
    setDel(0);
    setErti(0);
    const newTaskList = [...taskList];
    newTaskList.map(elem => elem.isCompleted = false);
    setTaskList(newTaskList);
  }

  return (
    <div className='container'>
      <div className='something'>
    <input className='input'
      type='text' 
      placeholder='What needs to be done?'
      value={task}
      maxLength="20" 
      onChange={(e) => setTask(e.target.value) } 
    />
    <button className='addItem' onClick={AddTask}>Add Item</button>
    </div>
    {taskList !== [] ? (
      <ul>
        {taskList.map((t,id) => (
      <li key={id}>
        <div className={t.isCompleted ? 'marked' : 'unMarked'}>{t.value}</div>
        <div className='buttons'>
        <button className='delete' onClick={(e) => deleteTask(e, t.id)}>Delete</button>
        <button onClick={e => marked(e, t.id)} className='mark'>Mark</button>
        </div>
      </li>
    ))}
      </ul>
     ) : null}
     <div className='results'>
     <h5>Marked Items : {erti}</h5>
     <h5 onClick={reset}>Reset</h5>
     <h5>Deleted Items : {del}</h5>
     </div>
    </div>
  )
}

export default App;


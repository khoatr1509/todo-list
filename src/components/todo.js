/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [description, setDesc] = useState('');
  const [tasks, setTodo] = useState([]);
  const [list, setList] = useState([]);
  const [removeList, updateRemovelist] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/list').then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  const addTask = (userId = 6, taskId, task) => {
    let req_obj = { userId: userId, taskId: taskId, task: task };
    axios.post('http://localhost:3000/todo_list', req_obj).then((res) => {});
  };

  const deleteTask = (taskId) => {
    let req_obj = { taskId: taskId };
    axios.post('http://localhost:3000/delete_task', req_obj).then((res) => {});
    console.log(removeList);
    updateRemovelist((e) => [...e, req_obj.taskId]);
  };
  const [isDone, setDone] = useState([]);
  const handleTodo = () => {
    const obj = {
      taskId: list.length + 1,
      isDone: 'false',
      task: description
    };
    // TODO: call API here
    addTask(1, obj.taskId, obj.task);

    setList((e) => [{ ...obj }, ...e]);
    console.log(tasks);
    setDesc('');
  };

  const handleEnter = (event) => {
    console.log(event);
    if (event.key === 'Enter') {
      handleTodo();
    }
  };
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest font-bold text-center text-2xl">
            Todo List
          </h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={description}
              onKeyDown={handleEnter}
              onChange={(event) => setDesc(event.target.value)}
            />
            <button
              onClick={handleTodo}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </div>
        </div>
        {list.map((task) => {
          return (
            <>
              {removeList.includes(task.taskid) ? (
                <></>
              ) : (
                <div className="flex mb-4 items-center">
                  <p className="w-full text-grey-darkest">
                    {!isDone.includes(task.taskid) ? (
                      `${task.task}`
                    ) : (
                      <p className="line-through"> {`${task.task}`} </p>
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setDone((e) => [...e, task.taskid]);
                    }}
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
                    Done
                  </button>
                  <button
                    onClick={() => updateRemovelist((e) => [...e, task.taskid])}
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                    Remove
                  </button>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;

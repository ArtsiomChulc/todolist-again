import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    // let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
    //     [
    //         {id: v1(), title: 'What to learn', filter: 'all'},
    //         {id: v1(), title: 'What to buy', filter: 'all'},
    //     ]
    // )
    //
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    function removeTask(id: string, todoListId: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== id)});
    }
    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], task]});
    }
    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId
                ? { ...t, isDone: isDone }
                : t
            )})
        //setTasks([todoListID]: tasks[todoListID].map(tl => taskId === tl.id ? {...tl, tl.isDone = isDone} : tl));
    }
    function changeFilter(value: FilterValuesType, todoListID: string) {
        // let todoList = todoLists.find(tl => tl.id === todoListID)
        setTodoLists([...todoLists].filter(td => td.id === todoListID ? td.filter = value : td));
    }
    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todoLists.map(td => {
                let tasksForTodolist = tasks[td.id];

                if (td.filter === "active") {
                    tasksForTodolist = tasks[td.id].filter(t => !t.isDone);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={td.id}
                        id={td.id}
                        title={td.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={td.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;

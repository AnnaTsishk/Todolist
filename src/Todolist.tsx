import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditabelSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import { Task } from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./app/hooks";
import {AppRootStateType} from "./state/store";



export type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (id:string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string)=>void
    addTask: (newTaskTitle: string, todolistId: string) => void
    removeTask: (todolistId: string,taskId: string)=> void
    changeTaskStatus:(taskId: string, status:TaskStatuses, todolistId: string)=>void
    changeTaskTitle:(taskId: string, newTitle:string, todolistId: string)=>void
}
export const Todolist = React.memo(function (props: TodolistType) {

const  dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTasksTC (props.id))
    }, [])

    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id)
    }, [props.addTask, props.id]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.filter)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.filter)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.filter)
    }, [props.changeFilter, props.id])


    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    // let tasksForTodolist = tasks

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed) ;
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>{
                tasksForTodolist.map(task =>
                    <Task
                        task={task}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={task.id}/>)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : 'text'}
                        onClick={(e) => {
                            onAllClickHandler()
                        }}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : 'text'}
                        onClick={(e) => {
                            onActiveClickHandler()
                        }}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : 'text'}
                        onClick={(e) => {
                            onCompletedClickHandler()
                        }}>Completed</Button>
            </div>
        </div>

    );
})

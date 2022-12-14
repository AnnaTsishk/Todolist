import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";



export type RemoveTaskActionType ={
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType={
    type: "ADD-TASK"
    title: string
    todolistId: string

}
export type ChangeTaskStatusActionType={
    type:'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string

}
export type ChangeTaskTitleActionType={
    type:'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}


export type ActionsType = RemoveTaskActionType|AddTaskActionType|
    ChangeTaskStatusActionType|ChangeTaskTitleActionType|
    AddTodolistActionType|RemoveTodolistActionType

const initialState:TasksStateType ={}

export const tasksReducer = (state: TasksStateType= initialState, action: ActionsType): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK": {
            const stateCopy={...state};
            const tasks=state[action.todolistId]
            const filteredTasks= tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId]=filteredTasks
            return stateCopy;
        }
        case "ADD-TASK":{
            const stateCopy={...state}
            const tasks = stateCopy[action.todolistId]
            const newTask={id: v1(), title: action.title, isDone: false}
            const newTasks=[newTask, ...tasks];
            stateCopy[action.todolistId]=newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS':{
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            stateCopy[action.todolistId]=tasks.map(task=> task.id === action.taskId
                ? {...task, isDone:action.isDone}
                : task)
            const task = tasks.find(task=>task.id===action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE':{
            const stateCopy={...state}
            const tasks=stateCopy[action.todolistId]
            const task = tasks.find(task=>task.id===action.taskId)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy={...state}
            stateCopy[action.title]=[];
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state;
            // throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC= (taskId: string, todolistId: string): RemoveTaskActionType =>{
    return {type:'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}
export const addTaskAC= (title: string, todolistId: string): AddTaskActionType =>{
    return {type:'ADD-TASK', title:title, todolistId:todolistId}
}
export const changeTaskStatusAC= (taskId: string, isDone:boolean, todolistId: string): ChangeTaskStatusActionType =>{
    return {type:'CHANGE-TASK-STATUS', taskId: taskId, todolistId: todolistId, isDone:isDone}
}
export const changeTaskTitleAC= (taskId: string, todolistId: string, newTitle: string): ChangeTaskTitleActionType =>{
    return {type:'CHANGE-TASK-TITLE', taskId: taskId, todolistId: todolistId,newTitle: newTitle}
}


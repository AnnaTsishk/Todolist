import React from 'react';
import axios from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi=2,
    urgently =3,
    Later = 4
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd8a07ad8-1225-42d0-8f3d-e923f741ec23y'
    }
}
const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

//api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise;
    },
    creteTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title: title})
        return promise;
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodolist(id:string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})

    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(taskTitle:string, todolistId:string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`,{title:taskTitle})
       
    },
    updateTask(todolistId:string, taskId:string, model: UpdateTaskType){
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)

    }
};

//types
type ResponseType<D={}>={
    resultCode: number
    messages: Array<string>,
    data: D
}
export type TodolistType={
    id:string
    title: string
    addedDate: string
    order:number
}
export type TaskType={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksResponse= {
    totalCount: number
    error: string
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export default todolistsAPI;
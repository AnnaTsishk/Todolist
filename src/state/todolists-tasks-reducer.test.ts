import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids solid be equals',()=> {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType>=[];

    const action = addTodolistAC ('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks=keys[0];
    const idFromTodolists= endTodolistsState[0].id

    expect(idFromTasks).toBe(action.title);
    expect(idFromTodolists).toBe(action.title);
})
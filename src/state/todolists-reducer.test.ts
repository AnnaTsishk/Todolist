import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistFilterAC, ChangeTodolistFilterActionType,
    changeTodolistTitletAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from "../App";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = " New Todolist";


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const endState = todolistsReducer(startState, {
    //     type: "ADD-TODOLIST",
    //     title: newTodolistTitle
    // })
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
    expect(endState[0].title).toBeDefined();

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = " New Todolist";


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const action = changeTodolistTitletAC(todolistId2, newTodolistTitle);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be change', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const action: ChangeTodolistFilterActionType = changeTodolistFilterAC(newFilter, todolistId2)
    const addState = todolistsReducer(startState, action)

    expect(addState[0].filter).toBe('all');
    expect(addState[1].filter).toBe(newFilter)
})
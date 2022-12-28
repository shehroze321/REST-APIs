const express=require("express");
const router=express.Router();

//  these are the controllers 
//  and er will create all of them in future

const {
    createTodo,
    getTodoById,
    getTodo,
    deleteTodo,
    getAllTodos,
    updateTodo
}=require("../controllers/Todo");

// params
//  it will fetch the value from the url
router.param("todoId",getTodoById);  // todoId is params which we pass and getTodoById is function which is imported from controllers
//  to get all todos
router.get("/todos/",getAllTodos);

// to get s single todo
router.get("/todo/:todoId/",getTodo);
//  to create a todo
router.post("/todo/create",createTodo);
//  update a todo
router.put("/todo/:todoId/update",updateTodo);

//  to delete dodo
router.delete("/todo/:todoId/delete",deleteTodo);

//  we will export the router to import it in index.js

module.exports=router;
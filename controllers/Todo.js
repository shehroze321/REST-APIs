const Todo= require("../models/Todo");

exports.getTodoById=(req,resp,next,todoId)=>{
    // todoId is coming from router.params
    // findById() method will find the todo which has id==todoId
    Todo.findById(todoId).exec((err,todo)=>{
        if(err || !todo){
            return resp.status(400).json({
                error:"404 do not found",
            });
        };
        //  store that todo in req.todo so that other function can use it 
        req.todo=todo;
        //  because this is middleware we have to call the next()
        //  which will pass the controller to the next function in the middleware stack
        next();
    });
};

exports.getAllTodos=(req,resp)=>{
    //  simply use .find() and it will return all the todos 
    Todo.find()
    .sort("-createAt")
    .exec((err,todos)=>{
        //  error checking
        if (err || !todos) {
        return resp.status(400).json({
            error: "Something went wrong in finding all todos",
        });
    };
    // return all the todos in json format
    resp.json(todos);
    });
};
exports.getTodo = (req, resp) => {
    // this is pretty simple because we've already defined a middleware
    // to get a todo from the URL id
    // this req.todo is coming from that middleware
    return resp.json(req.todo);
  };
  exports.createTodo = (req, resp) => {
    // we will get json data from the frontend i.e. req.body
    const todo = new Todo(req.body);
  
    // create a todo instance by passing 'task' field from 'req.body'
    todo.save((err, task) => {
      if (err || !task) {
        return resp.status(400).json({
          error: "something went wrong",
        });
      }
      // todo is created
      // send the created todo as json response
      resp.json({ task });
    });
  };
  exports.updateTodo = (req, resp) => {
    // take req.todo from getTodoById() middleware and
    // fetch the todo that user wants to update
    const todo = req.todo;
    // simply change the task of the todo that user want to update by
    // the task that user has sent in req.body.task
    todo.task = req.body.task;
  
    // simply save that updated todo
    todo.save((err, t) => {
      if (err || !t) {
        return resp.status(400).json({
          error: "something went wrong while updating",
        });
      }
      // send the updated todo as a json response
      resp.json(t);
    });
  };

  //  function to update a todo 
  exports.deleteTodo=(req,resp)=>{
    // take req,todo  from getodoById() middleware and fetch the todo that user wants to delete 
    const todo=req.todo;
    //  call .remove() method to delete it 
    todo.remove((err,task)=> {
      if(err || !task){
        return resp.status(400).json({
          error: "something went wrong while deleting the todo "
        });
      };
      // send deleted todo and success message as a json response 
      resp.json({
        task_deleted:task,
        message:"Todo deleted successfuly",
      });
    });
  };
  //require database details
  var db = require('C:/Users/Swathi/.atom/project/project2-ToDoApp/model/dbDetails.js');
  //require body parser for getting response typed by user
  var bodyparser = require('body-parser');

  //create a schema(blueprint of our data)
  var todoSchema = new db.mongoose.Schema({
    item:String
  });

  //create a model
  var Todo = db.mongoose.model('Todo',todoSchema);

  module.exports = function(app){

    app.use(bodyparser.urlencoded({
      extended:true
    }));

    app.route('/todo')
    //home page is displayed
    .get((req,res)=>{

      //get the tasks from database
      Todo.find({}, function(err, tasks) {
        if (err) throw err;
      res.render('todo',{tasks:tasks,error:false});
  })
  })
    .post((req,res)=>{
    if(req.body.task)
    {
      //check if task already exists
      Todo.find({ item:req.body.task.toLowerCase()},function(err,result){
        if(err) throw err;
        else{
          //if task doesn't exist insert into database
          if(isEmptyObject(result)){
            Todo({item:req.body.task.toLowerCase()}).save(function(err,result){
              if(err) throw err;
              res.redirect('todo');
          });
        }
          //else do nothing
          else{
            res.redirect('todo');
          }
        }
      });
    }

  //delete task
    else if(req.body.deleteTask){
      Todo.deleteOne({item:req.body.deleteTask},function(err,obj){
        if (err) throw err;
        res.redirect("/todo");
      })
    }
  });

  //function to check if object array is empty
  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }
  }

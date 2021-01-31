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

//home page is displayed
app.get('/todo',(req,res)=>{
    //message is set to false because both get and post render to the same page
    res.render('todo',{message:false,error:false});
});

app.post('/todo',(req,res)=>{

  //check if task already exists
  Todo.find({ item:req.body.task.toLowerCase()},function(err,result){
    if(err) throw err;
    else{

      //if task doesn't exist insert into database
      if(isEmptyObject(result)){
        Todo({item:req.body.task}).save(function(err,result){
          if(err) throw err;
          res.render('todo',{message:'success',error:false});
      });}

      //else send alert to user to enter different task
      else{
        res.render('todo',{message:false,error:'success'});
      }
    }
  });

});

//query the task and display
app.get('/displayTask',(req,res)=>{
  Todo.find({}, function(err, tasks) {
   if (err) throw err;
   res.render('displayTask',{tasks:tasks,message:false});
 })

});

//delete task
app.post('/displayTask',(req,res)=>{
  Todo.deleteOne({item:req.body.deleteTask},function(err,obj){
    if (err) throw err;
    res.render('displayTask',{tasks:false,message:'success'});
  })

});

//function to check if object array is empty
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
}

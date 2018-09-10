var ViewController = ( function(){

  // public method for setter and getter
  return {
    
    getData: function(){
      return {
        task: document.getElementById('new-list').value
      }
    },

    testing: function(){
      console.log(document.getElementById('new-list').value);
    },

    addList: function(task){
      var taskHtml;
  
      taskHtml = 
        '<li id="list-%id%" class="single-list">' +
          '<div class="title-list">' +
            '<input type="checkbox" class="checked-list">' +
            '%desc%' +
          '<a href="" id="delete-list">Delete</a>' +
          '</div>' +
        '</li>';

      taskHtml = taskHtml.replace('%id%', task.id);
      taskHtml = taskHtml.replace('%desc%', task.desc);
  
      document.getElementById('list').insertAdjacentHTML('beforeend', taskHtml);
    },

    deleteList: function(elementId){
      var el;

      el = document.getElementById(elementId);
      el.parentNode.removeChild(el);
    },

    clearField: function(){
      document.getElementById('new-list').value = '';
    }
  }
})();

var TaskController = ( function(){
  
  var Task = function(id, desc, status){
    this.id = id;
    this.desc = desc;
    this.isCompleted = status;
  }

  var data = {
    task: []
  }

  return {

    addData: function(task){
      var id, newTask;

      // count id for the next task base on the latest id at the end of array
      if (data.task.length > 0){
        id = data.task[data.task.length - 1].id + 1;
      } else{
        id = 1;
      }

      // create the new task
      newTask = new Task(id, task, false);

      // store the task to the data structure
      data.task.push(newTask);

      // return the new task created before 
      return newTask;
    },

    deleteData: function(id){
      var ids, index;

      console.log('delete data method on task controller has ben clicked');

      ids = data.task.map( function (cur){
        return cur.id;
      });

      index = ids.indexOf(id);

      if (ids !== -1){
        data.task.splice(index, 1);
      }
    },

    checkData: function(){
      console.log(data);
    }

  }

})();

var AppController = ( function(ctrlView, ctrlTask){

  var setupEventListener = function(){
    
    // event for add data when add list button clicked
    document.getElementById('btn-add').addEventListener('click', addTask);

    // event for add data if enter button pressed
    document.addEventListener('keypress', function(e){
      if (e.keyCode === 13) {
        addTask();
      }
    });

    document.getElementById('list').addEventListener('click', function(e){
      e.preventDefault();
      deleteTask(e);
    })
  }
  
  var addTask = function(){

    var input, task;

    // get input from the view controller
    input = ctrlView.getData();

    // create and add new task to the task controller 
    task = ctrlTask.addData(input.task);

    // add and update the view
    ctrlView.addList(task);

    // clear the input form
    ctrlView.clearField();
  
  }

  var deleteTask = function(e){
    var listId, splitId, id;
    
    listId = e.target.parentNode.parentNode.id;
    splitId = listId.split('-');
    id = parseInt(splitId[1]);

    // 1. delete task from the model and data structure
    ctrlTask.deleteData(id);

    // 2. update the UI
    ctrlView.deleteList(listId);
  }

  return {

    init: function(){
      setupEventListener();
      console.log('Todo has been started');
    }
      
  };

})(ViewController, TaskController);

AppController.init();
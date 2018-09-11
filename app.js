var ViewController = ( function(){

  // public method for setter and getter
  return {
    
    // method for return the data added in input fields
    getData: function(){
      return {
        task: document.getElementById('new-list').value
      }
    },

    // method for update the new list to the ui
    addList: function(task){
      var taskHtml;
  
      taskHtml = 
        '<li id="list-%id%" class="single-list">' +
          '<span class="title-list">' +
            '%desc%' +
            '<a href="" class="text-right" id="delete-list">Delete</a>' +
          '</span>' +
        '</li>';

      taskHtml = taskHtml.replace('%id%', task.id);
      taskHtml = taskHtml.replace('%desc%', task.desc);
  
      document.querySelector('.list').insertAdjacentHTML('beforeend', taskHtml);
    },

    // method for delete list from the ui
    deleteList: function(elementId){
      var el;

      el = document.getElementById(elementId);
      el.parentNode.removeChild(el);
    },

    // method for cleat input fields after task added
    clearField: function(){
      document.getElementById('new-list').value = '';
    }
  }
})();

var TaskController = ( function(){
  
  // constructor for create new added task
  var Task = function(id, desc, status){
    this.id = id;
    this.desc = desc;
    this.isCompleted = status;
  }

  // data structure for store task list
  var data = {
    task: []
  }

  return {

    // method for create new task and add data to the data structure
    addData: function(task){
      var id, newTask;

      // count id for the next task base on the latest id at the end of array
      if (data.task.length > 0){
        id = data.task[data.task.length - 1].id + 1;
      } else{
        id = 1;
      }

      newTask = new Task(id, task, false);

      data.task.push(newTask);

      return newTask;
    },

    // method for delete task data from the data structure
    deleteData: function(id){
      var ids, index;

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

  // method for setup or initialize the event listener when app started
  var setupEventListener = function(){
    
    // event for add data when add list button clicked
    document.getElementById('btn-add').addEventListener('click', addTask);

    // event for add data if enter button pressed
    document.addEventListener('keypress', function(e){
      if (e.keyCode === 13) {
        addTask();
      }
    });

    // event for delete data when the delete button clicked 
    document.querySelector('.list').addEventListener('click', function(e){
      e.preventDefault();
      deleteTask(e);      
    });
  }

  var changeBackgroundList = function(){
    console.log('checkbox clicked');
  }
  
  // method to controll the add new task functionality
  var addTask = function(){
    var input, task;

    // get input
    input = ctrlView.getData();

    // update data structure
    task = ctrlTask.addData(input.task);

    // update list with new task
    ctrlView.addList(task);

    // clear input fields
    ctrlView.clearField();
  }

  // method for control delete task functionality with event delegation
  var deleteTask = function(e){
    var listId, splitId, id;
  
    listId = e.target.parentNode.parentNode.id;

    splitId = listId.split('-');
    id = parseInt(splitId[1]);
    
    // delete the task data 
    ctrlTask.deleteData(id);
    
    // update the UI
    ctrlView.deleteList(listId);
  }

  return {

    // method for setup event listener whom can be accessed from the outside
    init: function(){
      setupEventListener();
      console.log('App has been started');
    }
    
  };

})(ViewController, TaskController);

AppController.init();
<template>
  <div class="index container">
    <div class="card" v-for="(task, key, index) in tasksList" :key="task.id" >
      <div class="card-content">
        <i class="material-icons delete" @click="deleteTask(task.id)">delete</i>
        <h2 class="indigo-text"> {{task.name}}</h2>
        <ul class="task">
          <li class="task-list" v-for="(item, index) in task.tasks" :key="index">
            <span class="chip task-item"  :class="changeClass(item.priority)" > {{ item.name }}</span>
            <span @click="changeStatus(item, task.id, tasksList.index)">
              <i v-if="item.done" class="material-icons check">check</i>
              <i v-else-if="!item.done" class="material-icons clear">clear</i>
            </span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditTask', params: {list_slug: task.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Task',
    data(){
      return {
        tasksList: [],
        oneList: [],
        classItem: 'red',
      }
    },
    methods: {
      deleteTask(id){
        db.collection('list').doc(id).delete()
          .then(()=>{
            this.tasksList = this.tasksList.filter(task => {
              return  task.id != id
            })
          })
      },
      changeStatus(item, id, index){
        item.done = !item.done;
        this.oneList = this.tasksList.filter(task => {
          return  task.id == id
        })
        db.collection('list').doc(id).update({
            tasks:  this.oneList[0].tasks
        }).then(err => {
          console.log(err)
        });

      },
      changeClass(item){
        if(item === 'high'){
          return 'red'
        }else if (item === 'medium'){
          return 'orange'
        }else {
          return 'yellow'
        }
      }
    },
    created(){
      db.collection('list').get()
        .then(response => {
          response.forEach(doc => {
            let list = doc.data();
            list.id = doc.id;
            this.tasksList.push(list);
            console.log(this.tasksList)
          })
      })
    }
  }

</script>

<style>
  .index{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
    grid-gap: 30px;
    margin-top: 60px;
  }
  .index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .index .task{
    margin: 30px auto;
  }
  .index .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }

  .material-icons {
    cursor: pointer;
  }

  .task-list {
    display: flex;
  }

  .task-item{
    margin-right: auto;
  }


</style>

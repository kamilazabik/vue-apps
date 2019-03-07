<template>
  <div class="add-task container z-depth-1">
    <h2 class="center-align indigo-text">Add New List</h2>
    <form @submit.prevent="AddList">
      <div class="field title">
        <label >List name:</label>
        <input type="text" name="title" v-model="name">
      </div>
      <div class="field" v-for="(ts, index) in tasks" :key="index">
        <label >Task</label>
        <p class="chip"   :class="changeClass(tasks[index].priority)" > {{ tasks[index].name }}</p>
        <i class="material-icons delete" @click="deleteTask(ts)">delete</i>
      </div>
      <div  class="row">
        <div class="field add-ingredient col s5">
          <label >Add a new task</label>
          <input type="text" name="add-ingredient" v-model="another" >
        </div>
        <div class="field col s5">
          <label class="select-label">Set priority</label>
          <select v-model="selected">
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <div class="col s2 add-button">
          <button class="btn-floating btn-small waves-effect waves-light  teal accent-4" @click.prevent="addTask"><i class="material-icons">add</i></button>
        </div>
      </div>


      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Task</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export  default {
    name: 'AddTask',
    data(){
      return{
        name: null,
        tasks: [],
        done: null,
        feedback: null,
        another: null,
        selected: null,
        slug: null
      }
    },
    methods: {
      AddList(){
        if(this.name){
          this.feedback = null;
          this.slug =slugify(this.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          });

          db.collection('list').add({
            name: this.name,
            tasks: this.tasks,
            slug: this.slug
          }).then(()=>{
            this.$router.push({name: 'Task'})
          }).then(err => {
            console.log(err)
          })
        }
      },
      addTask(){
        if(this.another){
          console.log(this.another);
          let item = {
           name: this.another,
            priority: this.selected,
            done: false
          }
          this.tasks.push(item);
          this.another = null;
          this.feedback = null;
          console.log(this.tasks);
        }else {
          this.feedback = "You must enter a value to add a task"
        }
      },
      deleteTask(ts){
        this.tasks = this.tasks.filter(task => {
          return task != ts;
        })
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

    }
  }

</script>

<style scoped>
  .add-task label {
    display: block;
  }

  .add-task .select-label {
    position: relative;
    left: 0;
  }

  .add-button {
    margin-top: 30px;
    text-align: right;
  }

  .add-task select {
    display: block;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    font-size: .8rem;
  }

  .add-task{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .add-task h2{
    font-size: 2em;
    margin: 20px auto;
  }
  .add-task .field{
    margin: 20px auto;
    position: relative;

  }
  .add-task .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>

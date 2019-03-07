<template>
  <div class="add-task container z-depth-1" v-if="list">
    <h2 class="center-align indigo-text">Edit {{list.name}} List</h2>
    <form @submit.prevent="EditList">
      <div class="field title">
        <label >List name:</label>
        <input type="text" name="title" v-model="list.name">
      </div>
      <div class="row"  v-for="(ts, index) in list.tasks" :key="index">
        <div class="field col s5">
          <label >Task</label>
          <input type="text" name="ingredient" v-model="list.tasks[index].name">
        </div>
        <div class="field col s5">
          <label class="select-label">Set priority</label>
          <select v-model="list.tasks[index].priority">
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <div class="col s2 field delete-icon">
          <i class="material-icons delete" @click="deleteTask(ts)">delete</i>
        </div>
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
        <button class="btn pink">Update Task</button>
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
        list: null,
        another: null,
        feedback: null,
        selected: null,
      }
    },
    methods: {
      EditList(){
        if(this.list.name){
          this.feedback = null;
          this.list.slug =slugify(this.list.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          console.log(this.list)
          db.collection('list').doc(this.list.id).update({
            name: this.list.name,
            tasks: this.list.tasks,
            slug: this.list.slug
          }).then(()=>{
            this.$router.push({name: 'Task'})
          }).then(err => {
            console.log(err)
          })
        }else {
          this.feedback = 'You must enter a list title'
        }
      },
      addTask(){
        if(this.another){
          console.log(this.another);
          let item = {
            name: this.another,
            priority: this.selected,
            done: false
          };
          this.list.tasks.push(item);
          this.another = null;
          this.feedback = null;
        }else {
          this.feedback = "You must enter a value to add a task"
        }
      },
      deleteTask(ts){
        this.list.tasks = this.list.tasks.filter(task => {
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

    },
    created(){
      let ref = db.collection('list').where('slug', '==', this.$route.params.list_slug);
      ref.get().then(snapshot => {
        snapshot.forEach(doc=> {
          this.list = doc.data();
          this.list.id = doc.id;
        })
      })
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

  .add-task .delete-icon {
    margin-top: 60px;
    text-align: right;
  }
  .add-task .delete{
    /*position: absolute;*/
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>

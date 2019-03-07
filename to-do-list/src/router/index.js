import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Task',
      component: Task
    },
    {
      path: '/add-list',
      name: 'AddTask',
      component: AddTask
    },
    {
      path: '/edit-list/:list_slug',
      name: 'EditTask',
      component: EditTask
    }
  ]
})

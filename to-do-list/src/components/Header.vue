<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Task' }">
          <span class="nav-title">TO DO LIST</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{name: 'AddTask'}">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data(){
      return{

      }
    }

  }
</script>

<style>
  .navbar nav {
    padding: 0 20px;
  }

  .nav-concent {
    position: relative;
  }
</style>

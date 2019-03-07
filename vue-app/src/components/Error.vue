<template>
  <div class="alert alert-danger text-center">
    <h1>Wrong, try again!</h1>
    <hr>
    <button class="btn btn-primary" @click="onNextQuestion">Try again</button>
  </div>
</template>
<style>

</style>
<script>

  export default{
    methods: {
      onNextQuestion() {
        this.$emit('confirmed');
      }
    }
  }
</script>

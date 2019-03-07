<template>
  <div class="alert alert-primary text-center">
    <h1>You have {{ points }} points!</h1>
    <h1>Go to the next level</h1>
    <hr>
    <button class="btn btn-primary" @click="onNextQuestion">Next Level</button>
  </div>
</template>
<style>

</style>
<script>

  export default{
    props: ['points'],
    methods: {
      onNextQuestion() {
        this.$emit('confirmed');
      }
    }
  }
</script>

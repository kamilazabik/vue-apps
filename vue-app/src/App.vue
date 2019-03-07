<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xs-12 col-sm-8 col-md-6 mt-5 mb-3">
                <h1 class="text-center">The Quiz</h1>
            </div>
        </div>
        <hr>
      <div class="row justify-content-center">
        <div class="col-xs-10 col-sm-6 col-md-6 mb-5 mt-4">
          <button class="btn btn-primary" @click="setType('1', round)">Subtraction</button>
          <button class="btn btn-primary" @click="setType('2', round)">Adding</button>
          <button class="btn btn-primary" @click="setType('3', round)">Multiplication</button>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 mb-5 mt-4">
          <h3>Points: {{points}}</h3>
        </div>
      </div>


        <div class="row justify-content-center" v-if="show">
            <div class="col-xs-12 col-sm-8 col-md-8">
              <transition name="flip" mode="out-in">
                <component :is="mode" @answered="answered($event, round)"
                           @confirmed="mode = 'app-question'"
                           :questionType="questionType"
                           :round="round"
                            :points = "points">

                </component>
              </transition>


            </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from './main'
    import Question from './components/Question.vue';
    import Answer from './components/Answer.vue';
    import Error from './components/Error.vue';
    import Level from './components/Level.vue';

    export default {
        data() {
            return {
              mode: 'app-question',
              show: '',
              questionType: '1',
              round: '1',
              points: '0',
              levels: [5,10,15]
            }
        },
      methods: {
        answered(isCorrect, roundNumber) {
          if (isCorrect && roundNumber !== 5 && isCorrect && roundNumber !== 10 && isCorrect && roundNumber !== 15 ) {
            this.mode = 'app-answer';
            this.round++;
            this.points++;
            console.log(roundNumber !== 5 )
          } else if(isCorrect && roundNumber == 5 || isCorrect && roundNumber == 10 || isCorrect && roundNumber == 15 ){
            this.mode = 'app-level';
            this.round++;
            this.points++;
            console.log(roundNumber)
          } else {
            this.mode = 'app-error';
            this.round = '1';
            this.points = '0';
            console.log(this.round)
          }
        },

        showSub(){
          this.show = 'show';
        },

        getQuestion(type, round){
          eventBus.$emit('getQuestion', type, round)
        },

        setType(type, round){
          this.show = 'show';
          this.questionType = type;
          this.round = 1;
          this.getQuestion(type, this.round);
        }

      },

      components: {
        appQuestion: Question,
        appAnswer: Answer,
        appError: Error,
        appLevel: Level
      }
    }
</script>

<style>
  .flip-enter {
    transform: rotateY(0deg);
  }

  .flip-enter-active {
    animation: flip-in 0.5s ease-out forwards;
  }

  .flip-leave {
    transform: rotateY(0deg);
  }

  .flip-leave-active {
    animation: flip-out 0.5s ease-out forwards;
  }

  @keyframes flip-out{
    from{
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(90deg);
     }
  }

  @keyframes flip-in{
    from{
      transform: rotateY(90deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }

</style>


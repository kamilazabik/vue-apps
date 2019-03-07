<template>
    <div class="card text-center">
        <div class="panel-heading pt-3">
            <h3 class="panel-title text-center">{{ question }}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-xs-12 col-sm-6 text-center">
              <button class="btn btn-primary btn-lg"
                      style="margin: 10px"
                      @click="onAnswer(answers[0].correct, round)">{{answers[0].number}}</button>
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
              <button class="btn btn-primary btn-lg" style="margin: 10px" @click="onAnswer(answers[1].correct, round)">{{answers[1].number}}</button>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 text-center">
              <button class="btn btn-primary btn-lg" style="margin: 10px" @click="onAnswer(answers[2].correct, round)">{{answers[2].number}}</button>
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
              <button class="btn btn-primary btn-lg" style="margin: 10px" @click="onAnswer(answers[3].correct, round)">{{answers[3].number}} </button>
            </div>
          </div>
          <p> {{questionType}}</p>
        </div>
    </div>
</template>
<style>

</style>
<script>
  import {eventBus} from '../main'

    export default{
      props: ['questionType', 'round'],
      data: function() {
        return {
          answers: [ {number: '', correct: false},
            {number: '', correct: false},
            {number: '', correct: false},
            {number: '', correct: false},],
          correctAnswer: '',

        }
      },
      methods: {
          getQuestion(n, r){
            let correctNumber;
            let firstNumber;
            let secondNumber;
            const correctBtn = Math.round(Math.random() * 3);

            console.log(this.round);
            console.log(r);


            switch (n) {
              case '1':
                firstNumber =  this.generateNumber(0, r * 20);
                secondNumber =  this.generateNumber(0, r * 20);
                correctNumber = firstNumber - secondNumber;
                this.question = 'What is ' +  firstNumber +' - '+  secondNumber + '?';
                break;
              case '2':
                firstNumber =  this.generateNumber(r * 10, r * 20);
                secondNumber =  this.generateNumber(r * 10, r * 20);
                correctNumber = firstNumber + secondNumber;
                this.question = 'What is ' +  firstNumber +' + '+  secondNumber + '?';
                break;
              case '3':
                firstNumber =  this.generateNumber(r * 2, r * 4);
                secondNumber =  this.generateNumber(r * 2, r * 4);
                correctNumber = firstNumber * secondNumber;
                this.question = 'What is ' +  firstNumber +' * '+  secondNumber + '?';
                break;
              default:
//                correctAnswer = 0;
                this.question = 'Oops, an Error occurred :/';
            }

            if (n === '1'){
              this.answers[0] = {number : this.generateNumber(r * 20, 0, correctNumber), correct: false };
              this.answers[1] = {number : this.generateNumber(r * 20, 0, correctNumber), correct: false };
              this.answers[2] = {number : this.generateNumber(r * 20, 0, correctNumber), correct: false };
              this.answers[3] = {number : this.generateNumber(r * 20, 0, correctNumber), correct: false };
            }else if (n === '2'){
              this.answers[0] = {number : this.generateNumber(r * 20, r * 40, correctNumber), correct: false };
              this.answers[1] = {number : this.generateNumber(r * 20, r * 40, correctNumber), correct: false };
              this.answers[2] = {number : this.generateNumber(r * 20, r * 40, correctNumber), correct: false };
              this.answers[3] = {number : this.generateNumber(r * 20, r * 40, correctNumber), correct: false };
            }else {
              this.answers[0] = {number : this.generateNumber(Math.pow(r* 2, 2), Math.pow(r* 4, 2), correctNumber), correct: false };
              this.answers[1] = {number : this.generateNumber(Math.pow(r* 2, 2), Math.pow(r* 4, 2), correctNumber), correct: false };
              this.answers[2] = {number : this.generateNumber(Math.pow(r* 2, 2), Math.pow(r* 4, 2), correctNumber), correct: false };
              this.answers[3] = {number : this.generateNumber(Math.pow(r* 2, 2), Math.pow(r* 4, 2), correctNumber), correct: false };
            }

            this.answers[correctBtn] =  {number : correctNumber, correct: true };

          },
        onAnswer(isCorrect, roundNumber) {
          this.$emit('answered', isCorrect, roundNumber);
        },

        generateNumber(min, max, except){
            const number1 = Math.round(Math.random() * (max - min)) + min;

          if (number1 === except) {
            return this.generateNumber(min, max, except);
          }
            return number1
        },

      },


      mounted() {
        eventBus.$on('getQuestion', this.getQuestion)
      },
      created() {
        this.getQuestion(this.questionType, this.round);
      },


    }
</script>

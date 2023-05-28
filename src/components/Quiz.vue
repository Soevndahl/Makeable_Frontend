<script setup lang="ts">
import { ref } from 'vue';
import {userStore} from "../stores/counter"

const props = defineProps({
  difficulty: { type: String, required: true }
})

// const token = userStore();
const token = localStorage.getItem("token");

interface Question {
    number: number,
    answers: [
        one: string,
        two: string,
        three: string,
        four: string,
    ],
    correct: string
}

const quizData = ref();
let quizAnswers: { answers: { one: any; two: any; three: any; four: any; }; correct: any; selectedAnswerIndex: number | any}[] = []

getQuiz();



function calculateResult() {
  let correctAnswers = 0;
  for (let i = 0; i < quizAnswers.length; i++) {
    if (quizAnswers[i].selectedAnswerIndex === quizAnswers[i].correct) {
      correctAnswers++;
    }
  }
  let QuizResult = userStore().result;
  QuizResult.onGoing = false;
  QuizResult.score = correctAnswers;
}

function getAnswersforQuestion (question:any) {
    const data =     {
    answers: {
        one: question.correct_answer,
        two: question.incorrect_answers[0],
        three: question.incorrect_answers[1],
        four: question.incorrect_answers[2],
    },
    correct: "one",
    selectedAnswerIndex: null
    }
    quizAnswers.push(data);
}

async function getQuiz() {

    const url = `https://opentdb.com/api.php?amount=10&category=21&difficulty=${props.difficulty}&type=multiple&token=${token}`;

    console.log(url);
    try {
        const result = await fetch(url, { 
            method: "GET"
         });

        const apiData = await result.json();
        quizData.value = apiData.results;
        return result.ok;
    } catch (error) {
        console.log(error);
        return false;
        }
}


function decodeText (htmltext: string) {
    var text = document.createElement("textarea");
    text.innerHTML = htmltext;
    return text.value;
}

function updateSelectedAnswer(questionIndex: number, answerIndex: string) {
    quizAnswers[questionIndex].selectedAnswerIndex = answerIndex;
}

</script>

<template>

    <div id="main">
        <h1>{{ props.difficulty }} Quiz</h1>
    </div>
    <div v-for="(item, index) in quizData" :key="index">
        {{getAnswersforQuestion(item) }}

        <h1>Question {{ index+1 }}:</h1>
        <h2>{{ decodeText(item.question) }}</h2>

        <ol v-for="(item, itemIndex) in quizAnswers[index].answers" :key="itemIndex">
            <li>
                <input type="radio" :name="'question_' + index" :checked="itemIndex === quizAnswers[index].selectedAnswerIndex"
                @change="updateSelectedAnswer(index, itemIndex)"/> {{ item }}
            </li>
        </ol>

        <br>
    </div>
    <div id="buttondiv">

        <button type="button" @click="calculateResult">Result</button>
    </div>

</template>


<style scoped>

#main {
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: center;
    margin: 20px;
    font-weight: bold;
}

#buttondiv {
    display: flex;
    justify-content: center;
}

button {

    background-color: blueviolet;
    margin: 2px;
    border-radius: 5px;
    color: white;
    align-content: center;
    padding: 2px 10px 2px 10px;
}

</style>
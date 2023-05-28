import { ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const email = ref("test@123.dk");
  const password = ref("1234");
  const result = reactive({
    score: 0,
    onGoing: true
  });


  return { email, password, result }
})

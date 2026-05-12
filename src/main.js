import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import posthog from 'posthog-js'

posthog.init('phc_qKdRQWdtnUerPQ5eawHQqQnzqMUV2f7nSieCQmA55vZ2', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always'
})

createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import router from "./router";
import { createPinia } from "pinia";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import icons from './fontAwesome';

library.add({...icons})

const firebaseConfig = {
  apiKey: "AIzaSyBo3lRn6iMYsVk4r-VY6f0XLMLIeojOmGA",
  authDomain: "meu-projeto-c9001.firebaseapp.com",
  projectId: "meu-projeto-c9001",
  storageBucket: "meu-projeto-c9001.appspot.com",
  messagingSenderId: "938322050860",
  appId: "1:938322050860:web:6139f5cdf51d78552db689"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const usersCollection = collection(db, "users")

const pinia = createPinia();

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount("#app");

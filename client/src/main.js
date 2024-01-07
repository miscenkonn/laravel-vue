import "./assets/main.css";
// Import Bootstrap CSS file
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./storage";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ToastPlugin);
app.mount("#app");

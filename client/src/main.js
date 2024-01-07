import "./assets/main.css";
// Import Bootstrap CSS file
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./storage";
import router from "./router";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
            .then( reg => {

                // setTimeout(() => {
                    
                //     reg.sync.register('posteo-gatitos');
                //     console.log('Se enviaron fotos de gatitos al server');

                // }, 3000);
                Notification.requestPermission().then( result => {
            
                    console.log(result);
                    reg.showNotification('Hola Mundo!');
                    
            
                });

            });


            

}

createApp(App).use(store).mount("#app");

<template>
    <ion-page>
      <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size-sm="8" size-xs="12">
                    <ion-card>
                    <ion-card-content>
                        <ion-item>
                            <ion-img src="https://ovni.com/wp-content/uploads/2022/05/logo_ovnicom_236X85.png"></ion-img>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input label-placement="floating" v-model="email" type="email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input label-placement="floating" v-model="password" type="password"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-grid>
                                <ion-row class="ion-justify-content-between">
                                    <ion-col size="6" >
                                        <a class="ion-float-left">Olvide la contraseña</a>
                                    </ion-col>
                                    <ion-col size="6" >
                                        <a class="ion-float-right">Registrarme</a>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-item>
                        <ion-button expand="block" @click="login">Login</ion-button>
                    </ion-card-content>
                    </ion-card>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonButton, IonContent, IonLabel,IonPage, IonTitle, IonToolbar, IonHeader, IonCardTitle, IonCardHeader, IonCard, IonInput, IonCardContent, IonItem,
    IonGrid, IonRow, IonCol, IonImg
   } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { useIonRouter } from '@ionic/vue'; // Importar Ionic Vue Router
  import { useAuthStore } from '../../stores/auth';
  
  export default defineComponent({
    components: {
        IonContent, IonLabel,IonPage, IonTitle, IonToolbar, IonHeader, IonCardTitle, IonCardHeader, IonCard, IonInput, IonCardContent, IonItem, IonButton,
        IonGrid, IonRow, IonCol, IonImg
    },
    setup() {
      const ionRouter = useIonRouter(); // Cambiar a Ionic Router
      const authStore = useAuthStore();
      const email = ref<string>('');
      const password = ref<string>('');
  
      const login = async () => {
        try {
          await authStore.login({ email: email.value, password: password.value, device_name: email.value + ' device' });
          ionRouter.push('/dashboard'); // Cambiar a IonRouter
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
  
      return { email, password, login };
    },
  });
  </script>
  
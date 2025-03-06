<template>
    <ion-page>
      <ion-content class="ion-padding">
        <ion-grid>
            <ion-row>
                <ion-col></ion-col>
                <ion-col size-sm="8" size-xs="12">
                    <ion-card>
                    <ion-card-content class="ion-text-center">
                        <img src="https://ovni.com/wp-content/uploads/2022/05/logo_ovnicom_236X85.png"></img>
                        <ion-item class="ion-margin-top">
                          <ion-input label="Email" label-placement="floating" placeholder="Introduzca su correo" v-model="email" type="email"></ion-input>
                        </ion-item>
                        <p v-if="emailError" class="error-text">{{ emailError }}</p> <!-- Mostrar error -->
                        <ion-item class="ion-margin-top">
                            <ion-input label="Password" placeholder="*****" label-placement="floating" v-model="password" type="password"></ion-input>
                        </ion-item>
                        <p v-if="passwordError" class="error-text">{{ passwordError }}</p> <!-- Mostrar error -->
                        <ion-item class="ion-margin-top">
                            <ion-grid>
                                <ion-row class="ion-justify-content-between">
                                    <ion-col size="6" >
                                        <a @click="goToPage('forgot-password')" class="ion-float-left" style="font-size: 12px;">Olvide la contraseña</a>
                                    </ion-col>
                                    <ion-col size="6" >
                                        <a class="ion-float-right" style="font-size: 12px;">Registrarme</a>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-item>
                        <ion-button class="ion-margin-top" expand="block" @click="login">Ingresar</ion-button>
                    </ion-card-content>
                    </ion-card>
                </ion-col>
                <ion-col></ion-col>
            </ion-row>
            <ion-row>
              
            </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonButton, IonContent, IonLabel,IonPage, IonTitle, IonToolbar, IonHeader, IonCardTitle, IonCardHeader, IonCard, IonInput, IonCardContent, IonItem,
    IonGrid, IonRow, IonCol, IonImg, alertController,
   } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import { useIonRouter } from '@ionic/vue'; // Importar Ionic Vue Router
  import { useAuthStore } from '../../stores/auth';
import { AxiosError } from 'axios';
  
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
      const emailError = ref<string | null>(null);
      const passwordError = ref<string | null>(null);
      const errorMessage = ref<string | null>(null);

      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
  
      const login = async () => {
        emailError.value = null;
        passwordError.value = null;
        errorMessage.value = null;

        if (!email.value.trim()) {
          emailError.value = 'El correo electrónico es obligatorio.';
          return;
        } else if (!validateEmail(email.value)) {
          emailError.value = 'Ingrese un correo válido.';
          return;
        }

        if (!password.value.trim()) {
          passwordError.value = 'La contraseña es obligatoria.';
          return;
        } else if (password.value.length < 6) {
          passwordError.value = 'La contraseña debe tener al menos 6 caracteres.';
          return;
        }

        try {
          await authStore.login({ email: email.value, password: password.value, device_name: email.value + ' device' });
          ionRouter.push('/dashboard'); // Cambiar a IonRouter
        } catch (error: AxiosError | any) {
          errorMessage.value = authStore.errorMessage;
          console.error('Login failed:', error);
          presentAlert(errorMessage.value);

        }
      };

      const presentAlert = async (message: string | null) => {
        const alert = await alertController.create({
          header: 'Error',
          subHeader: 'Error al iniciar sesión.',
          message: message ?? 'Ocurrió un error al iniciar sesión. Por favor, intente de nuevo.',
          buttons: ['Ok'],
          cssClass: 'ovni-alert-error'
        });

        await alert.present();
      };

      const goToPage = (page: string) => {
        ionRouter.push(page);
      };
  
      return { email, password, login, emailError, passwordError, goToPage };
    },
  });
  </script>

<style scoped>
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.ovni-alert-error .alert-wrapper {
  color: red;
}
</style>
  
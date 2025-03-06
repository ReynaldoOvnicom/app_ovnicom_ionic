<template>
    <ion-page>
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col></ion-col>
            <ion-col size-sm="8" size-xs="12">
              <ion-card>
                <ion-card-content class="ion-text-center">
                  <img src="https://ovni.com/wp-content/uploads/2022/05/logo_ovnicom_236X85.png" />
  
                  <h2 class="ion-text-center ion-margin-top">Recuperar Contraseña</h2>
                  <p class="ion-text-center ion-margin-top">
                    Ingrese su correo y le enviaremos un enlace para restablecer su contraseña.
                  </p>
  
                  <ion-item class="ion-margin-top">
                    <ion-input
                      label="Email"
                      label-placement="floating"
                      placeholder="Introduzca su correo"
                      v-model="email"
                      type="email"
                      class="ion-margin-top"
                    ></ion-input>
                  </ion-item>
                  <p v-if="emailError" class="error-text">{{ emailError }}</p>
  
                  <ion-button class="ion-margin-top" expand="block" @click="resetPassword">
                    Enviar enlace
                  </ion-button>
                  <ion-button class="ion-margin-top" expand="block" fill="clear" @click="goToLogin">
                    Volver al Login
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col></ion-col>
          </ion-row>
        </ion-grid>
  
        <!-- Ion Alert para éxito o error -->
        <ion-alert
          :is-open="showAlert"
          :header="alertHeader"
          :message="alertMessage"
          :buttons="['OK']"
          @didDismiss="showAlert = false"
        ></ion-alert>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useIonRouter } from '@ionic/vue'
  import { useAuthStore } from '../../stores/auth';
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonItem, IonButton, IonAlert,
    IonInput
   } from '@ionic/vue'; 
  
  const authStore = useAuthStore()
  const ionRouter = useIonRouter()
  const email = ref<string>('')
  const emailError = ref<string | null>(null)
  const showAlert = ref<boolean>(false)
  const alertHeader = ref<string>('')
  const alertMessage = ref<string>('')
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  const resetPassword = async () => {
    emailError.value = null
    console.log(!email.value.trim())
    if (!email.value.trim()) {
      emailError.value = 'El correo electrónico es obligatorio.'
      return
    } else if (!validateEmail(email.value)) {
      emailError.value = 'Ingrese un correo válido.'
      return
    }
  
    await authStore.forgotPassword(email.value)
  
    if (authStore.errorMessage) {
      alertHeader.value = 'Error'
      alertMessage.value = authStore.errorMessage
    } else {
      alertHeader.value = 'Éxito'
      alertMessage.value = authStore.message || 'Se ha enviado un enlace a tu correo.'
    }
  
    showAlert.value = true
  }
  
  const goToLogin = () => {
    ionRouter.push('/login')
  }
  </script>
  
  <style scoped>
  .error-text {
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }
  </style>
  
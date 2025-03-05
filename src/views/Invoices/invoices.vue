<template>
  <ion-page>
      <ion-header>
          <ion-toolbar>
              <ion-buttons slot="start">
                  <ion-back-button @click="goBack"></ion-back-button>
              </ion-buttons>
              <ion-title>Facturas</ion-title>
              <ion-buttons slot="end">
                  <ion-button @click="logout">Logout</ion-button>
              </ion-buttons>
          </ion-toolbar>
      </ion-header>
  </ion-page>
</template>


<script setup>
import { useInvoiceStore } from '../../stores/invoiceStore';
import { useAuthStore } from '@/stores/auth';
import { useIonRouter } from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton } from '@ionic/vue';

const ionRouter = useIonRouter();
const authStore = useAuthStore();
const invoiceStore = useInvoiceStore();

// Función para cerrar sesión
const logout = () => {
    authStore.logout();
    ionRouter.push('/login');
  };
  
  // Función para volver atrás
  const goBack = () => {
    if (ionRouter.canGoBack()) {
      ionRouter.back();
    } else {
      ionRouter.push('/dashboard'); // Redirige a una página segura si no hay historial
    }
  };
</script>
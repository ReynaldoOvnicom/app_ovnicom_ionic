<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/dasboard"></ion-back-button>
          </ion-buttons>
          <ion-title>Mi cuenta</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="logout">Logout</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-spinner v-if="accountStore.loading"></ion-spinner>
        <p v-if="accountStore.error" class="error-message">{{ accountStore.error }}</p>
        <p v-if="accountStore.error" class="error-message">Contacte al equipo de soporte.</p>
        <ion-card v-if="accountStore.accountData && !accountStore.notFound">
    <ion-card-header>
      <ion-card-title>Saldo a la fecha</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-label>30 días</ion-label>
          <ion-note slot="end"><h2>45.00</h2></ion-note>
        </ion-item>
        <ion-item>
          <ion-label>60 días</ion-label>
          <ion-note slot="end"><h2>45.00</h2></ion-note>
        </ion-item>
        <ion-item>
          <ion-label>90 días</ion-label>
          <ion-note slot="end"><h2>10.00</h2></ion-note>
        </ion-item>
        <ion-item>
          <ion-label>120 días</ion-label>
          <ion-note slot="end"><h2>20.00</h2></ion-note>
        </ion-item>
        <ion-item>
          <ion-label><b>Saldo Total</b></ion-label>
          <ion-note slot="end"><h2>120.00</h2></ion-note>
        </ion-item>
      </ion-list>
    </ion-card-content>
    <ion-button expand="full" fill="clear">Pagar Saldo</ion-button>
  </ion-card>
        <ion-list v-if="accountStore.accountData && !accountStore.notFound">
          <ion-item :button="true" detail="true" @click="ionRouter.push('/invoices')">
              <ion-icon slot="start" :icon="rec"></ion-icon>
              <ion-label>Facturas</ion-label>
          </ion-item>
          <ion-item :button="true" detail="true">
              <ion-icon slot="start" :icon="ca"></ion-icon>
              <ion-label>Pagos</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useAccountStore } from '@/stores/accountStore'
  import { IonCard, useIonRouter } from '@ionic/vue';
  import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
    IonTitle, IonButton, IonList, IonItem, IonIcon, IonLabel, IonNote, IonThumbnail, IonCardContent, IonCardTitle, IonCardSubtitle,
    IonCardHeader, IonSpinner } from '@ionic/vue';
  import { receipt, cash } from 'ionicons/icons';
  
  // Stores y Router
  const authStore = useAuthStore();
  const accountStore = useAccountStore();
  const user = computed(() => authStore.user);
  const ionRouter = useIonRouter();
  const rec = receipt;
  const ca = cash;
  
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
  
  // Cargar perfil del usuario al montar el componente
  onMounted(() => {
    console.log("Usuario en authStore:", authStore.user);
    if (!authStore.user) {
      authStore.fetchUserProfile();
    }

    loadAccountData();
  });

  const loadAccountData = () => {
    const accountNumber = authStore.user?.user_profile?.account_number ?? '';

    if (!accountNumber) {
      console.warn("No hay número de cuenta disponible.");
      return;
    }

    console.log("Llamando a fetchAccountData con:", accountNumber);
    accountStore.fetchAccountData(accountNumber);

    console.log(accountStore.accountData)

  };
  </script>
  
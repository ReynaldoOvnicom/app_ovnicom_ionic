<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Dashboard</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="logout">Logout</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col><h3>Bienvenido, {{ user?.name }}</h3></ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h5>Mis cuentas</h5>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>04001783</ion-card-title>
                  <ion-card-subtitle>Número de cuenta</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <hr/>
                  <h1>32.00</h1>
                  <p>Saldo a la fecha</p>
                </ion-card-content>
                <ion-button fill="clear" @click="goToPage('2345')">Ver más</ion-button>
                <ion-button fill="clear">Pagar</ion-button>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>04001783</ion-card-title>
                  <ion-card-subtitle>Número de cuenta</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <hr/>
                  <h1>32.00</h1>
                  <p>Saldo a la fecha</p>
                </ion-card-content>
                <ion-button fill="clear">Ver más</ion-button>
                <ion-button fill="clear">Pagar</ion-button>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { defineComponent, computed, onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { IonButtons, IonButton, IonTitle, IonToolbar,IonContent, IonHeader, IonPage} from '@ionic/vue';
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { IonCol, IonGrid, IonRow } from '@ionic/vue';
  import { useIonRouter } from '@ionic/vue'; // Importar Ionic Vue Router

  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  const ionRouter = useIonRouter();

  function logout(){
    authStore.logout();
    ionRouter.push('/login');
  };

  function goToPage(accountNumber: string){
    console.log(accountNumber);
    localStorage.setItem('accountNumber', accountNumber);
    ionRouter.push(`/account`);
  }
  // lifecycle hooks
  onMounted(() => {
    console.log("Usuario en authStore:", authStore.user);
      if (!authStore.user) {
        authStore.fetchUserProfile();
      }
  })
  </script>
  
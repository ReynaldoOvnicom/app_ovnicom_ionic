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
      <ion-content>
        <h1>Bienvenido, {{ user?.name }}</h1>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { IonButtons, IonButton, IonTitle, IonToolbar,IonContent, IonHeader, IonPage} from '@ionic/vue';
  import { useIonRouter } from '@ionic/vue'; // Importar Ionic Vue Router
  
  export default defineComponent({
    components: {
        IonButtons, IonButton, IonTitle, IonToolbar,IonContent, IonHeader, IonPage
    },
    setup() {
      const authStore = useAuthStore();
      const user = computed(() => authStore.user);
      const ionRouter = useIonRouter(); // Cambiar a Ionic Router
  
      const logout = () => {
        authStore.logout();
        ionRouter.push('/login');
      };

      // Obtener perfil del usuario al montar el componente si aún no está cargado
    onMounted(() => {
      if (!authStore.user) {
        authStore.fetchUserProfile();
      }
    });
  
      return { user, logout };
    },
  });
  </script>
  
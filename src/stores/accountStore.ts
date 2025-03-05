import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../axios'

// Definimos la interfaz para tipar los datos de la cuenta
interface AccountData {
  account_no: string
  balance_favor: string
  current_balance: string
  bd_30: string
  bd_60: string
  bd_90: string
  bd_120: string
  bdb: string
}

export const useAccountStore = defineStore('accountStore', () => {
  const accountData = ref<AccountData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const notFound = ref<boolean>(false) // Estado para manejar errores 404

  // Función para obtener los datos de la cuenta desde la API
  const fetchAccountData = async (accountNo: string): Promise<void> => {
    loading.value = true
    error.value = null
    notFound.value = false // Reiniciamos el estado de "no encontrado"

    try {
      const { data } = await axios.get<AccountData>(`/api/account_data/${accountNo}`)
      console.log("Datos recibidos:", data)
      accountData.value = data
    } catch (err: any) {
        if (err.response) {
            if (err.response.status === 404) {
              error.value = 'Datos de la cuenta no encontrada.'
              notFound.value = true // Indica que no se encontró el recurso
            } else if (err.response.status === 500) {
              error.value = 'Error del servidor. Inténtalo más tarde.'
            } else {
              error.value = err.response.data?.message || 'Error desconocido al obtener los datos.'
            }
        } else if (err.request) {
            error.value = 'No se pudo conectar al servidor. Verifica tu conexión a internet.'
        } else {
            error.value = 'Error inesperado. Inténtalo más tarde.'
        }
        console.log("Error:", error.value)
    } finally {
      loading.value = false
    }
  }

  // Computed para obtener valores específicos sin acceder directamente al objeto
  const accountNumber = computed(() => accountData.value?.account_no || 'N/A')
  const currentBalance = computed(() => accountData.value?.current_balance || '0.00')
  const totalDebt = computed(() => accountData.value?.bdb || '0.00')

  return { accountData, loading, error, fetchAccountData, accountNumber, currentBalance, totalDebt }
})

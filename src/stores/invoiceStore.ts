import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// Definimos las interfaces para tipar los datos correctamente
interface Invoice {
  name: string
  id: number
  invoice_partner_display_name: string
  invoice_date: string
  invoice_date_due: string
  amount_untaxed_signed: number
  amount_total_signed: number
  amount_total_in_currency_signed: number
  payment_state: string
  state: string
}

interface InvoiceResponse {
  name: string
  account_no: string
  invoices: Invoice[]
}

export const useInvoiceStore = defineStore('invoiceStore', () => {
  const customerName = ref<string>('')
  const accountNumber = ref<string>('')
  const invoices = ref<Invoice[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Función para obtener las facturas desde la API
  const fetchInvoices = async (accountNo: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<InvoiceResponse>(`/api/invoice?accountNumber=${accountNo}`)
      customerName.value = response.data.name
      accountNumber.value = response.data.account_no
      invoices.value = response.data.invoices
    } catch (err) {
      error.value = 'Error al cargar las facturas'
    } finally {
      loading.value = false
    }
  }

  // Función para obtener solo las facturas no pagadas
  const getUnpaidInvoices = (): Invoice[] => invoices.value.filter(inv => inv.payment_state === 'not_paid')

  return { customerName, accountNumber, invoices, loading, error, fetchInvoices, getUnpaidInvoices }
})

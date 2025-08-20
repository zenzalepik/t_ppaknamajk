// src/helpers/fetchApiPengaturanGlobalLogo.js
import { fetchWithAuth } from '@/helpers/fetchWithAuth'

/**
 * Upload logo global setting
 * @param {FormData} formData - FormData berisi file logo dan tenant_id
 */
export const fetchApiGlobalLogoUpload = async (formData) => {
  try {
    if (!formData) throw new Error('FormData kosong');

    // FormData harus berisi field "logo"
    await fetchWithAuth({
      method: 'patch',
      endpoint: '/setting/global/logo',
      data: formData, // FormData langsung dikirim sebagai body
      isFormData: true, // optional flag kalau fetchWithAuth butuh
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

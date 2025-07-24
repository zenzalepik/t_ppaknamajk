// utils/fetchWithAuth.js

import axios from 'axios';
import { getToken } from '@/utils/db';
import { getErrorMessage } from '@/utils/errorHandler';
import DOMPurify from 'dompurify';
import strings from '@/utils/strings';

/**
 * Fungsi reusable untuk fetch API yang memerlukan token auth.
 * Token dienkripsi di IndexedDB dan didekripsi oleh `getToken`.
 *
 * @param {Object} config - Konfigurasi request
 * @param {'get'|'post'|'put'|'delete'} config.method - HTTP method
 * @param {string} config.endpoint - Relative endpoint, contoh: '/master-data/perusahaan'
 * @param {Object} [config.data] - Body (untuk POST/PUT)
 * @param {Object} [config.params] - Query param (untuk GET)
 * @returns {Promise<any>} Hasil dari `response.data.results`
 */
export async function fetchWithAuth({
  method = 'get',
  endpoint,
  data = null,
  params = null,

  stripOffset = true, // default: hapus offset
}) {
  const cleanedParams =
    params && stripOffset
      ? Object.fromEntries(
          Object.entries(params).filter(([key]) => key !== 'offset')
        )
      : params;

  const token = await getToken();
  if (!token) throw new Error('Token tidak ditemukan, harap login ulang.');

  try {
    const response = await axios({
      method,
      url: `${strings.apiUrl}${endpoint}`,
      data,
      // params,
      params: cleanedParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);

    if (!response.data.success) {
      throw new Error(
        DOMPurify.sanitize(response.data.message || 'Permintaan gagal.')
      );
    }

    return response.data.results;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

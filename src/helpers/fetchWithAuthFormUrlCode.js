import axios from 'axios';
import { getToken } from '@/utils/db';
import { getErrorMessage } from '@/utils/errorHandler';
import DOMPurify from 'dompurify';
import qs from 'qs';
import strings from '@/utils/strings';

/**
 * Fetch API dengan Content-Type: application/x-www-form-urlencoded
 * Data akan dikirim dalam bentuk URL-encoded string, bukan JSON.
 *
 * @param {Object} config - Konfigurasi request
 * @param {'post'|'put'} config.method - HTTP method
 * @param {string} config.endpoint - Relative endpoint, contoh: '/master-data/level'
 * @param {Object} config.data - Body form-encoded
 * @param {Object} [config.params] - Query param opsional
 * @returns {Promise<any>} response.data.results
 */
export async function fetchWithAuthFormUrlCode({
  method = 'post',
  endpoint,
  data,
  params = null,
}) {
  const token = await getToken();
  if (!token) throw new Error('Token tidak ditemukan, harap login ulang.');

  try {
    const response = await axios({
      method,
      url: `${strings.apiUrl}${endpoint}`,
      data: qs.stringify(data),
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

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

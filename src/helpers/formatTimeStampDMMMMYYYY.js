// src/utils/formatTimeStamp.js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.locale('id')

export default function formatTimeStampDMMMMYYYY(isoString) {
  if (!isoString || typeof isoString !== 'string') return '-'

  const date = dayjs.utc(isoString).tz('Asia/Jakarta')

  if (!date.isValid()) return 'Tanggal tidak valid'

  return date.format('dddd, D MMMM YYYY [pukul] HH:mm [WIB]')
}

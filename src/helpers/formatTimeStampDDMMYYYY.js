import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/id'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('id')

export default function formatTimeStampDDMMYYYY(isoString) {
  if (!isoString || typeof isoString !== 'string') return '-'

  const date = dayjs.utc(isoString).tz('Asia/Jakarta')

  if (!date.isValid()) return 'Tanggal tidak valid'

  return date.format('DD-MM-YYYY HH:mm:ss')
}

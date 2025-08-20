// hooks/usePengaturanGlobalFromLocal.js
import { useEffect, useState } from 'react';
import { getPengaturanGlobal } from '@/utils/dbGlobals';

export function usePengaturanGlobalFromLocal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPengaturanGlobal().then((result) => {
      if (result) {
        setData(result);
      }
    });
  }, []);

  return data;
}

import { RiBuildingLine, RiStore2Line, RiCodeBoxLine } from '@remixicon/react';

  const companyTypes = [
    {
      name: 'Pemilik Gedung',
      icon: <RiBuildingLine size={64} />,
      description: 'Mengelola dan memiliki gedung pada area lokasi parkir.',
    },
    {
      name: 'Tenant',
      icon: <RiStore2Line size={64} />,
      description: 'Penyewa atau penghuni ruangan di gedung lokasi parkir.',
    },
    // {
    //   name: 'Developer',
    //   icon: <RiCodeBoxLine size={64} />,
    //   description: 'Membangun dan mengembangkan properti atau teknologi.',
    // },
  ];

  export default companyTypes;

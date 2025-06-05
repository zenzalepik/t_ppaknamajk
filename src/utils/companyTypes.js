import { RiBuildingLine, RiStore2Line, RiCodeBoxLine } from '@remixicon/react';

  const companyTypes = [
    {
      name: 'Pemilik Gedung',
      icon: <RiBuildingLine size={64} />,
      description: 'Mengelola dan memiliki gedung atau properti.',
    },
    {
      name: 'Tenant',
      icon: <RiStore2Line size={64} />,
      description: 'Penyewa atau penghuni gedung untuk bisnisnya.',
    },
    {
      name: 'Developer',
      icon: <RiCodeBoxLine size={64} />,
      description: 'Membangun dan mengembangkan properti atau teknologi.',
    },
  ];

  export default companyTypes;

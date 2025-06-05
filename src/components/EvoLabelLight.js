import React from "react";
import { RiEyeLine, RiAddLargeLine, RiEditLine, RiDeleteBin2Line, RiDonutChartLine} from '@remixicon/react';

const getIcon = (action) => {
  switch (action) {
    case "create":
      return <RiAddLargeLine size={14} />;
    case "read":
      return <RiEyeLine size={14} />;
    case "update":
      return <RiEditLine size={14} />;
    case "delete":
      return <RiDeleteBin2Line size={14} />;
    default:
      return <RiDonutChartLine size={14} />;
  }
};

const getColor = (action) => {
    switch (action) {
      case "create":
        return "bg-blue-500/[0.12]"; // Warna untuk create
      case "read":
        return "bg-green-500/[0.12]"; // Warna untuk read
      case "update":
        return "bg-yellow-500/[0.12]"; // Warna untuk update
      case "delete":
        return "bg-red-500/[0.12]"; // Warna untuk delete
      default:
        return "bg-purple-500/[0.12]"; // Warna untuk aksi lain
    }
  };

  const getBorderColor = (action) => {
    switch (action) {
      case "create":
        return "border-blue-500"; // Warna untuk create
      case "read":
        return "border-green-500"; // Warna untuk read
      case "update":
        return "border-yellow-500"; // Warna untuk update
      case "delete":
        return "border-red-500"; // Warna untuk delete
      default:
        return "border-purple-500"; // Warna untuk aksi lain
    }
  };

  const getTextColor = (action) => {
    switch (action) {
      case "create":
        return "text-blue-500"; // Warna untuk create
      case "read":
        return "text-green-500"; // Warna untuk read
      case "update":
        return "text-yellow-500"; // Warna untuk update
      case "delete":
        return "text-red-500"; // Warna untuk delete
      default:
        return "text-purple-500"; // Warna untuk aksi lain
    }
  };

const EvoLabelLight = ({ text, className }) => {
  const labelColor = getColor(text.toLowerCase()); // Pastikan teks dikonversi ke lowercase agar sesuai dengan kondisi
  const labelIcon = getIcon(text.toLowerCase());
  const labelBorderColor = getBorderColor(text.toLowerCase());
    const labelTextColor = getTextColor(text.toLowerCase());

  return (
    <span className={`${labelColor} ${labelTextColor} border ${labelBorderColor} px-1.5 py-0.5 rounded-[8px] ${className} text-content_medium !lowercase flex gap-0.5 items-center`}>
      {labelIcon}
      {text}
    </span>
  );
};

export default EvoLabelLight;

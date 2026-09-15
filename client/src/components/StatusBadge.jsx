
import React from "react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",

    Interview:
      "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-900/50",

    Hired:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",

    Rejected:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap ${
        statusConfig[status] ||
        "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {status || "Unknown"}
    </span>
  );
};

export default StatusBadge;


import React from "react";

export default function WebsiteCard({ site, onSelect }) {
  const statusClass =
    site.is_up === true
      ? "bg-green-500"
      : site.is_up === false
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div
      onClick={() => onSelect(site)}
      className="p-4 rounded-xl shadow-md bg-gray-800 text-white cursor-pointer hover:scale-105 transition"
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{site.url}</h3>
          <p className="text-sm text-gray-400">
            {site.status_code ?? "-"} | {site.response_time_ms ?? "-"} ms
          </p>
        </div>
        <div className={`w-4 h-4 rounded-full ${statusClass}`} />
      </div>
    </div>
  );
}
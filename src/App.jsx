import React, { useEffect, useState } from "react";
import { getLatestStatus, getHistory, addWebsite } from "./api";
import WebsiteCard from "./components/WebsiteCard";
import StatusChart from "./components/StatusChart";
import { API_BASE } from "./api";

export default function App() {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [dark, setDark] = useState(true);

  const loadData = async () => {
    const res = await getLatestStatus();
    setSites(res.data);
  };

  const selectSite = async (site) => {
    setSelected(site);
    const res = await getHistory(site.id);
    setHistory(res.data);
  };

  const handleAdd = async () => {
   if (!urlInput) return;

  try {
    //Add website
    await addWebsite(urlInput);

    //Immediately trigger health check
    await fetch(`${API_BASE}/api/run`, { method: "POST" });

    //Reload data
    await loadData();

    setUrlInput("");
  } catch (err) {
    console.error(err);
  }
  };

 useEffect(() => {
  let mounted = true;

  const fetchData = async () => {
    try {
      const res = await getLatestStatus();
      if (mounted) {
        setSites(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();

  return () => {
    mounted = false;
  };
}, []);

  return (
    <div className={dark ? "bg-gray-900 min-h-screen text-white" : "bg-white min-h-screen text-black"}>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Website Monitor</h1>
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 bg-blue-500 rounded"
          >
            Toggle Theme
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-2 rounded text-black"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 rounded"
          >
            Add
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sites.map((site) => (
            <WebsiteCard
              key={site.id}
              site={site}
              onSelect={selectSite}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl mb-4">
            {selected ? selected.url : "Select a website"}
          </h2>
          <StatusChart history={history} />
        </div>
      </div>
    </div>
  );
}
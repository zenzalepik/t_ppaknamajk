import React, { useEffect, useState, useRef } from "react";

const EvoDebugOverlay = () => {
  const [logs, setLogs] = useState([]);
  const [visible, setVisible] = useState(true);
  const originalConsoleLog = useRef(console.log);
  const logQueue = useRef([]);

  // Load state dari localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("EvoDebugOverlayVisible");
    if (storedState !== null) {
      setVisible(storedState === "true");
    }
  }, []);

  // Simpan state ke localStorage
  useEffect(() => {
    localStorage.setItem("EvoDebugOverlayVisible", visible);
  }, [visible]);

  // Override console.log (tampung di queue dulu)
  useEffect(() => {
    console.log = (...args) => {
      logQueue.current.push({
        time: new Date().toLocaleTimeString(),
        message: args.join(" "),
      });
      originalConsoleLog.current(...args);
    };
    return () => {
      console.log = originalConsoleLog.current;
    };
  }, []);

  // Pindahkan queue ke state setelah render selesai
  useEffect(() => {
    const interval = setInterval(() => {
      if (logQueue.current.length > 0) {
        setLogs((prev) => [...prev, ...logQueue.current]);
        logQueue.current = [];
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[9999] pointer-events-none">
          <div className="bg-black bg-opacity-80 text-green-400 p-4 h-full overflow-auto pointer-events-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Evo Debug Overlay</h2>
              <button
                onClick={() => setVisible(false)}
                className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded pointer-events-auto"
              >
                Hide
              </button>
            </div>
            <div className="text-sm space-y-1 font-mono">
              {logs.map((log, index) => (
                <div key={index}>
                  <span className="text-gray-500">[{log.time}]</span>{" "}
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded pointer-events-auto z-[10000]"
        >
          Show Debug
        </button>
      )}
    </>
  );
};

export default EvoDebugOverlay;

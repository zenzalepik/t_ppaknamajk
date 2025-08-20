import { useEffect, useState, createElement } from 'react';

export default function LogConsole() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onStdout((msg) => {
        setLogs((prev) => [...prev, `[STDOUT] ${msg.trim()}`]);
      });
      window.electronAPI.onStderr((msg) => {
        setLogs((prev) => [...prev, `[STDERR] ${msg.trim()}`]);
      });
    }
  }, []);

  return createElement(
    'div',
    {
      style: {
        padding: 8,
        background: '#111',
        color: '#0f0',
        fontFamily: 'monospace',
        fontSize: 13,
        height: 300,
        overflowY: 'auto',
      },
    },
    logs.map((line, idx) =>
      createElement('div', { key: idx }, line)
    )
  );
}

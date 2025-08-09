// MultiLangCodeEditor.jsx
import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

const LANGUAGES = ["javascript", "python"];

export default function MultiLangCodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState({
    javascript: `console.log("Hello from JavaScript!")`,
    python: `print("Hello from Python!")`,
  });
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);

  // Load Pyodide for Python execution
  useEffect(() => {
    if (language === "python" && !pyodide) {
      window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" }).then((py) => {
        setPyodide(py);
      });
    }
  }, [language, pyodide]);

  const runCode = async () => {
    try {
      if (language === "javascript") {
        const result = eval(code.javascript);
        setOutput(result !== undefined ? String(result) : "JavaScript code executed.");
      } else if (language === "python" && pyodide) {
        const result = await pyodide.runPythonAsync(code.python);
        setOutput(String(result));
      } else {
        setOutput("Language not supported or not initialized.");
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">🧑‍💻 Multi-Language Code Editor (Frontend Only)</h1>

      <div className="flex gap-4 items-center">
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Play className="w-4 h-4 mr-2" /> Run
        </button>
      </div>

      <textarea
        value={code[language]}
        onChange={(e) =>
          setCode({
            ...code,
            [language]: e.target.value,
          })
        }
        className="w-full h-64 bg-black text-green-400 p-4 rounded font-mono"
      />

      <div className="bg-gray-800 p-4 rounded mt-4">
        <h2 className="font-semibold mb-2">Output</h2>
        <pre className="whitespace-pre-wrap text-green-300">{output}</pre>
      </div>
    </div>
  );
}

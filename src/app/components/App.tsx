import * as React from "react";
import "../styles/ui.css";

declare function require(path: string): any;

const App = ({}) => {
  const onCreate = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: "create-table" } }, "*");
  }, []);

  const onCancel = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "done") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <h2>Table of Contents</h2>
      <button id="create" onClick={onCreate}>
        Create table
      </button>
      <button id="update" onClick={onCreate}>
        Update table
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default App;

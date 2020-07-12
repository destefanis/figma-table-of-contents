import * as React from "react";
import "../styles/figma.ds.css";
import "../styles/custom-ui.css";

declare function require(path: string): any;

const App = ({}) => {
  const createTable = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: "create-table" } }, "*");
  }, []);

  const createPages = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: "create-pages" } }, "*");
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
    <div className="main">
      <figure className="logo-wrapper">
        <img src={require("../assets/logo.svg")} />
      </figure>
      <button
        className="button button--primary"
        id="create"
        onClick={createTable}
      >
        Create table of contents
      </button>
      <button
        className="button button--secondary"
        id="generate"
        onClick={createPages}
      >
        Generate list of pages
      </button>
    </div>
  );
};

export default App;

import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

export default function Editor({ tempNoteTxt, setTempNoteTxt }) {
  const [selectedTab, setSelectedTab] = useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={tempNoteTxt}
        onChange={setTempNoteTxt}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={85}
        heightUnits="vh"
      />
    </section>
  );
}

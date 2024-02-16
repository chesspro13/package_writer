import { useContext, useState } from "react";
import RevisionButtons from "../RevisionControl/revision-buttons";
import EditorBody from "../Editor/editor-body";
import RevisionElement from "../RevisionControl/RevisionElement";
import NavigationBar from "../Components/Header/NavigationBar";
import Footer from "../Components/Footer/footer";
import Menu from "../../src/Components/SidePanel/Menu";
import "../../src/Components/SidePanel/Menu.css";
import SideNote from "../Components/SideNotes/SideNote";
// import WordBank from "../UnusedFeatures/WordBank/WordBank";
import ToolBar from "../Components/ToolBar/ToolBar";
import "../Components/ToolBar/ToolBar.css";

import {
  menuContext,
  editorContext,
  MenuInterface,
  EditorInterface,
} from "../Context";
import React from "react";

export interface Revisions {}

export interface WordBank {}

export interface WordBankInterface {
  state: boolean;
  bank: string[] | undefined;
  apiResponse: any | undefined;
  apiCallWord: string | undefined;
}

function MainEditor() {
  const [revisions, setRevisions] = useState<string[] | undefined>(undefined);
  // const [menuToggle, setMenuToggle] = useState(false);
  // const [notesToggle, setNotesToggle] = useState(false);
  // const [noteCounter, setNoteCounter] = useState(0);

  // WordsAPI
  // const [wordBankState, setWordBankState] = useState(false);
  // const [wordBank, setWordBank] = useState([]);
  // const [wordApiResponse, setWordApiResponse] = useState();

  // Toolbar
  const [toolbarMode, setToolbarMode] = useState("Highlighting");
  const [activeTool, setActiveTool] = useState("Synonyms");

  // const [apiCallWord, setApiCallWord] = useState('{"synonyms":"Error"}');

  // Editor Setup
  const [editorOutput, setEditorOutput] = useState<string | undefined>(
    undefined
  );
  const [characterLimit, setCharacterLimit] = useState<number | undefined>(350);

  const editorStateData: EditorInterface = {
    editorOutput: editorOutput,
    setEditorOutput: setEditorOutput,
    characterLimit: characterLimit,
    setCharacterLimit: setCharacterLimit,
  };

  // Menu Setup
  const [menuVisable, setMenuVisible] = React.useState<boolean>(false);
  const [notesEnabled, setNotesEnabled] = React.useState<boolean>(false);
  const [notesCount, setNoteCount] = React.useState<number>(0);

  const menuStateData: MenuInterface = {
    menuVisible: menuVisable,
    setMenuVisible: setMenuVisible,
    notesEnabled: notesEnabled,
    setNotesEnabled: setNotesEnabled,
    noteCount: notesCount,
    setNoteCount: setNoteCount,
  };

  return (
    <>
      <menuContext.Provider value={menuStateData}>
        <NavigationBar allowSidebar={true} />
        <editorContext.Provider value={editorStateData}>
          <div className="toolbarContainer">
            <ToolBar
              toolbarMode={toolbarMode}
              setToolbarMode={setToolbarMode}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
            />
          </div>
          <div className="page">
            <div className="body">
              <EditorBody
                // setWordBank={setWordBank}
                activeTool={activeTool}
                toolbarMode={toolbarMode}
              />
              <RevisionButtons
                revisions={revisions}
                updateRevisions={setRevisions}
              />
              <RevisionElement revisions={revisions} />
            </div>
            {/* <SideNote /> */}
            <Menu
            // menuVisable={menuToggle}
            // setToggleMenu={setNotesToggle}
            // getToggleMenu={notesToggle}
            // setNoteCounter={setNoteCounter}
            // noteCount={noteCounter}
            />
          </div>
        </editorContext.Provider>
      </menuContext.Provider>
      <Footer />
    </>
  );
}

export default MainEditor;

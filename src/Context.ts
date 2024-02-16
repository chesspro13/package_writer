import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { WordBankInterface } from "./pages/MainEditor";

// Word bank
export const wordbankContext = createContext<WordBankInterface | undefined>(
  undefined
);
export function useWordbankContext() {
  const context = useContext(wordbankContext);

  if (context == undefined)
    throw new Error("useWordbankContext must be used with a wordbankContext");

  return context;
}

// Editor
export const editorContext = createContext<EditorInterface | undefined>(
  undefined
);

export interface EditorInterface {
  characterLimit: number | undefined;
  setCharacterLimit: React.Dispatch<React.SetStateAction<number | undefined>>;
  editorOutput: string | undefined;
  setEditorOutput: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function useEditorContext() {
  const context = useContext(editorContext);

  if (context == undefined)
    throw new Error("useEditorContext must be used with a editorContext");

  return context;
}

// Menu
export const menuContext = createContext<MenuInterface | undefined>(undefined);

export interface MenuInterface {
  menuVisible: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  notesEnabled: boolean;
  setNotesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  noteCount: number;
  setNoteCount: React.Dispatch<React.SetStateAction<number>>;
}

export function useMenuContext() {
  const context = useContext(menuContext);

  if (context == undefined)
    throw new Error("useMenuContext must be used with a menuContext");

  return context;
}

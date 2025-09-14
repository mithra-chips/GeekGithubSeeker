import { create } from 'zustand'

type State = {
  searchRepoValue: string,
  keyLabelItems: {[key: string]: KeyLabelItem}
}

type Actions = {
  updateSearchRepoValue: (value: string) => void,
  updateCheckedValue: (key: string) => void,
  updateInputValues: (key: string, values: { min?: number; max?: number } | boolean | undefined) => void
}

const keywords: {[key: string]: KeyLabelItem} = {
  "stars": {label: "Stars", type: "number",checked: false, values: { min: undefined, max: undefined }},
  "forks": { label: "Forks", type: "number",checked: false, values: { min: undefined, max: undefined } },
  "archived": { label: "Archived", type: "boolean",checked: false, values: undefined },
  "mirror": { label: "Mirror", type: "boolean",checked: false, values: undefined  },
  "template": { label: "Template", type: "boolean",checked: false, values: undefined  }
};

export interface KeyLabelItem {
    label: string, 
    type: string,
    checked: boolean, 
    values: { min?: number, max?: number } | boolean | undefined
}

// Store for checkbox and input values
export const useSearchParamStore = create<State & Actions>((set) => ({
  searchRepoValue: '',
  updateSearchRepoValue: (value: string) => set({ searchRepoValue: value }),
  keyLabelItems: {...keywords},
  updateCheckedValue: (key: string) =>
    set((state) => ({
      keyLabelItems: {
        ...state.keyLabelItems,
        [key]: {
          ...state.keyLabelItems[key],
          checked: !state.keyLabelItems[key].checked,
        },
      },
    })),
  updateInputValues: (key, values) =>
    set((state) => ({
      keyLabelItems: {
        ...state.keyLabelItems,
        [key]: { ...state.keyLabelItems[key], values },
      },
    })),
}));
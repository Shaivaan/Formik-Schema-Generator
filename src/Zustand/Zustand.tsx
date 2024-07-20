import create from 'zustand';

const useStore = create<StoreState>((set) => ({
    isSchemaModal: false,
    schemaContent: null,
    isSnackBarVisible:false,
    isProcessing:false,
    setSchemaModal: (isOpen) => set({ isSchemaModal: isOpen }),
    setSchemaContent: (content) => set({ schemaContent: content }),
    setIsSnackbarVisible:(isOpen) => set({ isSnackBarVisible: isOpen }),
    setIsProcessing:(isProcessing) => set({ isProcessing: isProcessing })
  }));

  export {useStore};
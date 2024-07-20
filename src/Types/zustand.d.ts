interface StoreState{
    isSchemaModal: boolean;
    schemaContent: null | string; 
    isSnackBarVisible:boolean,
    isProcessing:boolean,
    setSchemaModal: (isOpen: boolean) => void;
    setSchemaContent: (content: string) => void;
    setIsSnackbarVisible: (isOpen: boolean) => void;
    setIsProcessing: (isProcessing: boolean) => void;
  };
interface ExtensionOption {
    category: string;
    extension: string;
  }

  interface WhenSelectedFileType{
    type: 'single' | 'multiple';
    isFileSizeValidate: boolean;
    fileSize: number;
    isFileType: boolean;
    allowedFile: string[];
    fileSizeErrorMessage?: string;
    fileTypeErrorMessage?: string;
  }
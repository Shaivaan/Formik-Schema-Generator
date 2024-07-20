import * as Yup from 'yup';

const fileSchema = () => Yup.lazy((value) => {
    if (!value) return Yup.mixed().nullable();

    return fileUtilSchema;
});

const fileUtilSchema = Yup.object().shape({
    fileTypeErrorMessage: Yup.string().test(
      'fileTypeErrorMessage',
      'File type error message is required',
      function (value) {
        return this.parent.isFileType ? !!value : true;
      }
    ),
    allowedFile: Yup.array().of(Yup.string()).test(
      'allowedFile',
      'Allowed file types must have at least one type',
      function (value) {
        return this.parent.isFileType ? value && value.length > 0 : true;
      }
    ),
    fileSizeErrorMessage: Yup.string().test(
      'fileSizeErrorMessage',
      'File size error message is required',
      function (value) {
        return this.parent.isFileSizeValidate ? !!value : true;
      }
    ),
    fileSize: Yup.number().typeError('Size must be a number').test(
      'fileSize',
      'File size is required and must be a positive number',
      function (value:any) {
        return this.parent.isFileSizeValidate ? (value && value > 0) : true;
      }
    ),
  });

  export {fileSchema}
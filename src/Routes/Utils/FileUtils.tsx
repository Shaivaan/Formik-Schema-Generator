const file_single = {type : 'single'};
const file_multiple = {type : 'multiple'};
const file_util = {
    isFileSizeValidate:false,
    fileSize:5000,
    isFileType:false,
    allowedFile:[],
    fileSizeErrorMessage : 'Size exceeding limit',
    fileTypeErrorMessage : 'Please Select valid file type'
}
const file_util_arry = [
    {label:'Maximum File Size',keyName : 'isFileSizeValidate'},
    {label:'Specific File Types',keyName : 'isFileType'}
]
const file_category = ['single','multiple'];
const categories = [
    {
      title: 'Images',
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tiff', 'webp', 'ico', 'heic', 'psd', 'raw'],
    },
    {
      title: 'Documents',
      extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'odt', 'ods', 'odp', 'rtf'],
    },
    {
      title: 'Media',
      extensions: ['mp3', 'mp4', 'wav', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'aac', 'ogg', 'webm', 'm4a'],
    },
    {
      title: 'Archives',
      extensions: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'iso'],
    },
    {
      title: 'Code',
      extensions: ['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml', 'yaml', 'yml', 'php', 'py', 'java', 'rb', 'c', 'cpp', 'cs', 'go'],
    },
    {
      title: 'Fonts',
      extensions: ['ttf', 'otf', 'woff', 'woff2', 'eot'],
    },
  ];

  const categories_options = categories.flatMap(category => 
    category.extensions.map(extension => ({
      category: category.title,
      extension,
    }))
  );


export {file_multiple,file_single,file_util,file_util_arry,file_category,categories_options}
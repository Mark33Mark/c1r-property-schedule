import { arrayRemoveItems } from '../../utils';

export const useDropFile = (props, options) => {
  const { maxFiles } = props;
  const { setOver, files, setFiles } = options;

  const buildPreview = (files) => {
    const droppedFiles = [...files];

    // console.log('maxFiles useDropFile = ', { maxFiles, droppedFiles });

    // check count of dropped files is less or equal to maximum
    // droppable prop setting
    if (droppedFiles.length > maxFiles) {
      const difference = droppedFiles.length - maxFiles;
      arrayRemoveItems(droppedFiles, difference);
    }

    const blobs = droppedFiles
      .map((file, index) => {
        // if (file.type.includes('image')) {
        file.preview = URL.createObjectURL(file);
        file.key = index + '_' + Date.now();
        return file;
        // }
        // console.log(`${file.name} is not an image`);
        // return null;
      })
    // filter out 'null' when not image
      .filter((elem) => elem !== null);

    setFiles(blobs);
  };

  const fileSelected = (event) => {
    const selectedFiles = event.target.files;
    buildPreview([...selectedFiles, ...files]);
  };

  const onDrop = (event) => {
    const droppedFiles = event.dataTransfer.files;
    event.preventDefault();
    files
      ? buildPreview([...droppedFiles, ...files])
      : buildPreview([...droppedFiles]);
    setOver(false);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setOver(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setOver(false);
  };

  return {
    fileSelected,
    onDrop,
    onDragOver,
    onDragLeave
  };
};

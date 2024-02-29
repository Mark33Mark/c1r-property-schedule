import * as xlsx from 'xlsx';
import { unflatten } from 'flat';
import FileSaver from 'file-saver';
// import { sheetFileTypes } from '../../utils';

export const ToJson = (loadedFile) => {
  const reader = (file, callback) => {
    const fr = new window.FileReader();
    fr.onload = () => callback(null, fr.result);
    fr.onerror = (err) => callback(err);
    fr.readAsDataURL(file);
  };

  let unflattened;

  const getFileFromUrl = async (fileURL) => {
    const response = await fetch(fileURL);
    const data = await response.blob();

    reader(data, (err, res) => {
      if (!res) console.log(err);

      // Base64 `data:image/...` String result.
      const base64 = res.slice(res.indexOf(',') + 1);

      const workbook = xlsx.read(base64, {
        type: 'base64',
        cellText: false,
        cellDates: true
      });

      console.log('workbook = ', workbook);

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet, {
        header: 7,
        raw: false,
        dateNF: 'yyyy-mm-dd'
      });

      // using unflatten to handle embedded JSON correctly
      // console.log("flattened = ", json);
      unflattened = json.map((obj) => unflatten(obj));

      const blob = new Blob([JSON.stringify(unflattened, null, 2)], {
        type: 'application/json'
      });
      FileSaver.saveAs(blob, 'newObject.json');

      loadedFile = null;

      console.log('file saved, check your downloads folder for the file.');
    });
  };

  getFileFromUrl(loadedFile);
};

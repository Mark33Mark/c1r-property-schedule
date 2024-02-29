import * as xlsx from 'xlsx';
import { flatten } from 'flat';

export const ToXls = (loadedFile) => {
  const getFileFromUrl = async (fileURL) => {
    // 1. get the JSON file from the system memory
    const response = await fetch(fileURL);
    const data = await response.json();

    // 2. flatten the JSON from embedded to dot notated JSON
    const flattened = data.map((obj) => flatten(obj));

    // 3. convert the dot notated JSON into spreadsheet format
    const worksheet = xlsx.utils.json_to_sheet(flattened);

    // 4. create a new Excel Workbook
    const workbook = xlsx.utils.book_new();

    // 5. add the worksheet to the workbook and download the new workbook.
    xlsx.utils.book_append_sheet(workbook, worksheet, 'CSR_Property');
    xlsx.writeFile(workbook, 'CSR_Property_Schedule.xlsx', { compression: true });

    // 6. you're done here!
    console.log('file saved, check your downloads folder for the file.');
  };

  getFileFromUrl(loadedFile);
};

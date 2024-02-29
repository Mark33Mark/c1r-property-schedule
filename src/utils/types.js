export const sheetFileTypes = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  '123',
  'ods'
]
  .map((x) => {
    return '.' + x;
  })
  .join(',');

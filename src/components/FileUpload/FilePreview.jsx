export const FilePreview = (props) => {
  const { files, deleteFile, convertFile } = props;

  const handleClick = event => {
    // send the file.key value to the deleteFile function at the parent
    deleteFile(event.target.value);
  };

  const handleConversion = event => {
    // send the file.key value to the deleteFile function at the parent
    console.log('handleConversion value = ', event.target);
    convertFile(event.target.value);
  };

  return (
    files.map((file, index) => (
      <div className='card-preview' key={index}>
        <button onClick={handleClick} value={file.key}>delete</button>

        {file.name.includes('.json')
          ? <button onClick={handleConversion} value={JSON.stringify({ url: file.preview, convert: 'xls' })}>to XLS</button>
          : file.name.includes('.xls')
            ? <button onClick={handleConversion} value={JSON.stringify({ url: file.preview, convert: 'json' })}>to JSON</button>
            : null}

        {file.type.includes('image')
          ? <img
              className='image-preview'
              key={file.key}
              src={file.preview}
              alt='your file'
            />
          : <iframe
              className='file-preview'
              key={file.key}
              src={file.preview}
              alt='your file'
            />}
        <div className='image-info'>
          <table>
            <tbody>
              <tr>
                <td className='image-info-name'>
                  <b>name:</b>
                </td>
                <td className='image-info-name'>
                  {file.name}
                </td>
              </tr>
              <tr>
                <td className='image-info-size'>
                  <b>size:</b>
                </td>
                <td className='image-info-size'>
                  {(file.size / 1000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kB
                </td>
              </tr>
              <tr>
                <td className='image-info-type'>
                  <b>type:</b>
                </td>
                <td className='image-info-type'>
                  {file.type}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
    ));
};

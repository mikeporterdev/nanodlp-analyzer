import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader'
import { useState } from 'react';
import { useNanoDLP } from './NanoDlpFileContext.tsx';


export const Uploader = () => {
  const [spinnerShow, setSpinnerShow] = useState(false)

  const {fileName, updateState} = useNanoDLP();


  // called every time a file's `status` changes
  const handleChangeStatus = (file: IFileWithMeta, status: StatusValue) => {
    if (status === 'done') {
      const {file: {name}} = file;
      setSpinnerShow(false);
      updateState({fileName: name})
    } else {
      setSpinnerShow(true);
    }
  }

  return (
    <>
      <div className="spinner" style={{display: spinnerShow ? 'inline' : 'none'}}>spinner</div>{fileName}
      <Dropzone
        onChangeStatus={handleChangeStatus}
        accept=".nanodlp"
        submitButtonDisabled={true}
        multiple={false}
        maxFiles={1}
        styles={{
          dropzone: {
            overflow: 'hidden'
          }
        }}
      />
    </>
  )
};

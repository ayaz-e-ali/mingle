/* eslint-disable react/prop-types */
import Dropzone from "react-dropzone";

export default function FileUpload({ onDrop, file }) {
    

    return <Dropzone acceptedFiles={'.jpg,.jpeg,.png'} multiple={false} onDrop={onDrop} >
        {({ getRootProps, getInputProps }) => (
            <div className='col-span-2 p-4 rounded-md border mt-4' >
                <div className={`cursor-pointer rounded pl-3 border-dashed border-2 border-accent`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!file.size
                        ? <p className='my-4'>Add picture here</p>
                        : <div className="flexbetween my-4 mr-4">
                            <p>{file.name}</p>
                        </div>
                    }
                </div>
            </div>
        )}
    </Dropzone>
}

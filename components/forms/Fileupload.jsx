/* eslint-disable react/prop-types */
import Image from 'next/image';
import Dropzone from "react-dropzone";

export default function FileUpload({ onDrop, file, multiple = false }) {
    const exist = Array.isArray(file) && file.length > 0 || file.size;
    return <Dropzone acceptedFiles={'.jpg,.jpeg,.png'} multiple={multiple} onDrop={onDrop} >
        {({ getRootProps, getInputProps }) => (
            <div className='p-4 rounded-md border mt-4' >
                <div className={`cursor-pointer rounded pl-3 border-dashed border-2 border-accent`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {exist
                        ? <div className="flex flex-wrap gap-1 my-4 mr-4">
                            {
                                Array.isArray(file) ?
                                    file.map((img) => (
                                        <Image key={img.name} src={URL.createObjectURL(img)} alt="uploaded" width={60} height={60} className='object-cover rounded-md'/>
                                    ))
                                    :
                                    <Image src={URL.createObjectURL(file)} alt="uploaded" width={60} height={60} className='object-cover rounded-md'/>
                            }
                        </div>
                        : <p className='my-4'>Add picture here</p>
                    }
                </div>
            </div>
        )}
    </Dropzone>;
}

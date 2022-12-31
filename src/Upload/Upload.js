import React, { useEffect, useState } from "react";
import Axios from 'axios'
import './upload.css';
const Upload = () => {
    const [tags,setTags] = useState([])
    const [file,setFile] = useState('')
    const [selected,setSelected] = useState(false);
    const uploadImage = () =>{
        setSelected('uploading');
        const formData = new FormData()
        formData.append('file',file)
        if (tags.length > 0) {
            formData.append('tags',tags)
        }
        formData.append('upload_preset','zpiwjlrp')
        Axios.post('https://api.cloudinary.com/v1_1/dinfgyk0a/image/upload',formData)
        .then((response) =>{
            console.log(response);
            setSelected(false)
        })
    };
    useEffect(()=>{
        document.body.classList.add('upload-body');
    });
    useEffect(()=>{
        if (document.getElementById('title').length > 1) {
            tags.split(',')
        }
    },[tags]);
    const showPreview = (event)=>{
        if(event.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0]);
            let preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
            setSelected('selected');
            setFile(event.target.files[0])
        };
    };
    return ( 
        <>
             <h1 className="h1"><strong>Select an Image to upload</strong></h1>
             <div className="form-group">
                    <label className="label" htmlFor="title">Tags <span>Add one or more tags to help people search for this image</span></label>
                    <input type="text" onChange={(event)=>setTags(event.target.value)} name="title" id="title"placeholder="e.g flowers,nature,sunset" className="form-controll"/>
                </div>
                <div className="center">
                    <div className="form-input">
                        <div className="preview">
                            <img id="file-ip-1-preview" alt="upload imgae" src=""/>
                        </div>
                        {!selected && <label htmlFor="file-ip-1">Select Image</label>}
                        {selected === 'selected' && <label htmlFor="" onClick={uploadImage}>Upload Image</label>}
                        {selected === 'uploading' && <label htmlFor="">Uploading...</label>}
                        <input type="file" id="file-ip-1" accept="image/*" onChange={showPreview}/>
                    </div>
                </div> 
                <a href="/"  className="back-to-article" target="_blank">back Home</a>
        
        </>
     );
}

export default Upload;
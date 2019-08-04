import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

class Demo extends React.Component {
  // upload files with react-dropzone and display mini preivew
  // previews have a delete button
  // click a preview to open in the cropper
  // select aspect ratio 
  // crop image and show a preview
  // if happy click replace, which updates the image about to be uploaded with the newly cropped image

  // When all the images are selected and cropped according to needs: click upload to upload the image to the server


  _crop(){
    // image in dataUrl
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    // Make File object
    // display cropped image via File URL
    // Bypass cross-origin policy or just use the server as a proxy to load images from the web.

  }

  render() {
    return (
      <Cropper
        ref='cropper'
        src='jessica-alba.jpg'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)} />
    );
  }
}

function Previews(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

function App() {
  return (
    <div>
      <Demo />
    </div>
  )
}


export default App;

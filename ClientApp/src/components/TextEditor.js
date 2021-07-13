import ReactQuill from "react-quill"
import React,{useState} from 'react'
import 'react-quill/dist/quill.snow.css'
import './TextEditor.css'

export default function TextEditor(props) {
  const [convertedText, setConvertedText] = useState(props.defaultValue);
  const changeHandler = (html) =>
  {
    setConvertedText(html)
  
    props.onTextChange(html);
    
  }
  var modules = {
   
    toolbar: [
      // [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      // [{size: []}],
      // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      // [{'list': 'ordered'}, {'list': 'bullet'}, 
      //  {'indent': '-1'}, {'indent': '+1'}],
      // ['link', 'image', 'video'],
      // ['clean'],
     
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  var format = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  return (
    <div>
      <ReactQuill
        theme='snow'
        
        value={convertedText || ''}
        readOnly = {props.readOnly}
        placeholder="enter description"
        onChange={changeHandler}
       // style={{height: '200px'}}
        formats={format}
        modules={modules}
      />
      
    </div>
  );
  
}
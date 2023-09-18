'use client';
import React, { MutableRefObject, memo, useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import EDITOR_JS_TOOLS from '@/config/editorTools';

//props
export type Props = {
  data?: OutputData;
  imageArray: any[];
  onChange(val: OutputData): void;
  holder: string;
  innerRef: MutableRefObject<EditorJS | null>;
};

const EditorBlock = ({ data, onChange, imageArray, holder, innerRef }: Props) => {
  EDITOR_JS_TOOLS.image.config = {
    uploader: {
      uploadByFile(file: any) {
        let formData = new FormData();
        formData.append('images', file);
        // send image to server
        /*
				return API.imageUpload(formData).then((res:) => {
					// get the uploaded image path, pushing image path to image array
				imageArray.push(res.data.data)
				return {
						success: 1,
						file: {
							url: res.data.data
						}
					}
				})
				*/
      },
    },
  };

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (innerRef) {
      if (!innerRef.current) {
        console.log('called editor')
        const editor = new EditorJS({
          holder: holder,
          tools: EDITOR_JS_TOOLS,
          inlineToolbar: true,
          placeholder: 'Let`s write an awesome story!',
          data,
          async onChange(api, event) {
            const data = await api.saver.save();
            onChange(data);
          },
        });
        innerRef.current = editor;
      }

      //add a return function handle cleanup
      return () => {
        if (innerRef.current && innerRef.current.destroy) {
          innerRef.current.destroy();
        }
      };
    }
  }, [innerRef]);

  useEffect(() => {
    const editor = innerRef.current;
    if (data && editor && editor.render) { 
      editor.isReady.then(() => {
        console.log('data 1', data)
        if (data.blocks.length === 0) {
          editor.clear();       
        }     
        editor.render(data);            
      })
        .catch((reason) => {
            console.log(`Editor.js initialization failed because of ${reason}`)
        });
    }
  }, [data]);

  return <div id={holder} />;
};

export default memo(EditorBlock);

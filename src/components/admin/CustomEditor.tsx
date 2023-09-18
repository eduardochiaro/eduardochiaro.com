'use client';
import React, { Ref, memo, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import EDITOR_JS_TOOLS from '@/config/editorTools';

//props
export type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
  innerRef: Ref<EditorJS>;
};

const EditorBlock = (({ data, onChange, holder, innerRef } : Props) => {

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (innerRef) {
      if (!innerRef.current) {
        const editor = new EditorJS({
          holder: holder,
          tools: EDITOR_JS_TOOLS,
          inlineToolbar: true,
          placeholder: 'Let`s write an awesome story!',
          data,
          async onChange(api, event) {
            const data = await api.saver.save();
            console.log(data);
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
  }, []);

  return <div id={holder} />;
});

export default memo(EditorBlock);
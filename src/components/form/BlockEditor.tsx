'use client';

import edjsHTML from 'editorjs-html';
import EditorJS from '@editorjs/editorjs';
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DEFAULT_INITIAL_DATA =  {
  "time": new Date().getTime(),
  "blocks": []
}

const EditorBlock = dynamic(() => import("@/components/admin/CustomEditor"), {
  ssr: false,
});

type Props = {
  name?: string;
  initialData?: any;
  onChange?: (data: any, name: string) => void;
};

export default function BlockEditor({ name = 'editor', initialData = DEFAULT_INITIAL_DATA, onChange }: Props) {
  //add a reference to editor
  const ref = useRef<EditorJS>(null);

  const [data, setData] = useState<any>(DEFAULT_INITIAL_DATA);

  useEffect(() => {
    if (initialData) {
      setData(JSON.parse(initialData));
      ref.current?.render(JSON.parse(initialData));
    }
  }, [initialData]);

  const handleChanges = (data: any) => {
    //setData(data);
    if (onChange) {
      onChange(data, name);
    }
  }
  
  return (
    <>
      <EditorBlock holder="editorjs" data={data} onChange={(data) => handleChanges(data)} innerRef={ref} />
    </>
  );
}
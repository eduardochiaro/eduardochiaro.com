'use client';

import EditorJS from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const EditorBlock = dynamic(() => import('@/utils/CustomEditor'), {
  ssr: false,
});

type Props = {
  name?: string;
  initialData?: any;
  onChange?: (data: any, name: string) => void;
};

export default function BlockEditor({ name = 'editor', initialData = {}, onChange }: Props) {
  //add a reference to editor
  const ref = useRef<EditorJS | null>(null);

  const [imageArray, setImageArray] = useState([]); // to keep track of uploaded image
  const [data, setData] = useState<any>(initialData);

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
  };

  return (
    <>
      <EditorBlock holder="editorjs" data={data} imageArray={imageArray} onChange={(d) => handleChanges(d)} innerRef={ref} />
    </>
  );
}

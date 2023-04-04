import type { ResumeProject } from "@prisma/client";
import SVG from 'react-inlinesvg';
import { Input } from "../form";
import { useReducer, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  projects: ResumeProject[]
  resumeId?: number | null
}

const AdminProjects = ({ projects, resumeId }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const imagePreviewSet = {
    file: {},
    imagePreviewUrl: '',
  };

  const formInitialState = {
    error: false,
    success: false,
    info: '',
    invalid: [],
  };

  const itemFormat = {
    name: '',
    image: '',
    resumeId
  };
  
  const [item, updateItem] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, itemFormat);
  const [form, setForm] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, formInitialState);
  const [imagePreview, setImagePreview] = useState(imagePreviewSet);

  const handleChange = (e: React.ChangeEvent<any>) => {
    updateItem({ [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setImagePreview({
          file,
          imagePreviewUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
    console.log(item);
  };

  const onSubmitModal = async (e: Event) => {
    e.preventDefault();
    
  }

  return (
    <>
      <h3 className="text-lg font-bold border-b border-primary-700 pb-2 mb-5 mt-10">Projects</h3>
      <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={(e: any) => onSubmitModal(e)}>
        <div className="flex items-center gap-6">
          <div className="grow">
            <Input type="text" name="name" label="Name" value={item.name} invalid={false} onChange={(e) => handleChange(e)} />
          </div>
          <div className="grow">
            <Input ref={inputFileRef} type="file" name="image" label="Logo" value="" defaultValue={item.image} invalid={false} accept="image/*" onChange={(e) => handleChange(e)} />
          </div>
          <div>
            { (imagePreview && imagePreview.imagePreviewUrl) &&
            <div className="mt-4 w-32 h-20 m-auto relative box-card">
              
              <Image
                src={imagePreview.imagePreviewUrl}
                fill
                sizes="33vw"
                alt="preview"
                title="preview"
                className="bg-transparent object-contain fill-primary-700 dark:fill-primary-200"
                priority={false}
              />
            </div>
            }
          </div>
          <div className="flex-none">
            <button className="button-success mb-1 !px-4 mt-7" type="submit">add</button>
          </div>
        </div>
      </form>
      {projects.map((project: ResumeProject, key) => (
        <div className="flex items-center gap-4 h-14 px-4" key={key}>
          <div className="w-48">
            <SVG title={project.name} className={'fill-primary-700 dark:fill-primary-200'} src={`/uploads/${project.logo}`} height={30} />
          </div>
          <span>{project.name}</span>
        </div>
      ))}
    </>
  )
}

export default AdminProjects;
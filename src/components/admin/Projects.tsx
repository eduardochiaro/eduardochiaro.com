import type { ResumeProject } from "@prisma/client";
import SVG from 'react-inlinesvg';
import { Input } from "../form";
import { useReducer } from "react";

type Props = {
  projects: ResumeProject[]
  resumeId?: number | null
}

const AdminProjects = ({ projects, resumeId }: Props) => {
  const itemFormat = {
    name: '',
    image: '',
    resumeId
  };
  
  const [item, updateItem] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, itemFormat);

  const handleChange = (e: React.ChangeEvent<any>) => {
    updateItem({ [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };
  return (
    <>
      <h3 className="text-lg font-bold border-b border-primary-700 pb-2 mb-5 mt-10">Projects</h3>
      <form>
        <div className="flex items-center gap-6">
          <div className="grow">
            <Input type="text" name="name" label="Name" value={item.name} invalid={false} onChange={(e) => handleChange(e)} />
          </div>
          <div className="grow">
            <Input type="file" name="image" label="Logo" value={item.image} invalid={false} onChange={(e) => handleChange(e)} />
          </div>
          <div className="flex-none">
            <button className="button-success mb-1 !px-4 mt-7">add</button>
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
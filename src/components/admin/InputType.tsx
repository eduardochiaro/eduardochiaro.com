'use client';

import { ReactElement } from 'react';
import { Input, Select, Textarea, Range, Tags, BlockEditor } from '@/components/form';
import Image from 'next/image';
import SVG from '@/utils/svg';

type InputTypeProps = {
  input: {
    type: string;
    label: string;
    name: string;
    value: string;
    required: boolean;
    requiredCondition?: string[];
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    accept?: string;
    rows?: number;
    selectOptions?: {
      id: string;
      name: string;
    }[];
    selectOnChange?: (e: any) => void;
    selectEmptyOption?: boolean;
    html: ReactElement;
  };
  itemData: any;
  form: {
    error: boolean;
    success: boolean;
    invalid: string[];
  };
  imagePreview?: {
    file: any;
    imagePreviewUrl: string;
  };
  handleChange: (e: any) => void;
  handleChangeSpecial: (e: any, name: string) => void;
  updateItem: (e: any) => void;
  fetchFunction?: (url: string) => void;
  inputFileRef: any;
};

const InputType = ({ input, itemData, form, imagePreview, inputFileRef, handleChange, handleChangeSpecial, updateItem, fetchFunction }: InputTypeProps) => {
  const required =
    input.required && (!input.requiredCondition || (input.requiredCondition && itemData[input.requiredCondition[0]] == input.requiredCondition[1]));
  switch (input.type) {
    case 'text':
    case 'url':
    case 'file':
    case 'password':
    case 'date':
    case 'datetime':
    default:
      return (
        <Input
          ref={input.type == 'file' ? inputFileRef : null}
          type={input.type}
          label={input.label}
          name={input.name}
          value={itemData[input.value] || ''}
          placeholder={input.placeholder}
          onChange={(e) => handleChange(e)}
          required={required}
          invalid={form.invalid.includes(input.name)}
          accept={input.accept}
        />
      );
    case 'range':
      return (
        <Range
          label={input.label}
          name={input.name}
          min={input.min}
          max={input.max}
          step={input.step}
          value={itemData[input.value]}
          onChange={(e) => handleChange(e)}
          required={required}
          invalid={form.invalid.includes(input.name)}
          accept={input.accept}
        />
      );
    case 'tags':
      return (
        <Tags
          label={input.label}
          name={input.name}
          value={itemData[input.value]}
          onChange={(e) => handleChange(e)}
          required={required}
          invalid={form.invalid.includes(input.name)}
          updateItem={updateItem}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={input.label}
          name={input.name}
          value={itemData[input.value] || ''}
          onChange={(e) => handleChange(e)}
          required={required}
          rows={input.rows}
          invalid={form.invalid.includes(input.name)}
        />
      );
    case 'select':
      return (
        <Select
          label={input.label}
          name={input.name}
          value={itemData[input.value]}
          onChange={(e) => {
            handleChange(e);
            if (input.selectOnChange) {
              input.selectOnChange(e);
            }
          }}
          required={required}
          invalid={form.invalid.includes(input.name)}
        >
          <>
            {!input.selectEmptyOption && <option value=""> - select - </option>}
            {input.selectOptions?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </>
        </Select>
      );
    case 'imagePreview':
      if (imagePreview && imagePreview.imagePreviewUrl) {
        return (
          <div className="mt-4 w-full h-20 relative box-card ">
            <Image
              src={imagePreview.imagePreviewUrl}
              fill
              sizes="33vw"
              alt={input.name}
              title={input.name}
              className="bg-transparent object-contain fill-primary-700 dark:fill-primary-200"
              priority={false}
            />
          </div>
        );
      } else {
        return <></>;
      }
    case 'svgPreview':
      if (itemData[input.name]) {
        return <SVG title="" className={'inline-block w-14 fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${itemData[input.name]}`} />;
      } else {
        return <></>;
      }
    case 'fetchButton':
      if (fetchFunction) {
        return (
          <button type="button" className="button-success mb-1 w-full !px-4" onClick={() => fetchFunction(itemData[input.value])}>
            Fetch
          </button>
        );
      } else {
        return <></>;
      }
    case 'html':
      return <>{input.html}</>;
    case 'blockEditor':
      return <BlockEditor name={input.name} initialData={itemData[input.value]} onChange={handleChangeSpecial} />;
  }
};

export default InputType;

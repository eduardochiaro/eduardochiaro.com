const adminType = (type: string) => {
  
  switch (type) {
    case 'test':
      return {
        endpoint: '/api/portfolio/apps',
        title: 'Apps',
        single: 'single',
        format: {
          id: null,
          name: '',
          description: '',
          image: '',
          url: '',
        },
        columns: ['name', 'description', 'github_url'],
        inputList: [
          {
            classNames: 'col-span-6',
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            value: 'name',
            required: true,
            requiredById: false,
          },
          {
            classNames: 'col-span-4',
            label: 'Image',
            name: 'image',
            type: 'file',
            required: false,
            requiredById: true,
            accept: 'image/*',
          },
          {
            classNames: 'col-span-2',
            type: 'imagePreview',
            name: 'imagePreview',
          },
          {
            classNames: 'col-span-6',
            label: 'GitHub URL',
            name: 'url',
            type: 'text',
            placeholder: 'https://github.com',
            value: 'url',
            required: true,
            requiredById: false,
          },
          {
            classNames: 'col-span-6',
            label: 'Description',
            name: 'description',
            type: 'textarea',
            value: 'description',
            required: false,
            requiredById: false,
          },
        ]
      };
  
    default:
      return {};
  }
}

export default adminType;
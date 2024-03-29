const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');

const resumes = [
  {
    company: 'Verizon',
    location: 'Greater Seattle Area, USA',
    name: 'Software Engineer',
    file: {
      create: {
        name: 'Verizon',
        path: 'Verizon_logo.svg',
        type: 'image/svg',
      }
    },
    description: '',
    startDate: moment('2017-06-01').toISOString(),
    endDate: null,
    tags: ['Node.JS', 'GraphQL', 'PostgreSQL']
  },
  {
    company: 'Getty Images',
    location: 'Greater Seattle Area, USA',
    name: 'Software Developer',
    file: {
      create: {
        name: 'Getty Images',
        path: 'Getty_Images_logo.svg',
        type: 'image/svg',
      }
    },
    description: 'Update and include new functionality on iStockPhoto website to help the transition to GettyImages platform in long run. Technologies used: PHP5, Zend, PHPUnit MySQL, Javascript, AngularJS, HTML, Git, Linux, and Windows.',
    startDate: moment('2016-05-01').toISOString(),
    endDate: moment('2016-11-01').toISOString(),
    tags: ['PHP', 'MySQL']
  },
  {
    company: 'Flixmedia LTD',
    location: 'London, UK',
    name: 'Senior PHP Developer',
    description: 'Create and develop a new version of the content provider application and many other products for Brands like HP, Samsung, LG, and retailers like BestBuy, FNAC, Amazon, and Dixon. Contributed software development expertise in the development of an updated version of content solutions provider software through the software lifecycle covering phases like requirement gathering, analysis, coding, testing, deployment, bug fixing, troubleshooting, documentation, and deployment.',
    startDate: moment('2011-06-01').toISOString(),
    endDate: moment('2016-03-01').toISOString(),
    tags: ['PHP', 'MySQL', 'JS', 'Zend'],
    projects: [
      {
        name: 'Microsoft',
        file: {
          create: {
            name: 'Microsoft',
            path: 'Microsoft_logo.svg',
            type: 'image/svg',
          }
        }
      },
      {
        name: 'HP',
        file: {
          create: {
            name: 'HP',
            path: 'HP_logo.svg',
            type: 'image/svg',
          }
        }
      },
      {
        name: 'Samsung',
        file: {
          create: {
            name: 'Samsung',
            path: 'Samsung_logo.svg',
            type: 'image/svg',
          }
        }
      },
      {
        name: 'LG',
        file: {
          create: {
            name: 'LG',
            path: 'LG_logo.svg',
            type: 'image/svg',
          }
        }
      }
    ]
  },
  {
    company: 'Estensa SRL',
    location: 'Italy',
    name: 'Software Developer',
    description: 'Developed a new CMS framework based on Zend, designed and created of a number of projects, primarily aimed at travel agents and vacation blogs. Led the development of websites, e-commerce, WordPress blogs, mobile sites, and web applications. Managed all aspects of client support, including communication, problem resolution, and relationship building.',
    startDate: moment('2010-03-01').toISOString(),
    endDate: moment('2011-02-01').toISOString(),
    tags: ['PHP', 'MySQL', 'HTML', 'JS', 'Zend']
  },
  {
    company: 'Infocube SRL',
    location: 'Italy',
    name: 'PHP Developer',
    description: 'Developed the DonnaPiu Franchising web application for stores and warehouses, building websites for non-profit organizations and music associations. Developed websites and WordPress blogs. Designed, created, and enhanced business web applications. Liaised with clients to ensure that all comply with standards and guidelines..',
    startDate: moment('2009-05-01').toISOString(),
    endDate: moment('2010-01-01').toISOString(),
    tags: ['PHP', 'MySQL', 'HTML', 'JS']
  },
  {
    company: 'Nascar.it',
    location: 'Italy',
    name: 'PHP Developer',
    description: 'Completed a variety of consumer projects, including CiaoPeople, a high traffic social community. Partnered with designers and project management staff to capture requirements for the functional elements of website projects. Promoter and author of transition from ASP to PHP for all company CMs. Leveraged Joomla technology.',
    startDate: moment('2005-09-01').toISOString(),
    endDate: moment('2008-10-01').toISOString(),
    tags: ['PHP', 'MySQL', 'HTML', 'JS']
  },
];

const seed = async () => {
  await prisma.resumeProject.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.resumeTag.deleteMany();
  console.log('Deleted records in resumes table');

  await prisma.$queryRaw`ALTER TABLE resume AUTO_INCREMENT = 1`;
  await prisma.$queryRaw`ALTER TABLE resume_tags AUTO_INCREMENT = 1`;
  await prisma.$queryRaw`ALTER TABLE resume_projects AUTO_INCREMENT = 1`;
  console.log('reset resumes auto increment to 1');

  let resumeTags = [];
  resumes.map(x => {
    resumeTags = [...resumeTags, ...x.tags]
  });

  const uniqueResumeTags = [...new Set(resumeTags)];

  const mapTagsToSave = uniqueResumeTags.map((tag, index) => {
    return {
      id: index + 1,
      name: tag
    }
  }); 

  await prisma.resumeTag.createMany({
    data: mapTagsToSave
  })
  
  await resumes.map(async (resumeSingle) => {
    const { tags, projects, ...resumeData} = resumeSingle;

    await prisma.resume.create({
      data: {
        ...resumeData,
        tags: {
          connect: tags?.map(name => ({
            id: uniqueResumeTags.indexOf(name) + 1
          }))
        },
        projects: {
          create: projects
        }
      },
    });
  })
  
  console.log('Added resumes data');
}

module.exports = seed;

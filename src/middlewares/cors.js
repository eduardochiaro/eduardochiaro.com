import NextCors from 'nextjs-cors';

//const origin = process.env.NODE_ENV == "production" ? [/eduardochiaro\.com$/] : "*";
const origin = [/eduardochiaro\.com$/];

const cors = async (req, res) => {
  return NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
}

export default cors
import httpAuth from 'http-auth';

const options = httpAuth.basic({
  realm: 'Private area',
  file: 'htpasswd'
});

export default httpAuth.connect(options);

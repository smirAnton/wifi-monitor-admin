export default function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin', '*'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,OPTIONS,PATCH,POST,DELETE'
  );

  next();
}

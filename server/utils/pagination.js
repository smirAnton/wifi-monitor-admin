const LIMIT = 20; // 20 items per request

/**
 * @description Define skip value items for request
 * @param  {Object} query        Incoming params
 * @param  {Number} defaultLimit Default limit setuped by user
 * @return {Number}              Defined skiped value
 */
export const skip = (query, defaultLimit = LIMIT) => {
  const limit = query.limit || defaultLimit;
  const page = parseInt(query.page, 10);
  query.page = !page || page < 0 ? 1 : page;

  return (query.page - 1) * limit || 0;
};

/**
 * @description Define limit items per request
 * @param  {Object} query        Incoming params
 * @param  {Number} defaultLimit Default limit setuped by user
 * @return {Number}              Defined limit value
 */
export const limit = (query, defaultLimit = LIMIT) => {
  const lim = parseInt(query.limit, 10);
  const limP = lim < 1 ? 0 : lim;

  return limP || defaultLimit;
};

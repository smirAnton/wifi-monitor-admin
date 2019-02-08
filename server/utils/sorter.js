const DEFAULT_SORT = { _id: 1 };
const DESC = 'DESC';
const ASC = 'ASC';

/**
 * @description Parse sort params
 * @param  {Object} query Incoming params
 * @return {Object} Defined sort object for query
 */
export default (query = {}) => {
  let sortObj;

  try {
    sortObj = JSON.parse(query.sort);
  } catch (e) {
    sortObj = DEFAULT_SORT;
  }

  Object.keys(sortObj).forEach(key => {
    if (sortObj[key] === DESC) {
      sortObj[key] = -1;
    }

    if (sortObj[key] === ASC) {
      sortObj[key] = 1;
    }

    if (sortObj[key] === '') {
      delete sortObj[key];
    }
  });

  if (!Object.keys(sortObj).length) {
    sortObj = DEFAULT_SORT;
  }

  return sortObj;
};

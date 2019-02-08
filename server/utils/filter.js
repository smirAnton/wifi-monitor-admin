/*
  eslint
  newline-per-chained-call: 'off'
 */
/**
  * @description Filter query params into query object for mongoose request
  * @param  {Object} query [description]
  * @param  {Array}  args  [description]
  * @return {Object}       [description]
  */
export default (query, ...args) => {
  const filterObj = {};

  args.forEach(a => {
    const prop = query[a];

    if (prop) {
      switch (a) {
        case 'true': {
          filterObj[a] = true;
          break;
        }

        case 'search': {
          const pattern = new RegExp(prop, 'i');

          if (query.isDns) {
            filterObj.$or = [
              { keyword: pattern },
              { keywordService: pattern },
              { keywordCategory: pattern },
              { keywordSubcategory: pattern }
            ];
          } else if (query.isNdpi) {
            filterObj.$or = [
              { ndpi: pattern },
              { ndpiService: pattern },
              { ndpiCategory: pattern }
            ];
          } else if (query.isCategory) {
            filterObj.$or = [
              { name: pattern }
            ];
          } else if (query.isSuper) {
            filterObj.$or = [
              { keyword: pattern },
              { ndpi: pattern },
              { superService: pattern },
              { superCategory: pattern },
              { superSubcategory: pattern }
            ];
          } else if (query.isDevice) {
            filterObj.$or = [
              { mac: pattern },
              { version: pattern },
              { nickname: pattern }
            ];
          }

          break;
        }

        case 'false': {
          filterObj[a] = false;
          break;
        }

        default: {
          filterObj[a] = prop;
          break;
        }
      }
    }
  });

  return filterObj;
};

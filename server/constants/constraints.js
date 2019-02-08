export default {
  VALID: {
    username          : { length: { minimum: 1, maximum: 255 } },
    name              : { length: { minimum: 1, maximum: 255 } },
    password          : { length: { minimum: 6, maximum: 255 } },
    token             : { length: { minimum: 6, maximum: 255 } },
    email             : { email: true },

    ndpi              : { length: { maximum: 255 } },
    ndpiService       : { length: { minimum: 1, maximum: 255 } },
    ndpiCategory      : { length: { minimum: 1, maximum: 255 } },

    keyword           : { length: { maximum: 255 } },
    keywordService    : { length: { minimum: 1, maximum: 255 } },
    keywordCategory   : { length: { minimum: 1, maximum: 255 } },
    keywordSubcategory: { length: { minimum: 1, maximum: 255 } },

    internalIP        : { length: { minimum: 6, maximum: 255 } },

    limit             : { numericality: { onlyInteger: 1, greaterThan: 0 } },
    offset            : { numericality: { onlyInteger: 1, greaterThanOrEqualTo: 0 } },

    description       : { length: { maximum: 255 } }

    // secret            : { length: { is: 4 } },
    // _id               : { format: { pattern: UUID_V4_PATTERN } },
    // id                : { format: { pattern: UUID_V4_PATTERN } },
    // createdAt         : { datetime: true },
    // dateFrom          : { datetime: true },
    // dateTo            : { datetime: true },
  },

  REQUIRED: (...args) => args.reduce((r, a) => {
    r[a] = { presence: true };
    return r;
  }, {})
};

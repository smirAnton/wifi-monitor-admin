import BaseService from './base';

import { IconModel } from '../models';

import { ICONS_PROJECTION } from '../constants';

class IconsService extends BaseService {
  constructor() {
    super(IconModel, ICONS_PROJECTION);
  }

  /**
   * @description Add new keyword to icon
   * @async
   * @param {String} id      Icon unique id
   * @param {String} keyword New keyword
   */
  addKeyword = (id, keyword) => {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { keywords: { key: keyword } } },
      { lean: true, new: true }
    );
  };

  /**
   * @description Remove keyword from icon
   * @async
   * @param {String} id        Icon unique id
   * @param {String} keywordId Keyword unique id
   */
  removeKeyword = (id, keywordId) => {
    return this.model.findByIdAndUpdate(
      id,
      { $pull: { keywords: { _id: keywordId } } },
      { lean: true, new: true }
    );
  };
}

const iconsService = new IconsService();

export default iconsService;

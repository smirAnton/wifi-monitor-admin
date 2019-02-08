import BaseService from './base';

import { VersionModel } from '../models';

import { sort } from '../utils';

import { VERSIONS_PROJECTION } from '../constants';

class VersionService extends BaseService {
  constructor() {
    super(VersionModel, VERSIONS_PROJECTION);
  }

  /**
   * @description Fetch all versions
   * @async
   * @return {Promise} Exec promise
   */
  fetchAll = () => {
    const sortObj = sort({
      sort: JSON.stringify({ version: 'DESC' })
    });

    return VersionModel
      .find({}, VERSIONS_PROJECTION)
      .sort(sortObj)
      .lean()
      .exec();
  };

  /**
   * @description Create new version
   * @async
   * @param  {Object}  body Body object
   * @return {Promise} Exec promise
   */
  create = async body => {
    try {
      let version = await VersionModel.findOne({ version: body.version });

      if (!version) {
        version = await VersionModel.create(body);
      }

      return version;
    } catch (ex) {
      throw ex;
    }
  };
}

const versionService = new VersionService();

export default versionService;

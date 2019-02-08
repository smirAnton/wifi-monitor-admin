import BaseService from './base';

import { CategoryModel } from '../../models/index';

import { CSV_CATEGORIES_COLUMNS, CATEGORY_PROJECTION } from '../../constants/index';

class CategoryService extends BaseService {
  constructor() {
    super(CategoryModel, CATEGORY_PROJECTION, CSV_CATEGORIES_COLUMNS);
  }
}

const categoryService = new CategoryService();

export default categoryService;

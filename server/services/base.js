export default class BaseService {

  constructor(model, projection) {
    this.projection = projection;
    this.model = model;
  }

  create = item => {
    return this.model.create(item);
  };

  bulkCreate = (items, cb) => {
    return this.model.insertMany(items, cb);
  };

  count = () => {
    return this.model.count().lean().exec();
  };

  fetchAll = () => {
    return this.model.find({}, this.projection).lean().exec();
  };

  fetchById = _id => {
    return this.model.findOne({ _id }, this.projection).lean().exec();
  };

  update = (id, changes) => {
    return this.model.findByIdAndUpdate(id, changes, { lean: true, new: true });
  };

  patch = (id, minorChanges) => {
    return this.model.findByIdAndUpdate(id, minorChanges, { lean: true, new: true });
  };

  remove = id => {
    return this.model.findByIdAndRemove(id).exec();
  };

  removeAll = () => {
    return this.model.remove({}).exec();
  };
}

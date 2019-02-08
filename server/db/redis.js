import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisClient {
  constructor() {
    this.client = redis.createClient(
      parseInt(process.env.REDIS_DB_PORT, 10),
      process.env.REDIS_DB_HOST
    );
  }

  /**
   * @description Save data in storage
   * @param  {String}  hash  Hash
   * @param  {String}  key   Key
   * @param  {String}  value Value
   * @return {Promise} Exec promise
   */
  writeToStorage = (hash, key, value) => {
    const valueStr = JSON.stringify(value);
    return this.client.hsetAsync(hash, key, valueStr);
  };

  /**
   * @description Read data from storage
   * @param  {String}  hash  Hash
   * @param  {String}  key   Key
   * @return {Promise} Exec promise
   */
  readFromStorage = (hash, key) => {
    return new Promise((resolve, reject) => {
      this.client
        .hgetAsync(hash, key)
        .then(data => resolve(JSON.parse(data)))
        .catch(reject);
    });
  };

  /**
   * @description Read all data from storage
   * @param  {String}  hash  Hash
   * @return {Promise} Exec promise
   */
  readAllFromStorage = hash => {
    return this.client.hgetallAsync(hash);
  };

  /**
   * @description Remove data from storage
   * @param  {String}  hash  Hash
   * @param  {String}  key   Key
   * @return {Promise} Exec promise
   */
  removeFromStorage = (hash, key) => {
    return this.client.hdelAsync(hash, key);
  };

  /**
   * @description Set data to storage
   * @param  {String} key   Key
   * @param  {String} value Value
   * @return {Promise} Exec promise
   */
  setToStorage = (key, value) => {
    return this.client.setAsync(key, value);
  }

  /**
   * @description Read data from storage
   * @param  {String} key Key
   * @return {Promise} Exec promise
   */
  getFromStorage = key => {
    return this.client.getAsync(key);
  }
}
const redisClient = new RedisClient();

export default redisClient;

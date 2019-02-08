import convert from 'json2csv';
import { promisify } from 'util';

class BaseParser {
  constructor() {
    const decimalAdjust = (type, value, exp) => {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // If the value is negative...
      if (value < 0) {
        return -decimalAdjust(type, -value, exp);
      }
      /* eslint prefer-template: 'off' */
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
      /* eslint prefer-template: 'off' */
    };

    Math.round10 = (value, exp) => {
      return decimalAdjust('round', value, exp);
    };
  }

  /**
   * @description convert json to csv
   * @async
   * @param  {Array} data   List of objects
   * @param  {Array} fields List of title fields
   * @return {Promise} exec promise
   */
  json2csv = (data, fields) => {
    return promisify(convert)({ data, fields });
  };

  /**
   * @description Convert Map to Json
   * @param  {Map} map [description]
   * @return {String} Converted map into string
   */
  mapToJson = map => {
    return JSON.stringify([...map]);
  };

  /**
   * @description Json to Map
   * @param  {String} jsonStr Json string
   * @return {String} Converted json string into map
   */
  jsonToMap = jsonStr => {
    return new Map(JSON.parse(jsonStr));
  };

  /**
   * @description Convert Map to Json
   * @param  {Map} map [description]
   * @return {String} Converted map into string
   */
  mapToArray = (map = new Map()) => {
    const arr = [];
    map.forEach(i => { arr.push(i); });
    return arr;
  };
}

const baseParser = new BaseParser();

export const mapToArray = baseParser.mapToArray;
export const jsonToMap = baseParser.jsonToMap;
export const mapToJson = baseParser.mapToJson;
export const json2csv = baseParser.json2csv;

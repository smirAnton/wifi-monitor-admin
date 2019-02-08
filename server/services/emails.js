import request from 'request-promise';
import moment from 'moment';

import DeviceService from './devices';

const SENDGRID = {
  UNSUBSCRIBED_URI: 'https://api.sendgrid.com/api/unsubscribes',
  BLOCKED_URI: 'https://api.sendgrid.com/api/blocks'
};

class EmailService {

  /**
   * @description Get list of blocked emails
   * @async
   * @param  {Object}  [query={}] Query params
   * @return {Promise} Exec promise
   */
  getBlocked = async (query = {}) => {
    try {
      if (!query.start_time) { query.start_time = 0; }
      if (!query.end_time) { query.end_time = Math.floor(new Date().getTime() / 1000); }
      if (!query.offset) { query.offset = 0; }
      if (!query.limit) { query.limit = 10; }

      const devicesAll = await DeviceService.fetchAll();

      const emailsAll = await request({
        method: 'get',
        json: true,
        uri: `${SENDGRID.BLOCKED_URI}.get.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}`
      });

      const emailsPart = await request({
        method: 'get',
        json: true,
        uri: `${SENDGRID.BLOCKED_URI}.get.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}&start_time=${query.start_time}&end_time=${query.end_time}&limit=${query.limit}&offset=${query.offset}&date=1`
      });

      if (emailsPart[0]) {
        emailsPart[0].count = emailsAll.length;
      }

      return emailsPart.map(item => {
        const wfm = devicesAll.find(d =>
          (d.emails ? d.emails.includes(item.email) : false)
        );

        return {
          ...item,
          created: item.created ? moment(item.created).format('lll') : null,
          reason: item.reason.split(' ').slice(3).join(' '),
          wfm: wfm ? `WFM ${wfm._id}` : null
        };
      });
    } catch (ex) {
      throw ex;
    }
  };

  /**
   * @description Get list of unsubscribes emails
   * @async
   * @param  {Object}  [query={}] Query params
   * @return {Promise} Exec promise
   */
  getUnsubscribed = async (query = {}) => {
    try {
      if (!query.start_time) { query.start_time = 0; }
      if (!query.end_time) { query.end_time = Math.floor(new Date().getTime() / 1000); }
      if (!query.offset) { query.offset = 0; }
      if (!query.limit) { query.limit = 10; }

      const devicesAll = await DeviceService.fetchAll();

      const emailsAll = await request({
        method: 'get',
        json: true,
        uri: `${SENDGRID.UNSUBSCRIBED_URI}.get.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}`
      });

      const emailsPart = await request({
        method: 'get',
        json: true,
        uri: `${SENDGRID.UNSUBSCRIBED_URI}.get.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}&start_time=${query.start_time}&end_time=${query.end_time}&limit=${query.limit}&offset=${query.offset}&date=1`
      });

      if (emailsPart[0]) {
        emailsPart[0].count = emailsAll.length;
      }

      return emailsPart.map(item => {
        const wfm = devicesAll.find(d =>
          (d.emails ? d.emails.includes(item.email) : false)
        );

        return {
          ...item,
          created: item.created ? moment(item.created).format('lll') : null,
          wfm: wfm ? `WFM ${wfm._id}` : null
        };
      });
    } catch (ex) {
      throw ex;
    }
  };

  /**
   * @description Remove blocked email
   * @async
   * @param  {String}  email Email
   * @return {Promise} Exec promise
   */
  removeBlocked = email => {
    return request({
      method: 'post',
      json: true,
      uri: `${SENDGRID.BLOCKED_URI}.delete.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}&email=${email}`
    });
  };

  /**
   * @description Remove unsubscribed email
   * @async
   * @param  {String}  email Email
   * @return {Promise} Exec promise
   */
  removeUnsubscribed = email => {
    return request({
      method: 'post',
      json: true,
      uri: `${SENDGRID.UNSUBSCRIBED_URI}.delete.json?api_user=${process.env.SENDGRID_USERNAME}&api_key=${process.env.SENDGRID_PASSWORD}&email=${email}`
    });
  };
}

const emailService = new EmailService();

export default emailService;

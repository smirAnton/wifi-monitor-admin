import configureSG, { mail as mailHelper } from 'sendgrid';
import moment from 'moment';
import fs from 'fs';
import _ from 'underscore';

const sg = configureSG(process.env.SEND_GRID_API_KEY);

const TEMPLATES = {
  OFFLINE_REPORT: _.template(fs.readFileSync('templates/offline-report.html', 'utf8'))
  // add here other template for mailer
};

/**
 * @description Abstract email send client
 * @async
 * @param  {String}  to       Receiver email
 * @param  {String}  subject  Subject
 * @param  {String}  template Html template
 * @param  {Object}  options  Data to fill in email
 * @param  {File}    file1    Attachment 1
 * @param  {File}    file2    Attachment 2
 * @return {Promise} Exec promise
 */
const send = ({
  to,
  subject,
  template,
  options
}) => {
  const content = new mailHelper.Content('text/html', template(options));
  const person = new mailHelper.Personalization();
  const mail = new mailHelper.Mail();

  mail.setFrom(new mailHelper.Email('info@sifrsolutions.com', 'Wifi monitor'));
  mail.setSubject(subject);
  person.addTo(new mailHelper.Email(to));
  mail.addPersonalization(person);
  mail.addContent(content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return new Promise((resolve, reject) => {
    sg.API(request, (err, resp) => {
      err ? reject(err) : resolve(resp);
    });
  });
};

/**
 * @description Offline report for offline devices
 * @async
 * @param  {String}  to      Receiver email
 * @param  {Object}  options Options data
 * @return {Promise} Exec promise
 */
export const sendOfflineReport = (to, options) => {
  const today = moment().format('L');
  const subject = `WiFi Monitor Offline Alert ${today}`;

  return send({
    template: TEMPLATES.OFFLINE_REPORT,
    options,
    subject,
    to
  });
};

import generator from 'generate-password';
import uuid from 'node-uuid';

class Generator {
  /**
   * @description Generate unique key
   * @return {String} UUID
   */
  generateKey = () => {
    return uuid.v4();
  };

  /**
   * @description Generate password
   * @return {String} Unique password
   */
  generatePassword = () => {
    return generator.generate({ length: 10, numbers: true });
  };

  /**
   * @description Generate passcode for device
   * @param  {Array}  List of all devices
   * @return {String} Unique passcode
   */
  generateSecret = (devices = []) => {
    const secrets = devices.map(d => d.secrets);
    let secret = this.generateNumerics();

    while (secrets.includes(secret)) {
      secret = this.generateNumerics();
    }

    return secret;
  };

  /**
   * @description Generate numerics
   * @param  {Number} Amount of chars in numeric
   * @return {String} Unique passcode
   */
  generateNumerics = (length = 4) => {
    let number = '';

    const chars = '0123456789';

    for (let i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * chars.length);
      number += chars.substring(num, num + 1);
    }

    return number;
  };
}

const customGenerator = new Generator();

export default customGenerator;

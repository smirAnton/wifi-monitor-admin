import l from 'lodash';
import { ACTIVITIES } from '../constants';

const CATEGORIES_ORDER = [
  ACTIVITIES.EXCLUSIONS,
  ACTIVITIES.VIDEO_STREAMING,
  ACTIVITIES.VIDEO_OTHER,
  ACTIVITIES.VIDEO_ADULT,
  ACTIVITIES.AUDIO_STREAMING,
  ACTIVITIES.VIDEO_CALLING,
  ACTIVITIES.GAMING,
  ACTIVITIES.GAMING_XBOX,
  ACTIVITIES.WEB_OTHER_APPS,
  ACTIVITIES.WEB_BROWSING,
  ACTIVITIES.SOCIAL_MEDIA,
  ACTIVITIES.MESSAGING_EMAIL,
  ACTIVITIES.MESSAGING_APPS,
  ACTIVITIES.CONTENT_DELIVERY,
  ACTIVITIES.SMART_HOME,
  ACTIVITIES.FILE_SHARING
];

class Helper {
  sortDNSByCategories = dnsArr => {
    const o = l.groupBy(dnsArr, 'keywordCategory');
    const actualCategories = [...Object.keys(o), ACTIVITIES.OTHER];
    actualCategories.forEach(c => {
      if (o[c]) {
        o[c].sort((a, b) => (b.keyword.length - a.keyword.length));
      }
    });
    const orderedArr = l.flatMap(CATEGORIES_ORDER, c => o[c] || []);
    const arr = orderedArr.concat(actualCategories.reduce((res, c) => {
      if (o[c] && !CATEGORIES_ORDER.includes(c)) {
        res = res.concat(o[c]);
      }
      return res;
    }, []));
    arr.push(...arr.splice(arr.findIndex(el => el.keyword === 'www'), 1));
    return arr;
  };

  sortNDPIByCategories = ndpiArr => {
    const o = l.groupBy(ndpiArr, 'ndpiCategory');
    const actualCategories = [...Object.keys(o), ACTIVITIES.OTHER];
    actualCategories.forEach(c => {
      if (o[c]) {
        o[c].sort((a, b) => (b.ndpi.length - a.ndpi.length));
      }
    });
    const orderedArr = l.flatMap(CATEGORIES_ORDER, c => o[c] || []);
    return orderedArr.concat(actualCategories.reduce((res, c) => {
      if (o[c] && !CATEGORIES_ORDER.includes(c)) {
        res = res.concat(o[c]);
      }
      return res;
    }, []));
  };

  sortSuperByCategories = dnsArr => {
    const o = l.groupBy(dnsArr, 'keywordCategory');
    const actualCategories = [...Object.keys(o), ACTIVITIES.OTHER];
    actualCategories.forEach(c => {
      if (o[c]) {
        o[c].sort((a, b) => {
          if (a.keyword && b.keyword) {
            return b.keyword.length - a.keyword.length;
          } else if (a.keyword && !b.keyword) {
            return false;
          } else if (!a.keyword && b.keyword) {
            return true;
          } else if (a.ndpi && b.ndpi && !a.keyword && !b.keyword) {
            return b.ndpi.length - a.ndpi.length;
          } else if (a.ndpi && !b.ndpi && !a.keyword && !b.keyword) {
            return false;
          } else if (!a.ndpi && b.ndpi && !a.keyword && !b.keyword) {
            return true;
          }
          return false;
        });
      }
    });
    const orderedArr = l.flatMap(CATEGORIES_ORDER, c => o[c] || []);
    const arr = orderedArr.concat(actualCategories.reduce((res, c) => {
      if (o[c] && !CATEGORIES_ORDER.includes(c)) {
        res = res.concat(o[c]);
      }
      return res;
    }, []));
    return arr;
  };
}

const helper = new Helper();

export default helper;

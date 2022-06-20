import moment from 'moment';

const getFullName = nameObj => {
  const {firstName, midName, lastname} = nameObj;
  let fullName = '';
  //midName isn't mandatory
  if (midName) {
    fullName = `${firstName} ${midName} ${lastname}`;
  } else {
    fullName = `${firstName} ${lastname}`;
  }
  return fullName;
};

export default getFullName;

export const getNameInitials = userInfo => {
  try {
    const first = userInfo?.first_name?.charAt(0) ?? '';
    const second = userInfo?.last_name?.charAt(0) ?? '';
    const nameInitial = first + second;
    return nameInitial?.toUpperCase();
  } catch (e) {
    return '';
  }
};

export const numberFormat = num => {
  let fmtNum = num;
  if (num >= 1.0e9) {
    fmtNum = (num / 1.0e9).toFixed(2) + 'B';
  } else if (num >= 1.0e6) {
    fmtNum = (num / 1.0e6).toFixed(2) + 'M';
  } else if (num >= 1.0e3) {
    fmtNum = (num / 1.0e3).toFixed(2) + 'K';
  }
  return `${fmtNum}`;
};

export const objToString = jsonObj => {
  let initialArr = [];
  Object.entries(jsonObj).forEach(([key, value]) => {
    if (value) {
      initialArr.push(key);
    }
  });
  return initialArr.toString();
};

export const jsonToFormData = req => {
  let formData = new FormData();
  Object.entries(req).forEach(entry => {
    const [key, value] = entry;
    formData.append(key, value);
  });
  return formData;
};

export function getFileExtension(filename, splitFrom) {
  console.log(filename, splitFrom, 'filename, splitFrom');
  return filename.substring(
    filename.lastIndexOf(splitFrom) + 1,
    filename.length,
  );
}

export const getMediaFormatedForLibrary = media => {
  return {
    uri: media.path,
    type: media.mime,
    name: getFileExtension(media.path, '/'),
  };
};

export const checkHttps = link => {
  return link?.replace('http://', 'https://');
};

export const displayTime = time => {
  const result = moment(time).fromNow();
  if (result.includes('years')) return result.replace(' years', 'y');
  else if (result.includes('days')) return result.replace(' days', 'd');
  else if (result.includes('day')) return result.replace(' day', 'd');
  else if (result.includes('hours')) return result.replace(' hours', 'h');
  else if (result.includes('hour')) return result.replace(' hour', 'h');
  else if (result.includes('minutes')) return result.replace(' minutes', 'm');
  else if (result.includes('minute')) return result.replace(' minute', 'm');
  else if (result.includes('seconds')) return 'sec ago';
  return result;
};

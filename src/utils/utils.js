import request, { postOptionsFormData, postOptions } from './request';
import moment from 'moment';
import { get } from 'lodash';
import Config from 'react-native-config';

/**
 * Obtener filtro de reducer
 * @param {*} payload
 * @param {*} filterAffiliates
 */

export const getFilter = (payload, filterAffiliates) => {
  if (payload) {
    const { type, value } = payload;
    if (type === 'societyId' && typeof filterAffiliates?.subSocietyId !== 'undefined') {
      delete filterAffiliates['subSocietyId'];
    }
    const filterApply = value !== '' ? { [type]: value } : false;
    if (filterApply) {
      return {
        ...filterAffiliates,
        ...filterApply,
      };
    } else {
      delete filterAffiliates[type];
      return filterAffiliates;
    }
  } else {
    return filterAffiliates;
  }
};

/**
 *
 * @param {*} data
 */

export const buildFormData = (data) => {
  const formData = new FormData();
  formData.append('file', data);
  return formData;
};

/**
 * Subir una imagen al servidor
 * @param { containerName, fileFormdata, propsFilestorages } fileStorages
 */

export const uploadFileStorages = async ({ containerName, fileFormdata, propsFilestorages, forSociety = false }) => {
  try {
    let url, option;
    url = `${Config.URL_API}/containers/${containerName}/upload`;
    const formData = buildFormData(fileFormdata);
    option = postOptionsFormData(formData);
    const requestUpload = await request(url, option);
    const { size, name, originName, mediaLink, contentType } = requestUpload;

    url = forSociety ? `societies/${propsFilestorages.societyId}/main-picture` : `file-storages`;
    option = postOptions({
      size: parseInt(size),
      originName,
      format: contentType,
      name,
      link: mediaLink,
      state: 'ONLINE',
      ...propsFilestorages,
    });
    return await request(`${Config.URL_API}/${url}`, option);
  } catch {
    throw 'No se pudo registrar la imagen';
  }
};

/**
 *
 * @param {data, index} Index
 */

export const useIndex = ({ data, index }) =>
  data?.reduce(
    (valorAnterior, valorActual) => ({
      ...valorAnterior,
      [valorActual[index]]: valorActual,
    }),
    {}
  );

/**
 *
 * @param {*} object
 */

export const getFileStorages = (object) => {
  let fileStorages = {};
  if (object?.fileStorages && object.fileStorages.length > 0) {
    const { link, id, name } = object.fileStorages[0];
    fileStorages = { url: link, uid: id, name: name, status: `done` };
  }
  return fileStorages;
};

export const getFileStoragesObject = (object) => {
  let fileStorages = {};
  const { link, id, name } = object;
  fileStorages = { url: link, uid: id, name: name, status: `done` };
  return fileStorages;
};

/**
 *
 * @param {*} object
 */
export const cleanObject = (object) => {
  for (var propName in object) {
    if (object[propName] === null || object[propName] === undefined) {
      delete object[propName];
    }
  }
};

/**
 *
 * @param {*} countMinutes
 */
export const getTimeHoursAndMinutes = (countMinutes) => {
  // const hours = moment.utc().startOf("day").add({ minutes: countMinutes }).format("H").padStart(2, "0");
  const hours = moment.utc().startOf('day').add({ minutes: countMinutes }).format('H');
  const minutes = moment.utc().startOf('day').add({ minutes: countMinutes }).format('mm');
  return `${hours !== '0' ? hours + ' Horas y' : ''} ${minutes} Minutos`;
};

/**
 *
 * @param {*} profession
 */

export const getSpecialtiesToProfessions = (profession) => {
  return get(profession, 'divideds', []).map((divided) => {
    return {
      ...get(divided, 'specialty', {}),
    };
  });
};

export const getFileStorageObjectByTag = (fileStorages, objectTag) => {
  const object = Array.isArray(fileStorages)
    ? fileStorages?.find(({ tag }) => tag === objectTag)
    : fileStorages.tag === objectTag
    ? fileStorages
    : undefined;
  return object;
};

/**
 * Get the name of the connected host
 *
 * @param {object} req Request of server
 * @param {bool} trueHost Get the actual route
 *
 * @return {string} Returns name host
 */

export const getHostname = (req, trueHost = false) => {
  let hostname = 'localhost';
  if (req) {
    const host = req ? get(req.headers, 'x-forwarded-host', req.headers.host) : '';
    hostname = host?.indexOf('localhost') !== -1 && !trueHost ? 'localhost' : host;
  }
  return hostname;
};

/**
 *
 * @param {string} hostname Name of hostname
 * @param {string} cookieName Name cookie
 *
 * @return {string} Return cookie name in base64 with slice
 */

export const getCookieName = (hostname, cookieName) => {
  let cookieNameFinished;
  const isServer = typeof window === 'undefined';
  const fullCookieName = `${hostname}-${cookieName}`;
  if (isServer) cookieNameFinished = Buffer.from(fullCookieName).toString('base64');
  else cookieNameFinished = btoa(fullCookieName);
  // console.log(`isServer: ${isServer}, base64: ${cookieNameFinished}, hostname: ${hostname}`);
  return cookieNameFinished.slice(0, 10);
};

/**
 * Function to get keys enabled for auth
 *
 * @param {object} auth Auth Reducer
 *
 * @return {object} Return enable auth data
 */

export const getEnableAuthStorageData = (auth) => {
  if (!auth) return {};
  const enableKey = ['societyId', 'tokenUser', 'dataUser'];
  return Object.keys(auth).reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      ...(enableKey.includes(currentValue) ? { [currentValue]: auth[currentValue] } : {}),
    };
  }, {});
};

/**
 * Function to get keys enabled for users
 *
 * @param {object} user Auth Reducer
 *
 * @return {object} Return enable User data
 */

export const getEnableUserData = (user) => {
  if (!user) return {};
  const enableKey = [
    'id',
    'firstName',
    'lastName',
    'identityCard',
    'birthday',
    'username',
    'email',
    'codeReference',
    'nit',
    'gender',
    'Biography',
    'phone',
    'proffesion',
    'affiliationDate',
    'upToDate',
    'userTypeId',
    'userStateId',
    'instituteId',
    'societyId',
    'subSocietyId',
    'customizablePageId',
    'userTypeName',
    'fileStorages',
  ];
  return Object.keys(user).reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      ...(enableKey.includes(currentValue) ? { [currentValue]: user[currentValue] } : {}),
    };
  }, {});
};

/**
 * Function to get keys enabled for users
 *
 * @param {object} user Auth Reducer
 *
 * @return {object} Return enable User data
 */

export const getEnableUserStorageData = (user) => {
  if (!user) return {};
  const enableKey = ['user', 'authenticated', 'userTypes', 'token'];
  return Object.keys(user).reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      ...(enableKey.includes(currentValue) ? { [currentValue]: user[currentValue] } : {}),
    };
  }, {});
};

export const timeFormat = (time?: string) => {
  if (!time) return "";
  let date = new Date(time);
  let year = date.getFullYear();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let hour = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let sec = addZero(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minutes}:${sec}`;
};
const addZero = (num: number) => {
  return num > 10 ? num : "0" + num;
};

export const deepCopy = (obj = {}) => {
  let newObj = {};
  if (typeof obj === "object" && obj !== null) {
    newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
      newObj[key] = deepCopy(obj[key]);
    }
  } else {
    newObj = obj;
  }
  return newObj;
};

export const getPercentage = (value: number, totalValue: number) => {
  if (typeof value === "number" && totalValue) {
    return ((value / totalValue) * 100).toFixed(0) + "%";
  }
  return "0%";
};

export function getFormattedDate(epoc: any) {
  if (epoc) {
    const date = new Date(0);
    date.setUTCSeconds(epoc);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return month + "/" + day + "/" + year;
  }
  return "";
}

export function getFormattedTime(epoc: any) {

  if (epoc) {
    const date = new Date(0);
    date.setUTCSeconds(epoc);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ":" + minutes;
  }
  return "";
}

export function getNextDate(days: number) {
  try {
    let sevenDaysAhead = new Date();
    sevenDaysAhead.setDate(sevenDaysAhead.getDate() + days);
    return sevenDaysAhead;
  } catch (err) { return ""; }
}


export function getEpoc(date: string) {
  let currectTimeEpoc;
  try {
    currectTimeEpoc = (new Date(date)).getTime() / 1000;
    return String(currectTimeEpoc);
  }
  catch (err) {
    return "";
  }

}

export function Capitalize(str: string) {
  if (str) {
    return (str.toString().charAt(0).toUpperCase() + str.toString().slice(1));
  }
  return "";
}

export const prettifyKeys = (str: string) => {
  if (str) {
    str = str.toString().replace(/_/g, " ");
    return str;
  }
  return "";
};


export const getDecimalTill = (num: number | string, n: number = 0) => {
  if (num && ["string", "number"].includes(typeof num)) {
    return Number(num).toFixed(n) + '%';
  }
  return null;
};


export const getTimeDiff = (epoc: any) => {
  const comingDate = new Date(0);
  comingDate.setUTCSeconds(epoc);
  const today = new Date();
  const diffMs = (today.getTime() - comingDate.getTime()); //milliseconds
  const diffSecods = Math.floor(diffMs / 1000); // seconds
  const diffMins = Math.floor(diffSecods / 60); // min
  const diffHrs = Math.floor(diffMins / 60); // hour
  const diffDays = Math.floor(diffHrs / 24); // days

  if (diffMins < 1) {
    return `Now`;
  } else if (diffHrs < 1) {
    return `${diffMins} minutes ago`;
  } else if (diffHrs < 24) {
    return `${diffHrs} hours ago`;
  } else if (diffDays < 31) {
    return `${diffDays} days ago`;
  } else {
    return "Past";
  }
};

export const sortArrayByKey = (array: any[], key: string) => {
  return array?.sort((a, b) => {
    var x = a[key]?.toLowerCase();
    var y = b[key]?.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

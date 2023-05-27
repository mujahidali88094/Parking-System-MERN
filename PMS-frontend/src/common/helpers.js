export const cacheWithExpiry = (key, data, expiryTime) => {
  const now = new Date();

  const item = {
    value: data,
    expiry: now.getTime() + expiryTime,
  };

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log('Local Storage Full')
  }
};

export const retrieveCache = (key) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null
    }
    return item.value
};

export const clearCache = (key) => {
    localStorage.removeItem(key);
};

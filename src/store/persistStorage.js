const persistStorage = {
  getItem: (key) =>
    Promise.resolve(
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    ),
  setItem: (key, value) =>
    Promise.resolve(
      typeof window !== 'undefined'
        ? window.localStorage.setItem(key, value)
        : value
    ),
  removeItem: (key) =>
    Promise.resolve(
      typeof window !== 'undefined'
        ? window.localStorage.removeItem(key)
        : undefined
    ),
};

export default persistStorage;

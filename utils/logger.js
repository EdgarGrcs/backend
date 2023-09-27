//benefit of logging in its own module: when using external logging services
// like graylog or papertrail, you would only need to make changes in one place

const info = (...params) => {
  if (process.env.NODE_ENV !== "test") 
    console.log(...params);
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") 
    console.error(...params);
};

module.exports = {
  info,
  error,
};

module.exports = (innerFunction) => (parent, args, context, info) => {
  if (context.user) {
    return innerFunction(parent, args, context, info);
  }
  throw new Error('Unauthorized request');
};

const boom = require('@hapi/boom');

//construir middlewares de forma dinamica
function validatorHandler(schema, property) {
  //closures en js
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false});
    if(error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

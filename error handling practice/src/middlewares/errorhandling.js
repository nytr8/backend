function handlingError(err, req, res, next) {
  const response = {
    message: err.message,
  };
  if (process.env.NODE_ENVIRONMENT == "devlopement") {
    response.stack = err.stack;
  }

  res.status(err.status).json(response);
}

export default handlingError;

function errorMiddleware(err, req, res, next) {

  console.error("Error:", err.message);

  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    statusCode: statusCode
  });

}

module.exports = errorMiddleware;

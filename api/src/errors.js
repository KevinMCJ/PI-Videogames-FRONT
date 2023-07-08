// ? Error semantico del usuario.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 422;
  }
}

// ? Conflicto con el recurso valido enviado.
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

// ? Service Unavailable: No se pudo manejar la solicitud a terceros.
class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = 503;
  }
}

// ? Internal Server Error.
class DataBaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataBaseError";
    this.statusCode = 500;
  }
}

module.exports = { ValidationError, ConflictError, ApiError, DataBaseError };

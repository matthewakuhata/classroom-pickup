class HttpError extends Error {
  public code: number;

  constructor(
    message: string = "Unkown error occured",
    errorCode: number = 404
  ) {
    super(message);

    this.code = errorCode;
  }
}

export default HttpError;

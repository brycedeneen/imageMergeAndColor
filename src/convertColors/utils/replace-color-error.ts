const messages = {
  PARAMETER_INVALID: 'Parameter is not valid',
  PARAMETER_REQUIRED: 'Parameter is required',
};

export class ReplaceColorError extends Error {
  code: string;
  field: string;

  constructor(code, field) {
    super(messages[code]);
    this.name = this.constructor.name;
    this.code = code;
    this.field = field;
  }
}

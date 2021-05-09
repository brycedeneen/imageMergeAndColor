export class IsNumber {
  static validate(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }
}

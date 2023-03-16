import { ValueObjectBase } from 'src/libs/';
import { IsNumber, NumberMax, NumberMin } from 'src/libs/validations';

export class FeeTaxValueObject extends ValueObjectBase<number> {
  constructor(value?: number) {
    super(value ? value : 0);
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsNumber(this.value)) {
      const error = {
        field: 'FeeTax',
        message: "Tax of fee don't contains a number",
      };
      this.setError(error);
    }
    if (NumberMax(this.value, 999999999999) === false) {
      const error = {
        field: 'FeeTax',
        message: 'The tax of fee is more than 999999999999',
      };
      this.setError(error);
    }
    if (NumberMin(this.value, 1) === false) {
      const error = {
        field: 'FeeTax',
        message: 'The tax of fee is less than 1',
      };
      this.setError(error);
    }
  }
}

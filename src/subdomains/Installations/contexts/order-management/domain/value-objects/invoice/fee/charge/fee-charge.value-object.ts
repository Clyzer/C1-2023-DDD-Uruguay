import { ValueObjectBase } from '../../../../../../../../../libs/sofka/bases';
import {
  IsNumber,
  NumberMax,
  NumberMin,
} from '../../../../../../../../../libs/validations';

export class FeeChargeValueObject extends ValueObjectBase<number> {
  constructor(value?: number) {
    super(value ? value : 0);
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsNumber(this.value)) {
      const error = {
        field: 'FeeCharge',
        message: "Charge of fee don't contains a number",
      };
      this.setError(error);
    }
    if (NumberMin(this.value, 1) === false) {
      const error = {
        field: 'FeeCharge',
        message: 'The charge of fee is less or equal to 1',
      };
      this.setError(error);
    }
    if (NumberMax(this.value, 999999999999) === false) {
      const error = {
        field: 'FeeCharge',
        message: 'The charge of fee is more or equal to 999999999999',
      };
      this.setError(error);
    }
  }
}

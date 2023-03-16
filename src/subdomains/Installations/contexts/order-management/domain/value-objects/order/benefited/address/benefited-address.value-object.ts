import { ValueObjectBase } from '../../../../../../../../../libs/sofka/bases';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from '../../../../../../../../../libs/validations';

export class BenefitedAddressValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : '');
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: 'BenefitedAddress',
        message: "Address of benefited don't contains a string",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 6) === false) {
      const error = {
        field: 'BenefitedAddress',
        message: 'The address of benefited length is less or equal to 8',
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 50) === false) {
      const error = {
        field: 'BenefitedAddress',
        message: 'The address of benefited length is more or equal to 15',
      };
      this.setError(error);
    }
  }
}

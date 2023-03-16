import { ValueObjectBase } from '../../../../../../../../../libs/sofka/bases';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from '../../../../../../../../../libs/validations';

export class BenefitedNameValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : '');
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: 'BenefitedName',
        message: "Name of benefited don't contains a string",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 2) === false) {
      const error = {
        field: 'BenefitedName',
        message: 'The name of benefited length is less or equal to 2',
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 32) === false) {
      const error = {
        field: 'BenefitedName',
        message: 'The name of benefited length is more or equal to 32',
      };
      this.setError(error);
    }
  }
}

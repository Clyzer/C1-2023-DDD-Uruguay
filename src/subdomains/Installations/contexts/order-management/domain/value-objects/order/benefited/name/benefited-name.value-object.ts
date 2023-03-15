import { ValueObjectBase } from 'src/libs/';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from 'src/libs/validations';

export class BenefitedNameValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : "");
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: "BenefitedName",
        message: "Name of benefited don't contains a string",
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 32) === false) {
      const error = {
        field: "BenefitedName",
        message: "The name of benefited length is more than 32",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 1) === false) {
      const error = {
        field: "BenefitedName",
        message: "The name of benefited length is less than 1",
      };
      this.setError(error);
    }
  }
}

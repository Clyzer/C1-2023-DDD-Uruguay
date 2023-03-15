import { ValueObjectBase } from 'src/libs/';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from 'src/libs/validations';

export class CompanyNameValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : "");
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: "CompanyName",
        message: "Name of company don't contains a string",
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 32) === false) {
      const error = {
        field: "CompanyName",
        message: "The name of company length is more than 32",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 1) === false) {
      const error = {
        field: "CompanyName",
        message: "The name of company length is less than 1",
      };
      this.setError(error);
    }
  }
}

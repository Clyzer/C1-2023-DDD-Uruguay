import { ValueObjectBase } from 'src/libs/';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from 'src/libs/validations';

export class EmployedPhoneValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : "");
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: "EmployedPhone",
        message: "Phone of employed don't contains a string",
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 15) === false) {
      const error = {
        field: "EmployedPhone",
        message: "The phone of employed length is more than 15",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 8) === false) {
      const error = {
        field: "EmployedPhone",
        message: "The phone of employed length is less than 8",
      };
      this.setError(error);
    }
  }
}

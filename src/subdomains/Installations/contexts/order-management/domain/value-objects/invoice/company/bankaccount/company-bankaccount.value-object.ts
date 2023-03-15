import { ValueObjectBase } from 'src/libs/';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from 'src/libs/validations';

export class CompanyBankAccountValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : "");
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: "CompanyBankAccount",
        message: "Bank account of company don't contains a string",
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 15) === false) {
      const error = {
        field: "CompanyBankAccount",
        message: "The bank account of company length is more than 15",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 5) === false) {
      const error = {
        field: "CompanyBankAccount",
        message: "The bank account of company length is less than 8",
      };
      this.setError(error);
    }
  }
}

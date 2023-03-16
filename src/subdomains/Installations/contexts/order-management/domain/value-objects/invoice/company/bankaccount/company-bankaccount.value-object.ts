import { ValueObjectBase } from '../../../../../../../../../libs/sofka/bases';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from '../../../../../../../../../libs/validations';

export class CompanyBankAccountValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : '');
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: 'CompanyBankAccount',
        message: "Bank account of company don't contains a string",
      };
      this.setError(error);
    }
    if (this.value && StringMinLength(this.value, 5) === false) {
      const error = {
        field: 'CompanyBankAccount',
        message: 'The bank account of company length is less or equal to 5',
      };
      this.setError(error);
    }
    if (this.value && StringMaxLength(this.value, 15) === false) {
      const error = {
        field: 'CompanyBankAccount',
        message: 'The bank account of company length is more or equal to 15',
      };
      this.setError(error);
    }

  }
}

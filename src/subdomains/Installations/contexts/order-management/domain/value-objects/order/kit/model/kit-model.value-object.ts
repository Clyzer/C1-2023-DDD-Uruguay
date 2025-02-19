import { ValueObjectBase } from '../../../../../../../../../libs/sofka/bases';
import {
  IsString,
  StringMaxLength,
  StringMinLength,
} from '../../../../../../../../../libs/validations';

export class KitModelValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : '');
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && !IsString(this.value)) {
      const error = {
        field: 'KitModel',
        message: "Model of kit don't contains a string",
      };
      this.setError(error);
    }
    if (StringMinLength(this.value, 2) === false) {
      const error = {
        field: 'KitModel',
        message: 'The model of kit length is less or equal to 2',
      };
      this.setError(error);
    }
    if (StringMaxLength(this.value, 10) === false) {
      const error = {
        field: 'KitModel',
        message: 'The model of kit length is more or equal to 10',
      };
      this.setError(error);
    }
  }
}

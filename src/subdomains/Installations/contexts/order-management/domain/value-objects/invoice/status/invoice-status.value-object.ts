import { ValueObjectBase } from 'src/libs/';
import { IsBoolean } from 'src/libs/validations';

export class InvoiceStatusValueObject extends ValueObjectBase<boolean> {
  constructor(value?: boolean) {
    super(value ? value : false);
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsBoolean(this.value) === false) {
      const error = {
        field: 'InvoiceStatus',
        message: 'The status does not contain a boolean',
      };
      this.setError(error);
    }
  }
}

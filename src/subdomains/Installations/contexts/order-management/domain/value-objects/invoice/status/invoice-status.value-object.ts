import { ValueObjectBase } from '../../../../../../../../libs/sofka/bases';
import { IsBoolean } from '../../../../../../../../libs/validations';

export class InvoiceStatusValueObject extends ValueObjectBase<boolean> {
  constructor(value?: boolean) {
    super(value ? value : true);
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

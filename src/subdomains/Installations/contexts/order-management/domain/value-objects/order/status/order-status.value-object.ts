import { ValueObjectBase } from '../../../../../../../../libs/sofka/bases';
import { IsBoolean } from '../../../../../../../../libs/validations';

export class OrderStatusValueObject extends ValueObjectBase<boolean> {
  constructor(value?: boolean) {
    super(value ? value : false);
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsBoolean(this.value) === false) {
      const error = {
        field: 'OrderStatus',
        message: 'The status does not contain a boolean',
      };
      this.setError(error);
    }
  }
}

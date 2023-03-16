import { v4 as uuid } from 'uuid';

import { ValueObjectBase } from '../../../../../../../../libs/sofka/bases';
import { IsUUID } from '../../../../../../../../libs/validations';

export class InvoiceIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID(this.value) === false) {
      const error = {
        field: 'InvoiceID',
        message: 'The id does not contain a valid UUIDV4 structure',
      };
      this.setError(error);
    }
  }
}

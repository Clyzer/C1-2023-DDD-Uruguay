import { ValueObjectBase } from 'src/libs/';
import { IsUUID } from 'src/libs/validations';
import { v4 as uuid } from 'uuid';

export class EmployedIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID(this.value) === false) {
      const error = {
        field: 'EmployedID',
        message: 'The id does not contain a valid UUIDV4 structure',
      };
      this.setError(error);
    }
  }
}

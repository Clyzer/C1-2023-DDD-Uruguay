import { Injectable } from '@nestjs/common';

import { IEmployedDomainService } from '../../../../../../domain/services/order';
import { EmployedMySqlEntity } from '../../entities';
import { EmployedRepository } from '../../repositories';

@Injectable()
export class EmployedMySqlService
  implements IEmployedDomainService<EmployedMySqlEntity>
{
  constructor(private readonly employedRepository: EmployedRepository) {}

  createEmployed(employed: EmployedMySqlEntity): Promise<EmployedMySqlEntity> {
    return this.employedRepository.create(employed);
  }

  getEmployed(employedId: string): Promise<EmployedMySqlEntity> {
    return this.employedRepository.findById(employedId);
  }

  deleteEmployed(employedId: string): Promise<boolean> {
    return this.employedRepository.delete(employedId);
  }

  updateEmployedName(
    employedId: string,
    newEmployedName: EmployedMySqlEntity,
  ): Promise<EmployedMySqlEntity> {
    return this.employedRepository.update(employedId, newEmployedName);
  }

  updateEmployedPhone(
    employedId: string,
    newEmployedPhone: EmployedMySqlEntity,
  ): Promise<EmployedMySqlEntity> {
    return this.employedRepository.update(employedId, newEmployedPhone);
  }
}

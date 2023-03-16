import { EmployedDomainEntityBase } from '../../entities/order';

export interface IEmployedDomainService<
  T extends EmployedDomainEntityBase = EmployedDomainEntityBase,
> {
  createEmployed(employed: T): Promise<T>;
  getEmployed(employedId: string): Promise<T>;
  deleteEmployed(employedId: string): Promise<boolean>;
  updateEmployedName(employedId: string, newEmployedName: T): Promise<T>;
  updateEmployedPhone(employedId: string, newEmployedPhone: T): Promise<T>;
}

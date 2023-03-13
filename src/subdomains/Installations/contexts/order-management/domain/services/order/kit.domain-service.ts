import { KitDomainEntityBase } from '../../entities/order';

export interface IKitDomainService<T extends KitDomainEntityBase = KitDomainEntityBase> {
  createKit(kit: T): Promise<T>;
  getKit(kitId: string): Promise<T>;
  updateKitModel(kitId: string, newKitModel: T): Promise<T>;
}
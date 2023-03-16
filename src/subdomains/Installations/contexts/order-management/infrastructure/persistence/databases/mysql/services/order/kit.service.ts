import { Injectable } from '@nestjs/common';

import { IKitDomainService } from '../../../../../../domain/services/order';
import { KitMySqlEntity } from '../../entities';
import { KitRepository } from '../../repositories';

@Injectable()
export class KitMySqlService implements IKitDomainService<KitMySqlEntity> {
  constructor(private readonly kitRepository: KitRepository) {}

  createKit(kit: KitMySqlEntity): Promise<KitMySqlEntity> {
    return this.kitRepository.create(kit);
  }

  getKit(kitId: string): Promise<KitMySqlEntity> {
    return this.kitRepository.findById(kitId);
  }

  deleteKit(kitId: string): Promise<boolean> {
    return this.kitRepository.delete(kitId);
  }

  updateKitModel(
    kitId: string,
    newKitModel: KitMySqlEntity,
  ): Promise<KitMySqlEntity> {
    return this.kitRepository.update(kitId, newKitModel);
  }
}

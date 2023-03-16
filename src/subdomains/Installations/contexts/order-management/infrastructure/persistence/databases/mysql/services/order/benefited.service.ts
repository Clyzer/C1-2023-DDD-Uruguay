import { Injectable } from '@nestjs/common';

import { IBenefitedDomainService } from '../../../../../../domain/services/order';
import { BenefitedMySqlEntity } from '../../entities';
import { BenefitedRepository } from '../../repositories';

@Injectable()
export class BenefitedMySqlService
  implements IBenefitedDomainService<BenefitedMySqlEntity>
{
  constructor(private readonly benefitedRepository: BenefitedRepository) {}

  createBenefited(
    benefited: BenefitedMySqlEntity,
  ): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.create(benefited);
  }

  getBenefited(benefitedId: string): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.findById(benefitedId);
  }

  deleteBenefited(benefitedId: string): Promise<boolean> {
    return this.benefitedRepository.delete(benefitedId);
  }

  updateBenefitedAddress(
    benefitedId: string,
    newBenefitedAddress: BenefitedMySqlEntity,
  ): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.update(benefitedId, newBenefitedAddress);
  }

  updateBenefitedCompanyId(
    benefitedId: string,
    newBenefitedCompanyId: BenefitedMySqlEntity,
  ): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.update(benefitedId, newBenefitedCompanyId);
  }

  updateBenefitedName(
    benefitedId: string,
    newBenefitedName: BenefitedMySqlEntity,
  ): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.update(benefitedId, newBenefitedName);
  }

  updateBenefitedPhone(
    benefitedId: string,
    newBenefitedPhone: BenefitedMySqlEntity,
  ): Promise<BenefitedMySqlEntity> {
    return this.benefitedRepository.update(benefitedId, newBenefitedPhone);
  }
}

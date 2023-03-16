import { Injectable } from '@nestjs/common';

import { IFeeDomainService } from '../../../../../../domain/services/invoice';
import { FeeMySqlEntity } from '../../entities';
import { FeeRepository } from '../../repositories';

@Injectable()
export class FeeMySqlService implements IFeeDomainService<FeeMySqlEntity> {
  constructor(private readonly feeRepository: FeeRepository) {}

  createFee(fee: FeeMySqlEntity): Promise<FeeMySqlEntity> {
    return this.feeRepository.create(fee);
  }

  getFee(feeId: string): Promise<FeeMySqlEntity> {
    return this.feeRepository.findById(feeId);
  }

  deleteFee(feeId: string): Promise<boolean> {
    return this.feeRepository.delete(feeId);
  }

  updateFeeCharge(
    feeId: string,
    newFeeCharge: FeeMySqlEntity,
  ): Promise<FeeMySqlEntity> {
    return this.feeRepository.update(feeId, newFeeCharge);
  }

  updateFeeTax(
    feeId: string,
    newFeeTax: FeeMySqlEntity,
  ): Promise<FeeMySqlEntity> {
    return this.feeRepository.update(feeId, newFeeTax);
  }
}

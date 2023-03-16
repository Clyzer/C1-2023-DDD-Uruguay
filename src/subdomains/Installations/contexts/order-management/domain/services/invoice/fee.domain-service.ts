import { FeeDomainEntityBase } from '../../entities/invoice';

export interface IFeeDomainService<
  T extends FeeDomainEntityBase = FeeDomainEntityBase,
> {
  createFee(fee: T): Promise<T>;
  getFee(feeId: string): Promise<T>;
  deleteFee(feeId: string): Promise<boolean>;
  updateFeeCharge(feeId: string, newFeeCharge: T): Promise<T>;
  updateFeeTax(feeId: string, newFeeTax: T): Promise<T>;
}

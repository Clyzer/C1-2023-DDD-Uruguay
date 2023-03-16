import { BenefitedDomainEntityBase } from '../../entities/order';

export interface IBenefitedDomainService<
  T extends BenefitedDomainEntityBase = BenefitedDomainEntityBase,
> {
  createBenefited(benefited: T): Promise<T>;
  getBenefited(benefitedId: string): Promise<T>;
  deleteBenefited(benefitedId: string): Promise<boolean>;
  updateBenefitedAddress(
    benefitedId: string,
    newBenefitedAddress: T,
  ): Promise<T>;
  updateBenefitedCompanyId(
    benefitedId: string,
    newBenefitedCompanyId: T,
  ): Promise<T>;
  updateBenefitedName(benefitedId: string, newBenefitedName: T): Promise<T>;
  updateBenefitedPhone(benefitedId: string, newBenefitedPhone: T): Promise<T>;
}

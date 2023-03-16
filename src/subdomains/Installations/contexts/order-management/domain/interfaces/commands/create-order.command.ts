import {
  IBenefitedDomainEntity,
  IEmployedDomainEntity,
  IKitDomainEntity,
} from '../../entities/interfaces';

export interface ICreateOrderCommand {
  status?: boolean;
  kit?: IKitDomainEntity;
  employed?: IEmployedDomainEntity;
  benefited?: IBenefitedDomainEntity;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}

import {
  ICompanyDomainEntity,
  IFeeDomainEntity,
} from '../../entities/interfaces';

export interface ICreateInvoiceCommand {
  status?: boolean;
  company?: ICompanyDomainEntity;
  fee?: IFeeDomainEntity;
  companyId?: string;
  feeId?: string;
}

import { v4 as uuidv4 } from 'uuid';

import {
  CompanyBankAccountValueObject,
  CompanyIdValueObject,
  CompanyNameValueObject,
} from '../../value-objects/invoice';
import { ICompanyDomainEntity } from '../interfaces';

export class CompanyDomainEntityBase implements ICompanyDomainEntity {
  companyId?: string | CompanyIdValueObject;
  name?: string | CompanyNameValueObject;
  bankAccount?: string | CompanyBankAccountValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor(_data?: ICompanyDomainEntity) {
    if (_data?.companyId) this.companyId = _data.companyId;
    else this.companyId = uuidv4();

    if (_data?.name) this.name = _data.name;

    if (_data?.bankAccount) this.bankAccount = _data.bankAccount;

    if (_data?.companyId) this.companyId = _data.companyId;

    this.createdAt = Date.now();
  }
}

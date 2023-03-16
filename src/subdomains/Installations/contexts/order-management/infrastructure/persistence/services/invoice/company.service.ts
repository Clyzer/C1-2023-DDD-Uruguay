import { Injectable } from '@nestjs/common';

import { CompanyMySqlService } from '../../databases/mysql/services';

@Injectable()
export class CompanyService extends CompanyMySqlService {}

import { Injectable } from '@nestjs/common';

import { BenefitedMySqlService } from '../../databases/mysql/services';

@Injectable()
export class BenefitedService extends BenefitedMySqlService {}

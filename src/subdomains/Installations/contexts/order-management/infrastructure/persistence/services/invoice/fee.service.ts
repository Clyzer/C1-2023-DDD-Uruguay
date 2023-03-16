import { Injectable } from '@nestjs/common';

import { FeeMySqlService } from '../../databases/mysql/services';

@Injectable()
export class FeeService extends FeeMySqlService {}

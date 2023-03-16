import { Injectable } from '@nestjs/common';

import { EmployedMySqlService } from '../../databases/mysql/services';

@Injectable()
export class EmployedService extends EmployedMySqlService {}

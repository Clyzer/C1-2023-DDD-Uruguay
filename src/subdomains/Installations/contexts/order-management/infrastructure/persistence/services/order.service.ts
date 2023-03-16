import { Injectable } from '@nestjs/common';

import { OrderMySqlService } from '../databases/mysql/services';

@Injectable()
export class OrderService extends OrderMySqlService {}

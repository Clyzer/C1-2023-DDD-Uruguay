import { Injectable } from '@nestjs/common';

import { InvoiceMySqlService } from '../databases/mysql/services';

@Injectable()
export class InvoiceService extends InvoiceMySqlService {}

import { Injectable } from '@nestjs/common';

import { KitMySqlService } from '../../databases/mysql/services';

@Injectable()
export class KitService extends KitMySqlService {}

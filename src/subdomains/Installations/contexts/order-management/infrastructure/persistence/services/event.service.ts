import { Injectable } from '@nestjs/common';

import { EventMySqlService } from '../databases/mysql/services';

@Injectable()
export class EventService extends EventMySqlService {}

import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetKitCommand } from '../../../../domain/interfaces/commands/order';

export class GetKitCommand implements IGetKitCommand {
  @ApiProperty()
  @IsString()
  kitId: string;
}

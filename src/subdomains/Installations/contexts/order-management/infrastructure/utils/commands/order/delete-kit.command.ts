import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteKitCommand } from '../../../../domain/interfaces/commands/order';

export class DeleteKitCommand implements IDeleteKitCommand {
  @ApiProperty()
  @IsString()
  kitId: string;
}

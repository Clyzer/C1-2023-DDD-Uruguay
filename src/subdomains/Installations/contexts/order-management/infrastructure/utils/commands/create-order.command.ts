import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  ICreateBenefitedCommand,
  ICreateEmployedCommand,
  ICreateKitCommand,
  ICreateOrderCommand,
} from '../../../domain/interfaces/commands';

export class CreateOrderCommand implements ICreateOrderCommand {

  @ApiProperty()
  @IsBoolean()
  status?: boolean;

  @ApiProperty()
  @IsObject()
  kit?: ICreateKitCommand;

  @ApiProperty()
  @IsObject()
  employed?: ICreateBenefitedCommand;

  @ApiProperty()
  @IsObject()
  benefited?: ICreateEmployedCommand;

  @ApiProperty()
  @IsString()
  kitId?: string;

  @ApiProperty()
  @IsString()
  employedId?: string;

  @ApiProperty()
  @IsString()
  benefitedId?: string;

  @ApiProperty()
  @IsNumber()
  createdAt?: number;

  @ApiProperty()
  @IsNumber()
  updatedAt?: number;

  @ApiProperty()
  @IsNumber()
  deletedAt?: number;
}

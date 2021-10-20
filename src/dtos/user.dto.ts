import { IsNumber } from 'class-validator';

export class GetUserSummaryDto {
  @IsNumber()
  public id: number;
}

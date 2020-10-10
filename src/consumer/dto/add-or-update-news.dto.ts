import { ApiProperty } from "@nestjs/swagger";

export class addOrUpdateNewsDto {
  @ApiProperty()
  newsId: number;
  @ApiProperty()
  isComplete: boolean;
  @ApiProperty()
  newsDetailId: string;
  @ApiProperty()
  date: Date;
}
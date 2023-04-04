import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'users',
  //스키마에 대한 옵션 db에서 하나가 만들어 질 때 timestamps를 하나 찍어준다.
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'test@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  //인자 입증을 위한 validation을 (라이브러리 다운) 추가해줘야한다.
  email: string;

  @ApiProperty({
    example: 'kim',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'dessert',
    description: 'channel',
  })
  @IsString()
  channel: string | null;

  @ApiProperty({
    example: '001',
    description: 'room number',
  })
  @IsString()
  position: string | null;

  @ApiProperty({
    example: 0,
    description: 'win count',
  })
  @Prop({ default: 0, required: true })
  @IsNumber()
  win: number;

  @ApiProperty({
    example: 0,
    description: 'lose count',
  })
  @Prop({ default: 0, required: true })
  @IsNumber()
  lose: number;

  @ApiProperty({
    example: [1, 2, 3, 4],
    description: 'Cards owned by user',
  })
  @IsNumber()
  cards: [number];

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    channel: string;
    position: string | null;
    win: number;
    lose: number;
    cards: [number];
  };
}

export const _UsersSchema = SchemaFactory.createForClass(User);

//필터링해서 클라이언트에 전달해준다고 생각하면 된다.
_UsersSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    channel: this.channel,
    position: this.position,
    win: this.win,
    lose: this.lose,
    cards: this.cards,
  };
});

export const UsersSchema = _UsersSchema;

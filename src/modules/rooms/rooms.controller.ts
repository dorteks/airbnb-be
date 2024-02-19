import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/rooms.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Get('/')
  get() {
    return this.roomService.getRooms();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.roomService.getSingleRoom(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.updateRoom(id, createRoomDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomService.deleteRoom(id);
  }
}

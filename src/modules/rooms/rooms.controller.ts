import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { TCreateRoomDto } from './dto/rooms';
import { RoomsService } from './rooms.service';
import { Auth as CustomAuthGuard } from '../auth/decorators/auth.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('user')
  // CustomAuthGuard combines the function of both AuthGuard and RolesGuard

  // @CustomAuthGuard({ roles: ['admin'] })
  @Post()
  async create(@Body() createRoomDto: TCreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @CustomAuthGuard({ roles: ['user'] })
  @Get('/')
  get() {
    return this.roomService.getRooms();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.roomService.getSingleRoom(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createRoomDto: TCreateRoomDto) {
    return this.roomService.updateRoom(id, createRoomDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomService.deleteRoom(id);
  }
}

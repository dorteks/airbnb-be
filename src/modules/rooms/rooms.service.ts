import { and, eq } from 'drizzle-orm';
import { CreateRoomDto } from './dto/rooms.dto';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from '../drizzle/drizzle.module';
import * as schema from '../../modules/drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type TDrizzle = NodePgDatabase<typeof schema>;

@Injectable()
export class RoomsService {
  constructor(@Inject(DATABASE) private readonly drizzle: TDrizzle) {}

  async getRooms() {
    const rooms = await this.drizzle.query.Rooms.findMany();

    return { message: 'Success 🔥', data: rooms };
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    const newRoom = await this.drizzle
      .insert(schema.Rooms)
      .values([createRoomDto]);

    return { message: 'Success 🔥', data: newRoom.fields };
  }

  async getSingleRoom(roomId: number) {
    const room = await this.drizzle.query.Rooms.findFirst({
      where: and(eq(schema.Rooms.id, roomId)),
    });

    return { message: 'Success 🔥', data: room };
  }

  async updateRoom(roomId: number, createRoomDto: CreateRoomDto) {
    const updatedRoom = await this.drizzle
      .update(schema.Rooms)
      .set(createRoomDto)
      .where(and(eq(schema.Rooms.id, roomId)));

    return { message: 'Success 🔥', data: updatedRoom.fields };
  }

  async deleteRoom(roomId: number) {
    const deletedRoom = await this.drizzle
      .delete(schema.Rooms)
      .where(and(eq(schema.Rooms.id, roomId)));

    return { message: 'Success 🔥', data: deletedRoom.rowCount };
  }
}

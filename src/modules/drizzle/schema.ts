import {
  text,
  serial,
  varchar,
  integer,
  pgSchema,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const airbnbSchema = pgSchema('airbnb-be');

export const User = airbnbSchema.table(
  'user',
  {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    email: varchar('email', { length: 64 }).unique().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex('email_idx').on(user.email),
  }),
);

export const Auth = airbnbSchema.table('auth', {
  id: serial('id').primaryKey(),
  password: text('password'),
  userId: integer('user_id')
    .notNull()
    .references(() => User.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const Rooms = airbnbSchema.table('rooms', {
  id: serial('id').primaryKey(),
  name: varchar('room_name'),
  price: varchar('room_price'),
  description: varchar('room_description'),
  check_in: timestamp('check_in_at', { withTimezone: true }),
  check_out: timestamp('check-out_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

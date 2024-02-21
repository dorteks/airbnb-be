import { relations } from 'drizzle-orm';
import {
  text,
  serial,
  pgEnum,
  varchar,
  integer,
  boolean,
  pgSchema,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const airbnbSchema = pgSchema('airbnb-be');

export const RoleMap = ['user', 'admin'] as const;
export const RoleEnum = pgEnum('role', RoleMap);
export type TRole = (typeof RoleEnum.enumValues)[number];

export const UserStatusMap = ['not_verified', 'verified'] as const;
export const UserStatusEnum = pgEnum('user_status', UserStatusMap);
export type TUserStatus = (typeof UserStatusEnum.enumValues)[number];

export type TAuth = typeof Auth.$inferInsert;
export type TVerificationCode = typeof VerificationCode.$inferInsert;
export type TVerificationStatus = typeof VerificationCode.$inferInsert;

export type TUser = typeof User.$inferSelect & {
  auth: TAuth;
  code: TVerificationCode;
  status: TVerificationStatus;
};

export const User = airbnbSchema.table(
  'user',
  {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    email: varchar('email', { length: 64 }).unique().notNull(),
    phone: varchar('phone').unique().notNull(),
    role: RoleEnum('role').default('user').notNull(),
    status: UserStatusEnum('status').default('not_verified'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex('email_idx').on(user.email),
  }),
);

export const VerificationCode = airbnbSchema.table('verification_code', {
  id: serial('id').primaryKey(),
  code: varchar('code').unique(),
  userId: integer('user_id')
    .notNull()
    .references(() => User.id),
  expiresAt: timestamp('expires_at', { withTimezone: true }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const VerificationStatus = airbnbSchema.table('verification_status', {
  id: serial('id').primaryKey(),
  email: boolean('email').default(false),
  phone: boolean('phone').default(false),
  userId: integer('user_id')
    .notNull()
    .references(() => User.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const Auth = airbnbSchema.table('auth', {
  id: serial('id').primaryKey(),
  password: text('password'),
  refreshToken: text('refresh_token'),
  accessToken: varchar('access_token'),
  lastPing: timestamp('last_ping', { withTimezone: true }).defaultNow(),
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

export const UserRelations = relations(User, ({ one, many }) => ({
  referees: many(User),
  auth: one(Auth, { fields: [User.id], references: [Auth.userId] }),
  code: one(VerificationCode, {
    fields: [User.id],
    references: [VerificationCode.userId],
  }),
  authStatus: one(VerificationStatus, {
    fields: [User.id],
    references: [VerificationStatus.userId],
  }),
}));

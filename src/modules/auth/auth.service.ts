import {
  Auth,
  User,
  TUser,
  VerificationCode,
  VerificationStatus,
} from '../drizzle/schema';
import { RESPONSE } from 'src/core/constants';
import { and, eq, gt, or } from 'drizzle-orm';
import { TDrizzle } from '../rooms/rooms.service';
import { quickOTP } from 'src/core/utils/strings';
import { DATABASE } from '../drizzle/drizzle.module';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TCreateAccountBody, TLoginBody, TVerifyEmailBody } from './dto/body';
import { PasswordService } from 'src/core/services/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly password: PasswordService,
    @Inject(DATABASE) private readonly drizzle: TDrizzle,
  ) {}

  async handleLogout() {}

  async handleCreateUser(body: TCreateAccountBody) {
    const email = body.email.toLocaleLowerCase();
    const existing = await this.CheckExistingEmailAndPhone(email, body.phone);

    if (existing?.email === body.email)
      throw new BadRequestException(RESPONSE.EMAIL_EXISTS);
    if (existing?.phone === body.phone)
      throw new BadRequestException(RESPONSE.PHONE_EXISTS);

    const { code } = await this.CreateAccount(body);
    return `${code} to be sent via mail`;
  }

  async handleVerifyEmail(body: TVerifyEmailBody) {
    const user = await this.CheckExistingEmailAndPhone(body.email);
    if (!user) throw new BadRequestException(RESPONSE.INVALID_CODE);

    const { verificationCode } = await this.FindValidVerificationCode(
      user?.id,
      body.code,
    );
    if (!verificationCode) throw new BadRequestException(RESPONSE.INVALID_CODE);

    await this.HandleSuccessfulEmailVerification(user?.id);
    console.log('Email verified, access token granted');
    return 'Acces token to be returned here;; email verification successful';
  }

  async handleLogin(body: TLoginBody) {
    const email = body.email.toLowerCase();
    const user = await this.drizzle.query.User.findFirst({
      where: eq(User.email, email),
      with: { auth: true },
    });

    // const validPassword = await this.password.verify(
    //   body.password,
    //   user?.auth.password,
    // );

    const validPassword = true;

    if (!user || !validPassword)
      throw new BadRequestException(RESPONSE.INVALID_CREDENTIALS);

    return 'Login successful';
  }

  private async CheckExistingEmailAndPhone(email: string, phone?: string) {
    const isEmail = eq(User.email, email);
    const isPhone = phone ? eq(User.phone, phone) : undefined;

    return await this.drizzle.query.User.findFirst({
      where: or(isEmail, isPhone),
    });
  }

  private async FindValidVerificationCode(userId: number, code?: string) {
    const isUser = eq(VerificationCode.userId, userId);
    const isCode = code ? eq(VerificationCode.code, code) : undefined;
    const isNotExipred = gt(VerificationCode.expiresAt, new Date());

    const verificationCode =
      await this.drizzle.query.VerificationCode.findFirst({
        where: and(isUser, isCode, isNotExipred),
      });

    if (!verificationCode) return {};

    return { verificationCode };
  }

  private async HandleSuccessfulEmailVerification(userId: number) {
    await this.drizzle
      .update(User)
      .set({ status: 'verified' })
      .where(eq(User.id, userId));
    await this.drizzle
      .update(VerificationStatus)
      .set({ email: true })
      .where(eq(VerificationStatus.userId, userId));
    await this.drizzle
      .update(VerificationCode)
      .set({ expiresAt: new Date() })
      .where(eq(VerificationCode.userId, userId));
  }

  private async CreateAccount(body: TCreateAccountBody) {
    const [user] = await this.drizzle
      .insert(User)
      .values({
        email: body.email,
        phone: body.phone,
        lastName: body.lastName,
        firstName: body.firstName,
      })
      .returning({ id: User.id });

    await this.drizzle.insert(VerificationStatus).values({ userId: user.id });
    await this.drizzle.insert(Auth).values({
      userId: user.id,
      // password: await this.password.hash(body.password),
      password: body.password,
    });

    const { code, expiresAt } = quickOTP();

    await this.drizzle
      .insert(VerificationCode)
      .values({ userId: user.id, code, expiresAt: expiresAt.date });

    return { code };
  }
}

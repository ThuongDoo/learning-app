import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy, JwtStrategy, LocalStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { JwtAuthGuard, RolesGuard } from './guard';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    FacebookStrategy,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

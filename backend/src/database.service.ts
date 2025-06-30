/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private _primaryClient: PrismaClient;
  private _replicaClient: PrismaClient;

  constructor(private readonly configService: ConfigService) {
    const primaryUrl = this.configService.get<string>('DATABASE_URL');
    const replicaUrl = this.configService.get<string>('DATABASE_REPLICA_URL');

    if (!primaryUrl || !replicaUrl) {
      throw new Error(
        '❌ DATABASE_URL or DATABASE_REPLICA_URL is not defined in environment variables',
      );
    }

    this._primaryClient = new PrismaClient({
      datasources: { db: { url: primaryUrl } },
    });

    this._replicaClient = new PrismaClient({
      datasources: { db: { url: replicaUrl } },
    });
  }

  async onModuleInit() {
    await this._primaryClient.$connect();
    await this._replicaClient.$connect();
    console.info('✅ Connected to Primary and Replica databases');
  }

  async onModuleDestroy() {
    await this._primaryClient.$disconnect();
    await this._replicaClient.$disconnect();
  }

  // Getter cho write operations (Primary)
  get primary(): PrismaClient {
    return this._primaryClient;
  }

  // Getter cho read operations (Replica)
  get replica(): PrismaClient {
    return this._replicaClient;
  }

  // Helper methods để làm rõ intent
  getWriteClient(): PrismaClient {
    console.info('🔴 Using PRIMARY database for WRITE operation');
    return this._primaryClient;
  }

  getReadClient(): PrismaClient {
    console.info('🔵 Using REPLICA database for READ operation');
    return this._replicaClient;
  }
}

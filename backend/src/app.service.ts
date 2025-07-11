import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // 🔴 Write - create user (primary DB)
  async createUser() {
    const writeClient = this.db.getWriteClient();

    const name = faker.person.fullName();
    const email = faker.internet.email();

    const newUser = await writeClient.user.create({
      data: {
        name,
        email,
      },
    });

    const [serverInfo] = await writeClient.$queryRawUnsafe<
      { server: string }[]
    >('SELECT @@hostname AS server');

    return {
      source: 'primary',
      dbHost: serverInfo?.server ?? 'unknown',
      data: newUser,
    };
  }

  // 🔵 Read - get all users (replica DB)
  async getUsers() {
    const readClient = this.db.getReadClient();

    const users = await readClient.user.findMany();

    const [serverInfo] = await readClient.$queryRawUnsafe<{ server: string }[]>(
      'SELECT @@hostname AS server',
    );

    return {
      source: 'replica',
      dbHost: serverInfo?.server ?? 'unknown',
      users,
    };
  }
}

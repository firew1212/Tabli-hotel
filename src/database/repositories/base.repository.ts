import { PrismaService } from '../prisma/prisma.service';

export class BaseRepository {
  constructor(protected prisma: PrismaService) {}
}
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from '../../database/prisma/prisma.service';

import { CreateOrderDto }
from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateOrderDto,
  ) {
    let totalAmount = 0;

    const itemsData:any[] = [];

    for (const item of dto.items) {
      const menuItem =
        await this.prisma.menu_items.findUnique({
          where: {
            id: item.menu_item_id,
          },
        });

      if (!menuItem) {
        throw new BadRequestException(
          `Menu item ${item.menu_item_id} not found`,
        );
      }

      const lineTotal =
        Number(menuItem.price) *
        item.quantity;

      totalAmount += lineTotal;

      itemsData.push({
        menu_item_id:
          item.menu_item_id,

        quantity:
          item.quantity,

        price:
          menuItem.price,
      });
    }

    return this.prisma.orders.create({
      data: {
        guest_id: dto.guest_id,
        room_id: dto.room_id,

        total_amount:
          totalAmount,

        status: 'OPEN',

        order_items: {
          create: itemsData,
        },
      },

      include: {
        order_items: true,
      },
    });
  }

  findAll() {
    return this.prisma.orders.findMany({
      include: {
        order_items: {
          include: {
            menu_items: true,
          },
        },

        guests: true,
        rooms: true,
      },
    });
  }

  async updateStatus(
    id: string,
    status: string,
  ) {
    return this.prisma.orders.update({
      where: { id },

      data: { status },
    });
  }
}
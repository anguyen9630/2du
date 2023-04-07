import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const todoItemRouter = createTRPCRouter({
    
  getAllItems: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.todoItem.findMany({where: {userId: ctx.userId}});
  }),

  createItem: privateProcedure
    .input(
      z.object({
        content:z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.todoItem.create({
        data: {
          content: input.content,
          userId: ctx.userId,
        },
      });
      
      return item;
    }),

  deleteItem: privateProcedure
  .input(
    z.object({
      itemId:z.string().min(1).max(255),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.prisma.todoItem.delete({
      where: {
        id: input.itemId,
      }
    });
    
    return result;
  }),

    
});

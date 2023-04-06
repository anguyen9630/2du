import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoItemRouter = createTRPCRouter({
    
  getAll: publicProcedure.input(z.object({userId: z.string()})).query(({ ctx, input }) => {
    return ctx.prisma.todoItem.findMany({where: {userId: input.userId}});
  }),
});

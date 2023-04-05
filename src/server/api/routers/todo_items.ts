import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoItemRouter = createTRPCRouter({
    
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todoItem.findMany();
  }),
});

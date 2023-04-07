import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findFirst({where: {id: ctx.userId}});
    if (!currentUser) {
      const newUser = await ctx.prisma.user.create({
        data: {
          id: ctx.userId,
        },
      });
      
      return newUser;
    }
    
    else {
      return currentUser;
    }
  }),

});

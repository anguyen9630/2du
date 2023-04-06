import { z } from "zod";

import { useUser } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    
  getUserData: publicProcedure.input(z.object({userId: z.string()})).query(({ ctx, input } ) => {


    return ctx.prisma.user.findUnique({
            where: {
                id: input.userId
            }
        });
  }),
});

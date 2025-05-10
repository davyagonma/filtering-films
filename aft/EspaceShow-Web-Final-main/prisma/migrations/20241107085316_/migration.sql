-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "availableRetraitDate" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "UserLike" ADD COLUMN     "isLiked" TEXT NOT NULL DEFAULT 'no';

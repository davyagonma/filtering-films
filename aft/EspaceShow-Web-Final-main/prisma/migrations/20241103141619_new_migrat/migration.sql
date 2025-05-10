-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "availableRetraitDate" SET DEFAULT NOW() + interval '1 day';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "isScan" BOOLEAN DEFAULT false;

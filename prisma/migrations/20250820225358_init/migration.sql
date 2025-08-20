-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "s3Key" TEXT NOT NULL,
    "effectId" TEXT NOT NULL,
    "names" TEXT[],
    "previewUrl" TEXT,
    "finalUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

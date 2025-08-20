export type JobStatus =
  | "queued"
  | "processing"
  | "preview_ready"
  | "paid"
  | "final_ready"
  | "failed";

export interface JobInput {
  s3Key: string;            // e.g., "uploads/123.jpg"
  effectId: string;         // e.g., "blessing"
  names?: string[];         // optional: ["Sandesh", "Family"]
}

export interface Job {
  id: string;
  status: JobStatus;
  input: JobInput;
  previewUrl?: string;
  finalUrl?: string;
  createdAt: string;        // ISO date
  updatedAt: string;        // ISO date
}


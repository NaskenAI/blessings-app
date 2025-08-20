import { Job, JobInput } from "./types";

export const jobs = new Map<string, Job>();

export function createJob(input: JobInput): Job {
  const now = new Date().toISOString();
  const job: Job = {
    id: crypto.randomUUID(),
    status: "queued",
    input,
    createdAt: now,
    updatedAt: now,
  };
  jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function updateJob(
  id: string,
  patch: Partial<Pick<Job, "status" | "previewUrl" | "finalUrl">>
): Job | undefined {
  const existing = jobs.get(id);
  if (!existing) return undefined;
  const updated: Job = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  jobs.set(id, updated);
  return updated;
}


export const APPLICATION_STATUSES = ["new", "reviewed", "shortlisted", "rejected", "hired"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

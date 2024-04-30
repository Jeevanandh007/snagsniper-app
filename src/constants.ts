import { toPairs } from "lodash";
import { SnagStatus } from "./app.context";

export const statusTextMap = {
  [SnagStatus.OPEN]: { text: "Open", chipColor: "primary" },
  [SnagStatus.WORK_IN_PROGRESS]: {
    text: "Work In Progress",
    chipColor: "warning",
  },
  [SnagStatus.COMPLETED]: { text: "Completed", chipColor: "success" },
  [SnagStatus.CANCELLED]: { text: "Cancelled", chipColor: "danger" },
  [SnagStatus.CLOSED]: { text: "Closed", chipColor: "dark" },
};

export const statusOptions = toPairs(statusTextMap).map((option) => ({
  status: option[0],
  label: option[1].text,
}));

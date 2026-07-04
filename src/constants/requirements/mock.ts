import { LABELS } from "@/constants/labels";

import type {
  Epic,
  FunctionalRequirement,
  NonFunctionalRequirement,
  RequirementDocument,
} from "@/types/requirements";

const L = LABELS.REQUIREMENTS;

export const REQUIREMENT_DOCUMENTS: RequirementDocument[] = [
  {
    id: "doc-1",
    tileLabel: L.DOCS_DATA.TILE_PDF,
    tileTone: "red",
    fileName: L.DOCS_DATA.DOC1_NAME,
    fileSize: L.DOCS_DATA.DOC1_SIZE,
    type: L.DOCS_DATA.DOC1_TYPE,
    uploadedAt: L.DOCS_DATA.DOC1_UPLOADED,
    status: "processed",
    statusTone: "low",
    statusLabel: L.STATUS.PROCESSED,
    actionLabel: L.DOCS_DATA.VIEW_RESULTS,
    actionDisabled: false,
  },
  {
    id: "doc-2",
    tileLabel: L.DOCS_DATA.TILE_DOC,
    tileTone: "blue",
    fileName: L.DOCS_DATA.DOC2_NAME,
    fileSize: L.DOCS_DATA.DOC2_SIZE,
    type: L.DOCS_DATA.DOC2_TYPE,
    uploadedAt: L.DOCS_DATA.DOC2_UPLOADED,
    status: "processed",
    statusTone: "low",
    statusLabel: L.STATUS.PROCESSED,
    actionLabel: L.DOCS_DATA.VIEW_RESULTS,
    actionDisabled: false,
  },
  {
    id: "doc-3",
    tileLabel: L.DOCS_DATA.TILE_TXT,
    tileTone: "slate",
    fileName: L.DOCS_DATA.DOC3_NAME,
    fileSize: L.DOCS_DATA.DOC3_SIZE,
    type: L.DOCS_DATA.DOC3_TYPE,
    uploadedAt: L.DOCS_DATA.DOC3_UPLOADED,
    status: "processing",
    statusTone: "medium",
    statusLabel: L.STATUS.PROCESSING,
    actionLabel: L.DOCS_DATA.PENDING,
    actionDisabled: true,
  },
];

export const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: "fr-1",
    code: "FR-01",
    title: L.FR_DATA.FR1_TITLE,
    subtitle: L.FR_DATA.FR1_SUBTITLE,
    priorityTone: "high",
    priorityLabel: L.STATUS.HIGH,
  },
  {
    id: "fr-2",
    code: "FR-02",
    title: L.FR_DATA.FR2_TITLE,
    subtitle: L.FR_DATA.FR2_SUBTITLE,
    priorityTone: "high",
    priorityLabel: L.STATUS.HIGH,
  },
  {
    id: "fr-3",
    code: "FR-03",
    title: L.FR_DATA.FR3_TITLE,
    subtitle: L.FR_DATA.FR3_SUBTITLE,
    priorityTone: "high",
    priorityLabel: L.STATUS.HIGH,
  },
];

export const NON_FUNCTIONAL_REQUIREMENTS: NonFunctionalRequirement[] = [
  {
    id: "nfr-1",
    code: "NFR-01",
    title: L.NFR_DATA.NFR1_TITLE,
    priorityTone: "critical",
    priorityLabel: L.STATUS.CRITICAL,
  },
  {
    id: "nfr-2",
    code: "NFR-02",
    title: L.NFR_DATA.NFR2_TITLE,
    priorityTone: "critical",
    priorityLabel: L.STATUS.CRITICAL,
  },
];

export const EPICS: Epic[] = [
  {
    id: "epic-1",
    title: L.EPIC_DATA.EPIC1_TITLE,
    tone: "indigo",
    summary: L.EPIC_DATA.EPIC1_SUMMARY,
    stories: [
      {
        id: "us-1",
        code: "US-001",
        priorityTone: "high",
        priorityLabel: L.STATUS.HIGH,
        points: L.EPIC_DATA.US1_POINTS,
        title: L.EPIC_DATA.US1_TITLE,
        gherkin: {
          given: { keyword: L.USER_STORIES.GIVEN, text: L.EPIC_DATA.US1_GIVEN },
          when: { keyword: L.USER_STORIES.WHEN, text: L.EPIC_DATA.US1_WHEN },
          then: { keyword: L.USER_STORIES.THEN, text: L.EPIC_DATA.US1_THEN },
        },
      },
      {
        id: "us-2",
        code: "US-002",
        priorityTone: "medium",
        priorityLabel: L.STATUS.MEDIUM,
        points: L.EPIC_DATA.US2_POINTS,
        title: L.EPIC_DATA.US2_TITLE,
        gherkin: {
          given: { keyword: L.USER_STORIES.GIVEN, text: L.EPIC_DATA.US2_GIVEN },
          when: { keyword: L.USER_STORIES.WHEN, text: L.EPIC_DATA.US2_WHEN },
          then: { keyword: L.USER_STORIES.THEN, text: L.EPIC_DATA.US2_THEN },
        },
      },
    ],
  },
  {
    id: "epic-2",
    title: L.EPIC_DATA.EPIC2_TITLE,
    tone: "orange",
    summary: L.EPIC_DATA.EPIC2_SUMMARY,
    stories: [],
    statusTone: "high",
    statusLabel: L.STATUS.AT_RISK,
    note: L.EPIC_DATA.EPIC2_NOTE,
  },
];

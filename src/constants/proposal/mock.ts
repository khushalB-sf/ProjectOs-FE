import type { CostRow, TechStackGroup } from "@/types/proposal";

/** ASCII architecture diagram rendered inside the dark code block. */
export const ARCHITECTURE_DIAGRAM = `┌─────────────────────────────────────────────────────┐
│                   Client Layer                       │
│   Web Dashboard (React)    Driver App (React Native) │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / WebSocket
┌────────────────────▼────────────────────────────────┐
│              API Gateway (AWS ALB)                   │
│   Rate Limiting │ JWT Auth │ Request Routing         │
└──────┬──────────────────────────────────────────────┘
       │
┌──────▼──────┐  ┌──────────────┐  ┌─────────────────┐
│  Fleet API  │  │  Route AI    │  │  Notification   │
│  (FastAPI)  │  │  Service     │  │  Service        │
│  WebSocket  │  │  (HERE Maps) │  │  (FCM/SNS)      │
└──────┬──────┘  └──────┬───────┘  └────────────────┘
       │                │
┌──────▼────────────────▼─────────────────────────────┐
│              PostgreSQL (RDS)  │  Redis (ElastiCache) │
│           TimescaleDB for GPS  │  Real-time pub/sub   │
└─────────────────────────────────────────────────────┘`;

/** Recommended technology stack, grouped by layer. */
export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React 18 + TypeScript",
      "React Native (mobile)",
      "Mapbox GL JS",
      "Recharts",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      "Python 3.12 + FastAPI",
      "PostgreSQL + TimescaleDB",
      "Redis (pub/sub)",
      "HERE Maps API",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    items: [
      "AWS ECS + Fargate",
      "RDS PostgreSQL",
      "ElastiCache Redis",
      "CloudFront CDN",
    ],
  },
];

/** Effort & cost estimate breakdown by role. */
export const COST_ROWS: CostRow[] = [
  {
    id: "tech-lead",
    role: "Tech Lead",
    people: 1,
    days: 120,
    ratePerDay: "$650",
    total: "$78,000",
  },
  {
    id: "backend",
    role: "Backend Engineers",
    people: 3,
    days: 120,
    ratePerDay: "$500",
    total: "$180,000",
  },
  {
    id: "frontend",
    role: "Frontend Engineers",
    people: 2,
    days: 120,
    ratePerDay: "$450",
    total: "$108,000",
  },
  {
    id: "mobile",
    role: "Mobile Developer",
    people: 1,
    days: 90,
    ratePerDay: "$500",
    total: "$45,000",
  },
  {
    id: "qa",
    role: "QA Engineer",
    people: 1,
    days: 80,
    ratePerDay: "$350",
    total: "$28,000",
  },
  {
    id: "devops",
    role: "DevOps / Infra",
    people: 1,
    days: 60,
    ratePerDay: "$600",
    total: "$36,000",
  },
];

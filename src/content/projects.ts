export type CaseStudy = {
  slug: string;
  repository: string;
  revision: string;
  title: string;
  category: string;
  summary: string;
  status: string;
  demo?: string;
  focus: string;
  stack: string[];
  problem: string;
  audience: string;
  contribution: string;
  flow: { label: string; detail: string }[];
  decisions: { title: string; reasoning: string; tradeoff: string }[];
  outcome: string;
  evidence: { value: string; label: string; context: string }[];
  limitations: string[];
  next: string;
  sources: { label: string; path: string }[];
  note: string;
};

export const projects: CaseStudy[] = [
  {
    slug: "document-qa",
    repository: "document-rag-system",
    revision: "34faafd1c004aed05e63334d73f576007a4c0189",
    title: "Document Q&A",
    category: "APPLIED AI · DOCUMENT RETRIEVAL",
    summary:
      "Bilingual document questions, grounded answers, and citations you can inspect.",
    status: "Local demo · human evaluation pending",
    focus: "AI systems & product experience",
    stack: ["Next.js", "FastAPI", "PostgreSQL / pgvector", "Celery", "Ollama"],
    problem:
      "A fluent document answer is difficult to trust when the reader cannot inspect its evidence. Persian and English documents add retrieval and language-quality questions that a working chat interface alone cannot resolve.",
    audience:
      "People asking questions across personal document collections in Persian or English.",
    contribution:
      "I built the bilingual Next.js interface and an asynchronous FastAPI/Celery ingestion pipeline, with versioned indexing, owner-scoped hybrid retrieval, streamed responses, and backend-validated citations. The evaluation uses versioned bilingual questions.",
    flow: [
      { label: "Documents", detail: "Extract · chunk · index" },
      { label: "Retrieval", detail: "Dense + lexical · rank fusion" },
      { label: "Answer", detail: "Stream · validate citations" },
    ],
    decisions: [
      {
        title: "Combine lexical and semantic retrieval",
        reasoning:
          "The retriever fuses both ranked lists before packing a bounded evidence context. Exact identifiers and semantic matches can both contribute to an answer.",
        tradeoff:
          "Two retrieval paths need separate diagnostics. Fusion and context budgets remain configuration choices to evaluate on representative questions.",
      },
      {
        title: "Persist ingestion state outside the queue",
        reasoning:
          "Celery moves extraction and indexing outside the request. PostgreSQL owns job state; document-version IDs and idempotent claims tolerate duplicate delivery and worker restarts.",
        tradeoff:
          "Redis, workers, and dispatch recovery add operational work. At-least-once delivery still requires correctness in the database claim.",
      },
      {
        title: "Separate passing tests from model acceptance",
        reasoning:
          "Deterministic providers exercise CI contracts. Real generators are compared on the same dataset, with a separate human-review gate for a beta decision.",
        tradeoff:
          "Release readiness takes longer. Automated grounding proxies cannot replace a reviewer reading the answer and its evidence.",
      },
    ],
    outcome:
      "The repository contains an end-to-end document Q&A slice and a repeatable comparison of two local generators. Qwen 3 is the stronger automated candidate in that report; neither candidate is accepted as the beta default yet.",
    evidence: [
      {
        value: "80",
        label: "Controlled evaluation questions",
        context:
          "Persian, English, cross-lingual, ambiguous, and adversarial cases.",
      },
      {
        value: "0.892",
        label: "Reported Recall@8",
        context:
          "Rounded from 0.891892; both generators receive the same retrieved evidence.",
      },
      {
        value: "2.354 s",
        label: "Reported median answer latency",
        context:
          "Qwen 3 1.7B on an 8 GiB Apple M2; measured September 26, 2026.",
      },
    ],
    limitations: [
      "These are repository-reported local measurements, not independently reproduced production results.",
      "Independent human review of groundedness, citation support, relevance, language quality, and abstention is pending.",
      "The documented development configuration is a local demonstration, not a publicly deployed service.",
    ],
    next: "Complete independent human review, agree on quality and latency thresholds, and document the operating envelope before promoting a beta model.",
    sources: [
      { label: "Product scope & local setup", path: "README.md" },
      {
        label: "Generator comparison & methodology",
        path: "docs/evaluation/sprint-2.md",
      },
      {
        label: "Hybrid retrieval implementation",
        path: "backend/src/app/modules/retrieval/application/retrieval.py",
      },
      {
        label: "Idempotent ingestion decision",
        path: "docs/architecture/decisions/0005-celery-redis-jobs.md",
      },
      {
        label: "Model acceptance gate",
        path: "docs/architecture/decisions/0011-sprint-2-generator-evaluation-gate.md",
      },
    ],
    note: "retrieval-before-generation",
  },
  {
    slug: "fastfactor",
    repository: "fastfactor-for-sellers",
    revision: "bde260209e2479199a9bc8cb4a6e7beeafa54b3a",
    title: "FastFactor",
    demo: "https://fastfactor.vercel.app",
    category: "PRODUCT ENGINEERING · SMALL BUSINESS",
    summary:
      "A focused order workflow for sellers who run their business through messages.",
    status: "Working prototype · adoption not measured",
    focus: "Product scope & end-to-end delivery",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "TanStack Query"],
    problem:
      "Orders scattered across messages leave sellers piecing together addresses, product details, and payment proofs. A full e-commerce setup adds complexity before that basic workflow is solved.",
    audience:
      "Small sellers and home businesses using social media or direct messaging to collect orders.",
    contribution:
      "I designed and built the React/TypeScript frontend and Express/TypeScript backend, including the public order flow, seller management, layered services, PostgreSQL migrations, validation, and authentication with refresh-token rotation.",
    flow: [
      { label: "Store link", detail: "One public entry point" },
      { label: "Order form", detail: "Details · delivery · proof" },
      { label: "Seller inbox", detail: "Review · track · update" },
    ],
    decisions: [
      {
        title: "Solve order collection before expanding the platform",
        reasoning:
          "A shareable store link and structured form address the core handoff between customer and seller. The product can be understood without a catalog, checkout engine, or marketplace.",
        tradeoff:
          "The narrow workflow does not cover a full shopping cart, inventory management, or verified online payment.",
      },
      {
        title: "Separate remote data from interface state",
        reasoning:
          "TanStack Query manages remote order data while React handles local interaction state. The API separates validation, services, and SQL repositories.",
        tradeoff:
          "Cache invalidation and failure handling still need deliberate design; a query library does not supply the business rules.",
      },
      {
        title: "Scope order reads to the seller",
        reasoning:
          "The repository joins orders to stores and applies the owner's ID. The service checks ownership before returning an order or changing its status.",
        tradeoff:
          "This is an inspectable code boundary, not a completed security audit. Integration tests need to exercise isolation and mutation paths.",
      },
    ],
    outcome:
      "The prototype turns an informal message-based process into a defined customer-to-seller workflow. Its intended value is reduced coordination; adoption, time saved, and business impact have not been measured.",
    evidence: [
      {
        value: "1",
        label: "Shareable order entry point",
        context: "A store link leads customers into the structured order form.",
      },
      {
        value: "Full stack",
        label: "Inspectable implementation",
        context:
          "React interface, Express services, explicit SQL, and migrations.",
      },
    ],
    limitations: [
      "The README lists automated service and integration testing as planned work.",
      "A payment receipt is supporting information, not confirmation that money was received.",
      "No active-user, revenue, conversion-gain, or time-saving metric is claimed here.",
    ],
    next: "Observe sellers completing the flow, record where they get stuck, and add order and ownership integration tests before expanding scope.",
    sources: [
      { label: "Problem, audience & product scope", path: "README.md" },
      {
        label: "Order service & ownership checks",
        path: "backend/src/modules/orders/order.service.ts",
      },
      {
        label: "Seller-scoped SQL queries",
        path: "backend/src/modules/orders/order.repository.ts",
      },
    ],
    note: "scope-before-features",
  },
  {
    slug: "salon-booking",
    repository: "hair-salon",
    revision: "83f874dd6c338470241ff3b6925f5ca2b16b8c8e",
    title: "Salon Booking",
    category: "SOFTWARE ENGINEERING · TRANSACTIONAL SYSTEMS",
    summary:
      "A Persian salon platform where availability and confirmed bookings share a consistent ledger.",
    status: "Controlled local testing",
    focus: "Domain modeling & booking correctness",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Drizzle", "pnpm workspace"],
    problem:
      "An available slot is only useful if two customers cannot both confirm it. Online and manually entered appointments must respect the same schedule, staff allocation, and booking history.",
    audience:
      "Salon customers booking appointments and owners managing services, staff, schedules, and a daily agenda in Iran.",
    contribution:
      "This personal project connects Persian RTL customer and management interfaces with a modular NestJS API and PostgreSQL persistence. The linked booking implementation documents the domain model, transaction boundaries, and database invariants.",
    flow: [
      { label: "Availability", detail: "Schedule + occupied time" },
      { label: "Transaction", detail: "Lock · validate · allocate" },
      { label: "Appointment", detail: "Receipt + owner agenda" },
    ],
    decisions: [
      {
        title: "Enforce conflicting allocations in the database",
        reasoning:
          "A PostgreSQL GiST exclusion constraint rejects overlapping active staff allocations. Appointment, allocation, event, and idempotency reference commit together.",
        tradeoff:
          "Constraints and migrations are more involved, but the invariant survives requests arriving at the same time.",
      },
      {
        title: "Preserve the original booking terms",
        reasoning:
          "Booking snapshots retain the agreed price, duration, buffers, and timezone. Later catalog changes do not silently rewrite an existing appointment.",
        tradeoff:
          "Historical data needs explicit lifecycle and change rules instead of being a live join to the current catalog.",
      },
      {
        title: "Serialize per-salon writes before optimizing locks",
        reasoning:
          "Booking and configuration writes acquire the business row in a common order. The documented approach favors a clear correctness boundary in a modular monolith.",
        tradeoff:
          "Writes within one salon can contend. Narrower locking should follow measurement rather than assumed scaling needs.",
      },
    ],
    outcome:
      "The documented local slice connects customer booking, receipts, and the owner's agenda while protecting allocation consistency. The repository includes domain and integration tests and a report of local flow checks.",
    evidence: [
      {
        value: "Atomic",
        label: "Booking ledger updates",
        context:
          "Appointment, allocation, event, and idempotency reference share one commit.",
      },
      {
        value: "DB-backed",
        label: "Overlap protection",
        context: "A GiST exclusion constraint covers active staff time ranges.",
      },
    ],
    limitations: [
      "The project is described as suitable for controlled testing; no production traffic or adoption metric is claimed.",
      "The README reports that a full containerized Compose run still needs verification after a local Docker storage failure.",
      "Payments, SMS, recovery, and customer change capabilities must be checked against the current release scope, which may evolve after this snapshot.",
    ],
    next: "Complete release checks, verify the full container environment, and measure concurrent booking behavior before broader deployment.",
    sources: [
      { label: "Current scope & setup limitations", path: "README.md" },
      {
        label: "Booking ledger architecture decision",
        path: "docs/architecture/adr/ADR-012-booking-ledger.md",
      },
      {
        label: "Database invariants & constraints",
        path: "backend/drizzle/0005_booking-ledger.sql",
      },
      {
        label: "Local flow checks & release boundaries",
        path: "docs/planning/sprints/sprint-07-report.md",
      },
    ],
    note: "booking-correctness",
  },
];

export function sourceUrl(project: CaseStudy, path: string) {
  return `https://github.com/Aliabnrm/${project.repository}/blob/${project.revision}/${path}`;
}

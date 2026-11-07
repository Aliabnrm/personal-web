import type { Note } from "./types";
import { projects, sourceUrl } from "./projects";

const rag = projects[0];
const fastfactor = projects[1];
const salon = projects[2];

export const notes: Note[] = [
  {
    slug: "retrieval-before-generation",
    title: "A valid citation is not evidence of a correct answer",
    description:
      "What the Document Q&A evaluation separates: retrieval, citation structure, and actual support.",
    status: "Complete",
    kind: "Engineering note",
    projectSlug: rag.slug,
    topic: "AI evaluation",
    updated: "2026-11-07",
    sections: [
      {
        id: "the-gap",
        title: "Three checks, three different questions",
        paragraphs: [
          "Did the right document enter the context? Does the answer reference a valid citation ID? Does the quoted evidence actually support the claim? These are separate questions, even when the interface presents one confident answer.",
          "The Document Q&A repository makes this distinction concrete. Its reported Qwen 2.5 and Qwen 3 runs share a Recall@8 of 0.891892 and a citation-ID validity of 1.0. Their automated citation-support proxies differ: 0.1875 and 0.7500. A structurally valid reference alone does not demonstrate support.",
        ],
      },
      {
        id: "read-the-method",
        title: "Read the measurement before the headline",
        paragraphs: [
          "The comparison covers 80 controlled questions on an 8 GiB Apple M2. The support and groundedness values use expected-term and citation-structure proxies. They are regression signals, not independent human judgments or evidence of performance on arbitrary documents.",
          "The report keeps both candidates out of the beta default until human review and acceptance thresholds are complete. Passing orchestration tests and selecting a promising model are different release decisions.",
        ],
      },
      {
        id: "apply-it",
        title: "A checklist for the next evaluation",
        paragraphs: [
          "Keep a small record that lets another person inspect the claim.",
        ],
        bullets: [
          "Version the question, expected evidence, model digest, and retrieval configuration.",
          "Inspect retrieval independently from the generated answer.",
          "Include unsupported questions and check whether the system abstains.",
          "Record hardware, latency, failures, and human-review status next to quality numbers.",
        ],
        code: "question → retrieve → inspect evidence → generate → validate → review",
      },
    ],
    sources: [
      {
        label: "Document Q&A: generator evaluation",
        url: sourceUrl(rag, "docs/evaluation/sprint-2.md"),
      },
      {
        label: "Measured generator acceptance gate",
        url: sourceUrl(
          rag,
          "docs/architecture/decisions/0011-sprint-2-generator-evaluation-gate.md",
        ),
      },
    ],
  },
  {
    slug: "scope-before-features",
    title: "An order link before an e-commerce platform",
    description:
      "FastFactor's product boundary: collect a complete order without rebuilding the seller's business.",
    status: "Complete",
    kind: "Decision note",
    projectSlug: fastfactor.slug,
    topic: "Product engineering",
    updated: "2026-11-07",
    sections: [
      {
        id: "the-job",
        title: "Start at the handoff",
        paragraphs: [
          "FastFactor targets sellers who already talk to customers through social media or messaging. Its problem statement focuses on fragmented order details, addresses, and payment proofs. The first useful job is to make that handoff structured.",
          "A store link leads to an order form; the seller reviews incoming orders in one place. This creates a product boundary that can be explained without a marketplace, inventory engine, or recommendation system.",
        ],
      },
      {
        id: "the-cost",
        title: "A narrow scope still has hard requirements",
        paragraphs: [
          "The implementation still needs validation, authentication, persistence, and ownership checks. The order repository filters reads through the store owner's ID, and the service checks ownership before updates.",
          "Uploaded payment proof is not verified payment. Keeping that distinction visible is part of defining the product contract.",
        ],
      },
      {
        id: "next-evidence",
        title: "Validate the workflow before expanding it",
        paragraphs: [
          "The next useful evidence would be sellers attempting the complete flow: setup, sharing a link, reviewing an order, and changing its status. Record confusion, missing information, and completion failures before adding more features.",
          "No measured adoption or time-saving result is available here. Reduced coordination is the intended benefit to test.",
        ],
      },
    ],
    sources: [
      {
        label: "FastFactor: problem and tradeoffs",
        url: sourceUrl(fastfactor, "README.md"),
      },
      {
        label: "Seller-scoped order repository",
        url: sourceUrl(
          fastfactor,
          "backend/src/modules/orders/order.repository.ts",
        ),
      },
    ],
  },
  {
    slug: "booking-correctness",
    title: "An available slot is not a confirmed appointment",
    description:
      "Why Salon Booking protects allocations at the database boundary, beyond a disabled button.",
    status: "Complete",
    kind: "Architecture note",
    projectSlug: salon.slug,
    topic: "System design",
    updated: "2026-11-07",
    sections: [
      {
        id: "the-race",
        title: "The race starts after the screen loads",
        paragraphs: [
          "Two customers can see the same free time before either confirms it. Disabling a submit button prevents an accidental second click in one browser; it cannot coordinate two independent requests.",
          "Salon Booking's ledger decision places that boundary in PostgreSQL. A GiST exclusion constraint rejects overlapping active allocations for the same salon and staff member.",
        ],
      },
      {
        id: "one-commit",
        title: "Commit the booking as one unit",
        paragraphs: [
          "The appointment, occupied interval, booking event, and idempotency reference are committed together. Deferred constraints check ledger consistency, and a snapshot preserves the agreed price, duration, buffers, and timezone.",
          "This is a concrete reason to use a transaction: a receipt must not outlive a missing allocation, and later catalog edits must not silently change the terms of an existing booking.",
        ],
      },
      {
        id: "the-tradeoff",
        title: "Correctness has an operating cost",
        paragraphs: [
          "The architecture serializes writes at the business row. That gives booking and schedule changes a common lock order, at the cost of contention within a busy salon.",
          "The next step is measurement of concurrent behavior and release checks. The local implementation is not evidence of a production throughput guarantee.",
        ],
      },
    ],
    sources: [
      {
        label: "Booking ledger decision",
        url: sourceUrl(
          salon,
          "docs/architecture/adr/ADR-012-booking-ledger.md",
        ),
      },
      {
        label: "PostgreSQL ledger constraints",
        url: sourceUrl(salon, "backend/drizzle/0005_booking-ledger.sql"),
      },
    ],
  },
];

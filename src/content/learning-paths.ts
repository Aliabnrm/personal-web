import type { LearningPath } from "./types";

export const paths: LearningPath[] = [
  {
    slug: "ai-fundamentals",
    number: "01",
    title: "AI fundamentals",
    level: "Beginner",
    description:
      "Build a clear foundation in how models learn, reason, and sometimes fail.",
    duration: "6 chapters · A starting point",
    modules: [
      {
        title: "Understand the landscape",
        description:
          "Distinguish machine learning, deep learning, and generative AI.",
        resource: "https://developers.google.com/machine-learning/crash-course",
      },
      {
        title: "Learn how models learn",
        description: "Explore training data, objectives, and generalization.",
        resource: "https://www.3blue1brown.com/topics/neural-networks",
      },
      {
        title: "Work with language models",
        description: "Understand tokens, context windows, and model behavior.",
        resource: "https://huggingface.co/learn/llm-course/chapter1/1",
      },
      {
        title: "Evaluate your assumptions",
        description:
          "Measure results with a small, representative evaluation set.",
        resource: "https://huggingface.co/docs/evaluate/index",
      },
      {
        title: "Build a small application",
        description: "Connect a model to a useful, focused interface.",
        resource: "https://sdk.vercel.ai/docs/introduction",
      },
      {
        title: "Reflect and connect",
        description: "Record what worked, what failed, and what to try next.",
        resource: "https://developers.google.com/machine-learning/crash-course",
      },
    ],
  },
  {
    slug: "llm-engineering",
    number: "02",
    title: "LLM engineering",
    level: "Intermediate",
    description:
      "Turn language models into reliable systems, one experiment at a time.",
    duration: "5 chapters · Build with intent",
    modules: [
      {
        title: "Foundations and first runs",
        description: "Models, tokens, and reproducible experiments.",
        resource: "https://huggingface.co/learn/llm-course/chapter1/1",
      },
      {
        title: "Retrieval and context",
        description:
          "Build a retrieval system that brings useful evidence into the prompt.",
        resource: "https://nlp.stanford.edu/IR-book/",
      },
      {
        title: "Evaluation and improvement",
        description:
          "Separate retrieval quality from answer quality. Keep a regression set.",
        resource: "https://docs.ragas.io/",
      },
      {
        title: "Memory and state",
        description:
          "Decide which state to persist and make that choice visible to the user.",
        resource: "https://langchain-ai.github.io/langgraph/",
      },
      {
        title: "Deployment and operation",
        description:
          "Measure latency, cost, and errors before increasing complexity.",
        resource: "https://sdk.vercel.ai/docs/introduction",
      },
    ],
  },
  {
    slug: "building-agents",
    number: "03",
    title: "Building agents",
    level: "Advanced",
    description:
      "Design small, useful agents with explicit tools, boundaries, and feedback.",
    duration: "5 chapters · Learn by building",
    modules: [
      {
        title: "Start with a workflow",
        description:
          "Identify when a deterministic workflow solves the problem.",
        resource:
          "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        title: "Tools and contracts",
        description: "Give tools clear inputs, outputs, and failure behavior.",
        resource: "https://modelcontextprotocol.io/docs/getting-started/intro",
      },
      {
        title: "Control the loop",
        description:
          "Add budgets, stopping conditions, and human review where needed.",
        resource:
          "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        title: "Evaluate complete tasks",
        description: "Measure end results and inspect intermediate traces.",
        resource: "https://docs.ragas.io/",
      },
      {
        title: "Ship a useful agent",
        description:
          "Build one bounded task end to end and document the tradeoffs.",
        resource: "https://sdk.vercel.ai/docs/introduction",
      },
    ],
  },
];

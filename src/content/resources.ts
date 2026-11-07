import type { Resource } from "./types";

export const resources: Resource[] = [
  {
    slug: "introduction-to-information-retrieval",
    title: "Introduction to Information Retrieval",
    author: "Christopher D. Manning, Prabhakar Raghavan & Hinrich Schütze",
    kind: "Book",
    topic: "Retrieval",
    description:
      "A rigorous foundation for understanding search, ranking, and the retrieval part of RAG.",
    url: "https://nlp.stanford.edu/IR-book/",
    sections: [
      {
        id: "why",
        title: "Why this resource",
        paragraphs: [
          "When we talk about retrieval-augmented generation, it is easy to jump straight into embeddings. This book gives that conversation a stronger foundation: what a query means, how an index works, and how to measure whether a ranking is useful.",
          "The online edition is freely available from Stanford. Start with the chapters on inverted indexes, scoring, and evaluation; return to the mathematical details as your questions become more specific.",
        ],
      },
      {
        id: "takeaways",
        title: "Ideas worth keeping",
        paragraphs: [
          "Retrieval is its own system with its own failure modes. A fluent answer cannot repair a missing source.",
        ],
        bullets: [
          "Establish a lexical baseline before adding semantic retrieval.",
          "Evaluate ranked results with representative queries.",
          "Inspect the documents the system retrieves, not only the answer it generates.",
        ],
      },
      {
        id: "practice",
        title: "Put it into practice",
        paragraphs: [
          "Choose ten questions from a real collection. Write down the documents you expect each question to retrieve. Compare a simple lexical search against an embedding search, then inspect where each one fails.",
        ],
      },
    ],
  },
  {
    slug: "neural-networks-zero-to-hero",
    title: "Neural Networks: Zero to Hero",
    author: "Andrej Karpathy",
    kind: "Course",
    topic: "Fundamentals",
    description:
      "Build neural networks from first principles and make the abstractions feel concrete.",
    url: "https://karpathy.ai/zero-to-hero.html",
    sections: [
      {
        id: "why",
        title: "Why this resource",
        paragraphs: [
          "This course connects the mathematics of neural networks with small implementations you can inspect. It is especially useful if you have used models through an API but want to understand what happens underneath.",
        ],
      },
      {
        id: "practice",
        title: "How to work through it",
        paragraphs: [
          "Rebuild each example without looking at the finished code. Change one parameter and predict the result before running the experiment.",
        ],
        bullets: [
          "Begin with micrograd.",
          "Keep notes on gradients and optimization.",
          "Finish a small exercise before moving to the next lecture.",
        ],
      },
    ],
  },
  {
    slug: "hugging-face-llm-course",
    title: "Hugging Face LLM Course",
    author: "Hugging Face",
    kind: "Course",
    topic: "LLM engineering",
    description:
      "A practical introduction to transformers, datasets, tokenizers, and the open model ecosystem.",
    url: "https://huggingface.co/learn/llm-course/chapter1/1",
    sections: [
      {
        id: "why",
        title: "Why this resource",
        paragraphs: [
          "The course provides a hands-on route from transformer concepts to working applications. The examples make tokenization, model loading, and dataset preparation easier to reason about.",
        ],
      },
      {
        id: "practice",
        title: "A useful first experiment",
        paragraphs: [
          "Run the same short input through two tokenizers. Compare the resulting token counts and inspect how punctuation, whitespace, and non-English text are represented.",
        ],
      },
    ],
  },
  {
    slug: "building-effective-agents",
    title: "Building effective agents",
    author: "Anthropic",
    kind: "Article",
    topic: "Agents",
    description:
      "A clear vocabulary for workflows, agents, tool use, and the cost of additional autonomy.",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    sections: [
      {
        id: "why",
        title: "Why this resource",
        paragraphs: [
          "A useful starting point for deciding how much autonomy an application actually needs. The article explains common patterns and the tradeoffs between predictable workflows and model-directed behavior.",
        ],
      },
      {
        id: "takeaways",
        title: "What to take away",
        paragraphs: [
          "Start with the simplest system that solves the task, then add complexity only when evaluation shows a clear benefit.",
        ],
        bullets: [
          "Make tools easy for a model to use correctly.",
          "Use explicit success criteria and stopping conditions.",
          "Inspect failures at the task level.",
        ],
      },
    ],
  },
];

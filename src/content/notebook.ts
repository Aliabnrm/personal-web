export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  code?: string;
};
export type Note = {
  slug: string;
  title: string;
  description: string;
  status: "Complete" | "In progress" | "Idea";
  topic: string;
  updated: string;
  sections: ArticleSection[];
};
export type Resource = {
  slug: string;
  title: string;
  author: string;
  kind: "Book" | "Course" | "Article" | "Documentation";
  topic: string;
  description: string;
  url: string;
  sections: ArticleSection[];
};
export type LearningPath = {
  slug: string;
  title: string;
  number: string;
  level: string;
  description: string;
  duration: string;
  modules: { title: string; description: string; resource: string }[];
};

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

export const notes: Note[] = [
  {
    slug: "retrieval-before-generation",
    title: "RAG evaluation before generation",
    description: "First check whether the right evidence is in the room.",
    status: "Complete",
    topic: "Retrieval",
    updated: "2026-11-05",
    sections: [
      {
        id: "question",
        title: "Start with the missing evidence",
        paragraphs: [
          "A retrieval-augmented system can produce a convincing answer even when its context is wrong. Evaluating only the final answer makes it hard to see whether the failure came from retrieval, ranking, or generation.",
          "Keep those stages separate. Before changing a prompt, check whether the relevant source appears in the retrieved context.",
        ],
      },
      {
        id: "baseline",
        title: "A small, useful baseline",
        paragraphs: [
          "Create a short evaluation set from real questions. Each question should include a relevant source and a note explaining what evidence a correct answer needs.",
        ],
        bullets: [
          "Measure recall at a fixed number of results.",
          "Inspect irrelevant matches and missing evidence.",
          "Include questions the collection cannot answer.",
          "Repeat the same evaluation after each indexing change.",
        ],
      },
      {
        id: "experiment",
        title: "Keep the experiment readable",
        paragraphs: [
          "Change one thing at a time: chunk size, overlap, embedding model, or ranking strategy. Record the result and keep the previous configuration so you can compare.",
        ],
        code: "question → retrieve → inspect evidence → generate → evaluate\n                     ↑\n              measure this first",
      },
    ],
  },
  {
    slug: "small-evaluation-sets",
    title: "Small evaluation sets, large improvements",
    description:
      "A dozen careful examples can make the next experiment much clearer.",
    status: "In progress",
    topic: "Evaluation",
    updated: "2026-11-04",
    sections: [
      {
        id: "examples",
        title: "Choose examples with a purpose",
        paragraphs: [
          "A small evaluation set is useful when its examples represent actual decisions. Include ordinary cases, ambiguous requests, and a few known failures.",
          "Write the expected behavior in plain language before deciding which metric to use. A metric should help you make a decision, not replace the decision.",
        ],
      },
      {
        id: "iteration",
        title: "Make iteration visible",
        paragraphs: [
          "Keep a dated experiment log. Record the change, the affected examples, and the reason you kept or rejected it. Add a regression example whenever a failure teaches you something new.",
        ],
      },
    ],
  },
  {
    slug: "context-is-a-design-decision",
    title: "Context is a design decision",
    description:
      "The information you leave out matters as much as the information you include.",
    status: "Complete",
    topic: "LLM engineering",
    updated: "2026-11-03",
    sections: [
      {
        id: "budget",
        title: "Treat context as a budget",
        paragraphs: [
          "A large context window does not make every piece of information equally useful. Extra material can hide the relevant instruction, increase latency, and make the result harder to inspect.",
          "Start with the task, identify the evidence it needs, and make the source of that evidence explicit.",
        ],
      },
      {
        id: "structure",
        title: "Give the model a clear structure",
        paragraphs: [
          "Separate instructions, source material, and the requested output format. Keep citations attached to the source text so an answer can be checked against the evidence.",
        ],
      },
    ],
  },
  {
    slug: "when-does-a-workflow-need-an-agent",
    title: "When does a workflow need an agent?",
    description:
      "A question about control, uncertainty, and useful boundaries.",
    status: "Idea",
    topic: "Agents",
    updated: "2026-11-02",
    sections: [
      {
        id: "decision",
        title: "Begin with the decision",
        paragraphs: [
          "If you can describe the steps in advance, a workflow may be enough. An agent becomes useful when the next action genuinely depends on information discovered during the task.",
          "The practical question is whether that flexibility improves the outcome enough to justify additional cost, latency, and uncertainty.",
        ],
      },
      {
        id: "boundaries",
        title: "Define the boundaries first",
        paragraphs: [
          "Specify the available tools, the success condition, the budget, and when the system should ask a person for help. Evaluate complete tasks before making the loop more autonomous.",
        ],
      },
    ],
  },
  {
    slug: "build-an-experiment-logbook",
    title: "Build an experiment logbook",
    description: "Give small experiments a place to become reusable knowledge.",
    status: "In progress",
    topic: "Learning",
    updated: "2026-11-01",
    sections: [
      {
        id: "record",
        title: "Record the decision, not just the output",
        paragraphs: [
          "An experiment log is most useful when it captures why you tried something. Record the question, the configuration, the result, and the next decision.",
        ],
      },
      {
        id: "template",
        title: "A small template",
        paragraphs: [
          "Use the same template each time so comparisons stay easy.",
        ],
        code: "Question:\nBaseline:\nChange:\nObserved result:\nWhat I would try next:",
      },
    ],
  },
];

export const issues = [
  {
    slug: "2026-w45",
    number: "045",
    date: "November 7, 2026",
    title: "From retrieval to reliable answers",
    description:
      "This week: retrieval as a system, small evaluation sets, and making experiments useful.",
    items: [
      "Treat retrieval as a separate problem",
      "Evaluate before changing prompts",
      "Build a small experiment logbook",
    ],
  },
  {
    slug: "2026-w44",
    number: "044",
    date: "October 31, 2026",
    title: "Before a bigger model, a better question",
    description: "Clearer tasks, stronger baselines, and fewer assumptions.",
    items: [
      "Write the success condition first",
      "Keep one simple baseline",
      "Inspect the examples that disagree",
    ],
  },
  {
    slug: "2026-w43",
    number: "043",
    date: "October 24, 2026",
    title: "Tokens up close",
    description:
      "Small experiments with tokenization, context, and the shape of a prompt.",
    items: [
      "Compare two tokenizers",
      "Measure the context budget",
      "Keep source boundaries visible",
    ],
  },
  {
    slug: "2026-w42",
    number: "042",
    date: "October 17, 2026",
    title: "The first project, small and repeatable",
    description:
      "A focused project is a better teacher when you can run the experiment again.",
    items: [
      "Start with one useful task",
      "Make the setup reproducible",
      "Write down the tradeoffs",
    ],
  },
  {
    slug: "2026-w41",
    number: "041",
    date: "October 10, 2026",
    title: "Memory for what?",
    description:
      "A closer look at useful state, persistence, and deliberate forgetting.",
    items: [
      "Separate history from memory",
      "Persist only useful state",
      "Give the user control",
    ],
  },
] as const;

export const searchItems = [
  ...notes.map((n) => ({
    title: n.title,
    description: n.description,
    type: "Note",
    href: `/notes/${n.slug}`,
    keywords: n.topic,
  })),
  ...resources.map((r) => ({
    title: r.title,
    description: r.description,
    type: "Resource",
    href: `/library/${r.slug}`,
    keywords: `${r.topic} ${r.kind} ${r.author}`,
  })),
  ...paths.map((p) => ({
    title: p.title,
    description: p.description,
    type: "Learning path",
    href: `/roadmaps/${p.slug}`,
    keywords: p.level,
  })),
  ...issues.map((i) => ({
    title: i.title,
    description: i.description,
    type: "Weekly issue",
    href: `/this-week/${i.slug}`,
    keywords: "weekly retrieval evaluation",
  })),
];

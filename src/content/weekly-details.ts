import { issues, type ArticleSection } from "./notebook";

const paragraphs: Record<string, string[][]> = {
  "2026-w45": [
    [
      "A retrieval-augmented system can fail before a language model sees the question. Keep a small set of questions with known relevant sources, then inspect whether those sources appear in the retrieved results.",
      "Start with a lexical baseline. Compare chunking and ranking changes against the same questions so the experiment explains something useful.",
    ],
    [
      "Before rewriting a prompt, decide which behavior needs to improve. Separate evidence selection, factual accuracy, and the usefulness of the final answer.",
      "Include ordinary questions, ambiguous questions, and questions the collection cannot answer. A useful evaluation should reward a clear admission of missing evidence.",
    ],
    [
      "Give each experiment a question, a baseline, one deliberate change, and an observed result. Keep the configuration alongside the notes so the experiment can be repeated.",
      "The next action should follow from the result: keep the change, reject it, or collect another example. A short record is enough when it captures that decision.",
    ],
  ],
  "2026-w44": [
    [
      "Write down what a useful answer would let someone do. Choose a concrete question and describe the evidence, format, and level of detail it needs.",
      "A clear success condition makes it easier to decide whether a larger model would actually improve the task.",
    ],
    [
      "Keep one simple approach you can compare everything else against. It could be a keyword search, a deterministic workflow, or a carefully written prompt.",
      "Run the same examples through the baseline and the new approach. Record gains and regressions together.",
    ],
    [
      "The most informative examples are often the ones where two approaches disagree. Read their inputs, retrieved context, and outputs side by side.",
      "Use the disagreement to form the next question. Avoid changing several components before you understand the failure.",
    ],
  ],
  "2026-w43": [
    [
      "Take a short passage and inspect how two tokenizers split it. Include whitespace, punctuation, source code, and text from more than one language.",
      "Token counts are a property of both the text and the tokenizer. They are useful for budgeting, but they are not a direct measure of understanding.",
    ],
    [
      "Measure how much of a request is instructions, evidence, conversation history, and the expected output. Keep room for the answer instead of filling the entire window.",
      "Try removing material that does not support the task, then compare the result and latency on the same examples.",
    ],
    [
      "Separate instructions from quoted material. Attach source identifiers to evidence before it enters the prompt, and ask for citations that can be checked.",
      "A readable context structure also helps people inspect the system when an answer is wrong.",
    ],
  ],
  "2026-w42": [
    [
      "Choose one task small enough to describe in a sentence. Define its inputs, the expected output, and the person who would use it.",
      "A narrow project gives you a shorter feedback loop and makes the first useful result easier to recognize.",
    ],
    [
      "Record the dependency versions, configuration, and example inputs needed to run the project again. Keep secrets out of the repository.",
      "One documented command and a small set of examples are often enough for the first repeatable experiment.",
    ],
    [
      "Explain the decisions that matter: why this data source, this model, this interaction, or this failure behavior? Include the limits of the current version.",
      "A useful project note helps someone understand what to reuse and what to change.",
    ],
  ],
  "2026-w41": [
    [
      "Conversation history records what happened. A useful memory is a selected piece of information that should influence a future task.",
      "Keep those concepts separate so persistence has a clear purpose and users can understand what the application remembers.",
    ],
    [
      "Before storing a value, identify which future behavior depends on it. Consider its lifetime, how it becomes stale, and how it should be updated.",
      "A short, deliberate record is often easier to use than an unfiltered archive of every interaction.",
    ],
    [
      "Make saved state visible and editable. Give people an obvious way to reset progress or remove a saved item.",
      "Persistence should make a return visit more useful without making the system’s behavior harder to explain.",
    ],
  ],
};

export function getIssueSections(slug: string): ArticleSection[] {
  const issue = issues.find((item) => item.slug === slug);
  if (!issue) return [];
  return issue.items.map((title, index) => ({
    id: `idea-${index + 1}`,
    title,
    paragraphs: paragraphs[slug][index],
  }));
}

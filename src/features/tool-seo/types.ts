export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  input?: string;
  output?: string;
  explanation: string;
}

export interface ToolStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolMistake {
  mistake: string;
  fix: string;
}

export interface ToolPageContent {
  heroHighlights: string[];
  whatIsParagraphs: string[];
  howToSteps: ToolStep[];
  examples: ToolExample[];
  useCases: string[];
  faqs: ToolFaq[];
  developerTips: string[];
  commonMistakes: ToolMistake[];
  benefits: string[];
}

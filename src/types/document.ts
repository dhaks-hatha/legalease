export type DocumentCategory = 'Business' | 'Employment' | 'Rental' | 'Personal' | 'Agreements';

export type DocumentStatus = 'draft' | 'completed';

export interface DocumentClause {
  id: string;
  number: string;
  heading: string;
  text: string;
  explanation: string;
  isOptional?: boolean;
  category?: string;
}

export interface PartyInfo {
  role: string;
  name: string;
  entityType: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  email: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  estimatedTime: string;
  popular?: boolean;
  keyClauses: string[];
  defaultValues: {
    title: string;
    jurisdictionCountry: string;
    jurisdictionState: string;
    effectiveDate: string;
    purpose: string;
    partyA: PartyInfo;
    partyB: PartyInfo;
    customTerms: Record<string, string>;
  };
  generateClauses: (formData: Record<string, any>) => DocumentClause[];
}

export interface LegalDocument {
  id: string;
  title: string;
  templateId: string;
  category: DocumentCategory;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  jurisdictionCountry: string;
  jurisdictionState: string;
  effectiveDate: string;
  purpose: string;
  partyA: PartyInfo;
  partyB: PartyInfo;
  customTerms: Record<string, string>;
  clauses: DocumentClause[];
  watermarkEnabled?: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  referencedClause?: string;
}

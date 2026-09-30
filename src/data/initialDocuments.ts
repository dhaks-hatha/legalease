import { LegalDocument } from '../types/document';
import { DOCUMENT_TEMPLATES } from './templates';

export const INITIAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-1',
    title: 'Mutual Non-Disclosure Agreement (Apex & Vanguard)',
    templateId: 'nda',
    category: 'Agreements',
    status: 'completed',
    createdAt: '2026-09-24T14:30:00.000Z',
    updatedAt: '2026-09-25T10:15:00.000Z',
    jurisdictionCountry: 'United States',
    jurisdictionState: 'Delaware',
    effectiveDate: '2026-09-25',
    purpose: 'Evaluating potential enterprise software integration and co-development partnership.',
    partyA: DOCUMENT_TEMPLATES[0].defaultValues.partyA,
    partyB: DOCUMENT_TEMPLATES[0].defaultValues.partyB,
    customTerms: DOCUMENT_TEMPLATES[0].defaultValues.customTerms,
    clauses: DOCUMENT_TEMPLATES[0].generateClauses(DOCUMENT_TEMPLATES[0].defaultValues),
    watermarkEnabled: true
  },
  {
    id: 'doc-2',
    title: 'Design Systems Contractor Agreement (Alex Rivera)',
    templateId: 'freelance',
    category: 'Employment',
    status: 'draft',
    createdAt: '2026-09-26T09:12:00.000Z',
    updatedAt: '2026-09-27T16:45:00.000Z',
    jurisdictionCountry: 'United States',
    jurisdictionState: 'California',
    effectiveDate: '2026-10-01',
    purpose: 'UI design system and component engineering for marketing portal.',
    partyA: DOCUMENT_TEMPLATES[3].defaultValues.partyA,
    partyB: DOCUMENT_TEMPLATES[3].defaultValues.partyB,
    customTerms: DOCUMENT_TEMPLATES[3].defaultValues.customTerms,
    clauses: DOCUMENT_TEMPLATES[3].generateClauses(DOCUMENT_TEMPLATES[3].defaultValues),
    watermarkEnabled: true
  },
  {
    id: 'doc-3',
    title: 'Oak Creek Residential Tenancy Lease',
    templateId: 'rental',
    category: 'Rental',
    status: 'completed',
    createdAt: '2026-09-20T11:00:00.000Z',
    updatedAt: '2026-09-22T13:20:00.000Z',
    jurisdictionCountry: 'United States',
    jurisdictionState: 'California',
    effectiveDate: '2026-10-01',
    purpose: 'Residential tenancy of Unit 3B, San Jose.',
    partyA: DOCUMENT_TEMPLATES[1].defaultValues.partyA,
    partyB: DOCUMENT_TEMPLATES[1].defaultValues.partyB,
    customTerms: DOCUMENT_TEMPLATES[1].defaultValues.customTerms,
    clauses: DOCUMENT_TEMPLATES[1].generateClauses(DOCUMENT_TEMPLATES[1].defaultValues),
    watermarkEnabled: false
  }
];

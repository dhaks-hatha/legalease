import { LegalDocument } from '../types/document';
import { INITIAL_DOCUMENTS } from '../data/initialDocuments';

const STORAGE_KEY = 'legalease_documents_v1';

export function getStoredDocuments(): LegalDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
      return INITIAL_DOCUMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DOCUMENTS;
  } catch (err) {
    console.error('Error reading documents from localStorage:', err);
    return INITIAL_DOCUMENTS;
  }
}

export function saveDocument(doc: LegalDocument): void {
  try {
    const docs = getStoredDocuments();
    const index = docs.findIndex((d) => d.id === doc.id);
    let updated: LegalDocument[];
    if (index >= 0) {
      updated = [...docs];
      updated[index] = { ...doc, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...doc, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...docs];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving document to localStorage:', err);
  }
}

export function deleteDocument(id: string): LegalDocument[] {
  try {
    const docs = getStoredDocuments().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    return docs;
  } catch (err) {
    console.error('Error deleting document:', err);
    return [];
  }
}

export function duplicateDocument(id: string): LegalDocument | null {
  try {
    const docs = getStoredDocuments();
    const original = docs.find((d) => d.id === id);
    if (!original) return null;

    const duplicated: LegalDocument = {
      ...original,
      id: 'doc-' + Date.now(),
      title: `${original.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [duplicated, ...docs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return duplicated;
  } catch (err) {
    console.error('Error duplicating document:', err);
    return null;
  }
}

export function exportDocumentAsDocx(doc: LegalDocument): void {
  const content = `
${doc.title.toUpperCase()}
Jurisdiction: ${doc.jurisdictionState}, ${doc.jurisdictionCountry}
Effective Date: ${doc.effectiveDate}
Status: ${doc.status.toUpperCase()}

PARTIES:
Party A: ${doc.partyA.name} (${doc.partyA.role})
Address: ${doc.partyA.address}
Signatory: ${doc.partyA.signatoryName}, ${doc.partyA.signatoryTitle}

Party B: ${doc.partyB.name} (${doc.partyB.role})
Address: ${doc.partyB.address}
Signatory: ${doc.partyB.signatoryName}, ${doc.partyB.signatoryTitle}

PURPOSE:
${doc.purpose}

--------------------------------------------------------------------------------
TERMS AND CLAUSES
--------------------------------------------------------------------------------

${doc.clauses
  .map(
    (c) => `${c.number} ${c.heading.toUpperCase()}
${c.text}
`
  )
  .join('\n\n')}

--------------------------------------------------------------------------------
SIGNATURES
--------------------------------------------------------------------------------

${doc.partyA.name}
By: _______________________________
Name: ${doc.partyA.signatoryName}
Title: ${doc.partyA.signatoryTitle}
Date: _____________________________

${doc.partyB.name}
By: _______________________________
Name: ${doc.partyB.signatoryName}
Title: ${doc.partyB.signatoryTitle}
Date: _____________________________

================================================================================
DISCLAIMER: LegalEase provides document drafts for informational purposes and is not a law firm.
This document draft does not constitute formal legal advice.
================================================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_draft.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ClauseExplanation {
  summary: string;
  plainEnglish: string;
  keyRisks: string[];
  practicalTip: string;
}

export function explainClause(heading: string, text: string): ClauseExplanation {
  const lower = (heading + ' ' + text).toLowerCase();

  if (lower.includes('confidential') || lower.includes('non-disclosure')) {
    return {
      summary: 'Confidentiality and Trade Secret Protection',
      plainEnglish: 'This clause binds the receiving party not to share, leak, or misuse your private business data, trade secrets, software code, or strategic plans with outsiders.',
      keyRisks: [
        'If definitions are too vague, a court might find it unenforceable.',
        'Oral disclosures must be followed up in writing within the stated timeframe.'
      ],
      practicalTip: 'Always mark sensitive slide decks, source repositories, or spreadsheets clearly as "Confidential" when sharing.'
    };
  }

  if (lower.includes('exclusion') || lower.includes('permitted')) {
    return {
      summary: 'Safe Harbors and Non-Confidential Items',
      plainEnglish: 'Protects the other side from being sued if the information was already public knowledge, already known to them before you met, or ordered disclosed by a judge.',
      keyRisks: [
        'Standard across virtually every legal jurisdiction; courts will reject agreements that try to prevent someone from sharing already public facts.'
      ],
      practicalTip: 'Notice provision: make sure they must notify you immediately if subpoenaed by a court.'
    };
  }

  if (lower.includes('term') || lower.includes('duration') || lower.includes('survival')) {
    return {
      summary: 'Effective Period and Survival Duration',
      plainEnglish: 'Sets the lifespan of the obligations. Even after the working relationship ends, the secrecy or restrictive covenant remains active for the specified duration (e.g. 2 to 3 years).',
      keyRisks: [
        'Indefinite terms are often struck down by state courts for ordinary commercial secrets, except for core technical trade secrets.'
      ],
      practicalTip: '2-3 years is industry standard for software, venture evaluations, and freelance contracts.'
    };
  }

  if (lower.includes('injunctive') || lower.includes('remedy') || lower.includes('equitable')) {
    return {
      summary: 'Immediate Emergency Court Orders',
      plainEnglish: 'Because a leaked secret cannot be un-leaked, money alone is insufficient. This clause allows you to ask a judge for an immediate restraining order or injunction to halt disclosures.',
      keyRisks: [
        'Courts require clear proof of irreparable harm before issuing an injunction.'
      ],
      practicalTip: 'Ensure this is mutual so both sides respect the high stakes of intellectual property leaks.'
    };
  }

  if (lower.includes('jurisdiction') || lower.includes('governing law')) {
    return {
      summary: 'Choice of Law and Legal Forum',
      plainEnglish: 'Determines which state or country\'s legal system applies, and in which geographic courthouse disputes must be filed.',
      keyRisks: [
        'Litigating in a remote state or foreign country can be prohibitively expensive for startups or individual freelancers.'
      ],
      practicalTip: 'Try to designate your home state/country, or choose neutral Delaware / California for tech agreements.'
    };
  }

  if (lower.includes('rent') || lower.includes('deposit') || lower.includes('payment')) {
    return {
      summary: 'Financial Terms & Payment Deadlines',
      plainEnglish: 'Spells out exactly how much money is due, when it must be paid, payment methods, and penalties or interest for late payments.',
      keyRisks: [
        'Late fees must comply with local statutory usury and tenancy caps (typically 5% max).'
      ],
      practicalTip: 'Specify an explicit grace period (e.g., 5 days) to avoid unnecessary disputes over bank transfer delays.'
    };
  }

  if (lower.includes('invention') || lower.includes('work made for hire') || lower.includes('intellectual property')) {
    return {
      summary: 'Ownership of Work and IP Assignment',
      plainEnglish: 'Confirms that all software, design assets, and inventions created by the employee or contractor during engagement become the property of the company.',
      keyRisks: [
        'Contractors must receive full payment before copyright ownership irrevocably transfers, protecting against non-payment.'
      ],
      practicalTip: 'Always carve out pre-existing open source tools or personal libraries from the transfer.'
    };
  }

  return {
    summary: heading,
    plainEnglish: `This clause legally defines the mutual duties, boundaries, and standards regarding "${heading}". It establishes enforceable guidelines under applicable jurisdiction laws to prevent ambiguities.`,
    keyRisks: [
      'Ambiguous phrasing can lead to differing interpretations if contested.',
      'Ensure all deadlines and milestones are concrete and measurable.'
    ],
    practicalTip: 'Have a licensed legal attorney in your local jurisdiction review any significant modifications prior to formal execution.'
  };
}

export function simplifyClause(text: string): string {
  // Turn legalese into crystal clear, professional plain English
  return text
    .replace(/shall include all proprietary information, trade secrets, software code/i, 'includes all business trade secrets, source code')
    .replace(/whether orally, visually, or in tangible writing/i, 'whether spoken, viewed, or written')
    .replace(/agrees to hold and maintain all Confidential Information in strictest confidence/i, 'promises to protect all private data and never share it without permission')
    .replace(/The Receiving Party shall exercise at least the same degree of care as it uses for its own confidential records/i, 'The recipient must treat this data with the same careful standard as its own confidential records')
    .replace(/Nothing contained in this Agreement shall be construed as granting, conferring, or implying any license/i, 'Sharing this data does not give either party any patent, copyright, or ownership rights')
    .replace(/Both Parties acknowledge that unauthorized disclosure or misuse of Confidential Information will cause irreparable injury/i, 'Both sides agree that leaking confidential data causes serious irreversible damage, allowing either party to seek an immediate court order to halt it')
    .replace(/This Agreement shall be governed by, construed, and enforced in accordance with/i, 'This contract follows the laws of')
    .replace(/without regard to conflict of law principles/i, 'and any lawsuits must be handled in the specified local courts.');
}

export function rewriteClause(heading: string, style: 'strict' | 'mutual' | 'simplified'): string {
  if (style === 'strict') {
    return `The Receiving Party agrees to treat all Confidential Information with the utmost degree of professional security. Any breach, attempted disclosure, or negligence shall constitute grounds for immediate contract termination, maximum statutory liquidated damages, and indemnification of all associated forensic and legal costs.`;
  }
  if (style === 'mutual') {
    return `Both Parties agree to mutually hold, safeguard, and maintain all exchanged proprietary materials in strictest confidence, extending equivalent reciprocal protections, notice obligations, and non-disclosure standards to each respective entity.`;
  }
  return `Both sides agree to keep shared non-public information private, share it only with team members who need it to complete work, and return or delete it once discussions conclude.`;
}

export const SUGGESTED_ADDITIONAL_CLAUSES = [
  {
    id: 'sug-1',
    heading: 'Non-Solicitation of Personnel',
    text: 'During the term of this Agreement and for twelve (12) months following its termination, neither Party shall directly or indirectly solicit, recruit, or attempt to hire any employee or contractor of the other Party who was introduced during the course of these discussions.',
    explanation: 'Prevents the other party from poaching your key employees or software developers.'
  },
  {
    id: 'sug-2',
    heading: 'Severability and Entire Agreement',
    text: 'If any provision of this Agreement is held to be invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the remaining provisions. This document constitutes the entire understanding between the Parties, superseding all prior oral or written discussions.',
    explanation: 'Ensures that if one clause is thrown out by a judge, the rest of your contract remains completely valid.'
  },
  {
    id: 'sug-3',
    heading: 'Force Majeure (Unforeseen Circumstances)',
    text: 'Neither Party shall be held liable for failure or delay in performing obligations (other than payment duties) caused by events beyond reasonable control, including natural disasters, acts of war, pandemics, governmental embargoes, or electrical grid failures.',
    explanation: 'Excuses delays caused by extraordinary events outside either party\'s control.'
  },
  {
    id: 'sug-4',
    heading: 'Attorney Fees and Legal Cost Recovery',
    text: 'In the event of any formal arbitration or litigation arising from a breach of this Agreement, the prevailing party shall be entitled to recover reasonable attorney fees, court fees, and collection expenses from the non-prevailing party.',
    explanation: 'Discourages bad-faith lawsuits by requiring the losing party to pay the winner\'s legal fees.'
  }
];

export function getLegalAssistantAnswer(userQuery: string): { text: string; suggestions: string[] } {
  const q = userQuery.toLowerCase();

  if (q.includes('nda') || q.includes('confidential') || q.includes('non-disclosure')) {
    return {
      text: `A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship between two or more parties.

Key Elements Covered:
• What constitutes Confidential Information (trade secrets, code, financials, product designs)
• Standard of Care (how carefully the receiver must guard the secrets)
• Exclusions (public knowledge, prior knowledge, or court subpoenas)
• Term (commonly 2 to 5 years for commercial agreements)
• Remedies (right to seek an immediate court injunction)

Important Distinction:
A "Mutual NDA" protects secrets shared by both parties (common in partnerships). A "Unilateral NDA" only protects one party sharing information (common when hiring a contractor or presenting to an investor).

Notice: LegalEase generates document drafts for informational purposes and is not a substitute for legal counsel.`,
      suggestions: [
        'What information do I need to prepare an NDA?',
        'What is the difference between Mutual and Unilateral NDA?',
        'How long should an NDA confidentiality period last?'
      ]
    };
  }

  if (q.includes('jurisdiction') || q.includes('state') || q.includes('court') || q.includes('law')) {
    return {
      text: `Why Jurisdiction Matters in Contracts:

Contract laws, labor rules, tenancy rights, and enforceability vary significantly by jurisdiction:
• State/Province: In the US, for instance, California largely bans employee non-compete clauses, while Delaware is the standard choice for corporate governance.
• Choice of Forum: Specifies where any lawsuit must physically be filed.
• Governing Law: Tells the judge which state or national statutes apply to interpret the contract terms.

Practical Recommendation:
Always select the jurisdiction where your business operates, or where the property/services are physically delivered. Before signing a high-stakes contract, have an attorney licensed in that specific jurisdiction review your draft.`,
      suggestions: [
        'Why does Delaware law get chosen often?',
        'Can I choose a different jurisdiction than where I live?',
        'What happens if no jurisdiction is named?'
      ]
    };
  }

  if (q.includes('employment') || q.includes('employee') || q.includes('contractor') || q.includes('freelance')) {
    return {
      text: `Employee vs. Independent Contractor Key Differences:

1. Direction and Control:
• Employees: The employer controls when, where, and how work is done, provides tools, and withholds taxes.
• Freelancers/Contractors: Maintain control over their own schedules, tools, and methods; handle their own self-employment taxes.

2. Intellectual Property (IP):
• In employment contracts, IP created on the job is typically "Work Made for Hire" belonging to the employer.
• In freelance agreements, IP usually transfers only after the final invoice has been paid in full.

3. Worker Classification Laws:
Misclassifying an employee as an independent contractor can result in substantial statutory tax penalties. Ensure your agreement accurately reflects the true operational relationship.`,
      suggestions: [
        'What clauses are essential in a Freelance Agreement?',
        'How do I protect my intellectual property as a creator?',
        'What is a Work Made for Hire clause?'
      ]
    };
  }

  if (q.includes('rental') || q.includes('lease') || q.includes('deposit') || q.includes('tenant')) {
    return {
      text: `Key Considerations for Residential Rental & Tenancy Agreements:

Essential Items to Include:
• Full Names of all adult occupants and registered minors
• Exact Demised Premises address and parking/storage spaces
• Monthly Rent, due date, grace period, and late fee caps
• Security Deposit amount, holding bank/escrow, and statutory return deadline
• Maintenance responsibilities (landlord handles structural/plumbing; tenant handles daily upkeep)
• Pet policy, quiet hours, and sublease restrictions

Statutory Notice:
Tenant protection laws (such as rent stabilization, notice periods before eviction, and maximum deposit limits) are strictly enforced at state and city levels. Local statutory limits will always override conflicting lease clauses.`,
      suggestions: [
        'What is the standard security deposit limit?',
        'How much notice is required for landlord entry?',
        'Can a tenant sublet the apartment?'
      ]
    };
  }

  if (q.includes('valid') || q.includes('court') || q.includes('legal advice') || q.includes('lawyer')) {
    return {
      text: `About Document Validity & Legal Advice:

LegalEase is an AI-powered drafting tool designed to provide clean, structured, and customized preliminary document drafts. 

Key Guidelines to Keep in Mind:
• Draft Status: The documents generated by LegalEase are intended for informational and drafting assistance.
• Not a Law Firm: LegalEase does not provide formal legal representation, attorney-client privilege, or bespoke legal advice.
• Local Enforcement: Different states and countries enforce certain clauses (such as non-competes, liquidated damages, and penalty clauses) differently.
• When to Consult a Lawyer: For complex mergers, multi-party investments, contested divorces, or high-liability corporate transactions, you should always consult a licensed attorney in your jurisdiction.`,
      suggestions: [
        'What information do I need before drafting an agreement?',
        'Can I edit clauses after AI generation?',
        'How do I download my draft as a PDF?'
      ]
    };
  }

  return {
    text: `LegalEase Assistant is here to help you understand standard contract structures, clause meanings, and drafting guidelines.

I can assist you with:
• Explaining complex legal clauses in plain, everyday language
• Clarifying requirements for NDAs, Employment, Freelance, Rental, or Partnership contracts
• Explaining jurisdiction and choice-of-law principles
• Suggesting standard protective clauses (like Non-Solicitation or Force Majeure)

What specific agreement or legal question would you like to explore?

Disclaimer: I provide general informational guidance and document structuring assistance; this does not constitute formal legal advice.`,
    suggestions: [
      'What does a Non-Disclosure Agreement protect?',
      'What information do I need before drafting an agreement?',
      'Explain the difference between Mutual and Unilateral NDA.',
      'What is a Force Majeure clause?'
    ]
  };
}

import { DocumentTemplate, DocumentClause } from '../types/document';

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement (NDA)',
    category: 'Agreements',
    popular: true,
    estimatedTime: '3 mins',
    description: 'Protect confidential business ideas, source code, trade secrets, financial records, and proprietary negotiations between parties.',
    keyClauses: [
      'Definition of Confidential Information',
      'Non-Disclosure Obligations',
      'Permitted Exclusions',
      'Term & Survival of Confidentiality',
      'Remedies & Injunctions',
      'Governing Law & Dispute Resolution'
    ],
    defaultValues: {
      title: 'Mutual Non-Disclosure Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'Delaware',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Evaluating potential business collaboration, software integration, and commercial partnership opportunities.',
      partyA: {
        role: 'Disclosing Party / Party A',
        name: 'Apex Horizon Technologies Inc.',
        entityType: 'Corporation',
        address: '100 Innovation Way, Suite 400, Wilmington, DE 19801',
        signatoryName: 'Elena Rostova',
        signatoryTitle: 'Chief Executive Officer',
        email: 'elena@apexhorizon.tech'
      },
      partyB: {
        role: 'Receiving Party / Party B',
        name: 'Vanguard Ventures LLC',
        entityType: 'Limited Liability Company',
        address: '450 Montgomery St, 12th Floor, San Francisco, CA 94104',
        signatoryName: 'Marcus Vance',
        signatoryTitle: 'Managing Partner',
        email: 'marcus@vanguardvc.com'
      },
      customTerms: {
        confidentialityPeriod: '3 years from the Effective Date',
        markingRequirement: 'Marked as "Confidential" or orally identified within 15 days',
        permittedDisclosures: 'Employees, legal counsel, and financial advisors with a strict need-to-know',
        disputeResolution: 'Binding Arbitration under AAA Rules in Delaware'
      }
    },
    generateClauses: (formData) => {
      const termPeriod = formData.customTerms?.confidentialityPeriod || '3 years from the Effective Date';
      const state = formData.jurisdictionState || 'Delaware';
      const country = formData.jurisdictionCountry || 'United States';
      const purpose = formData.purpose || 'evaluating mutually beneficial business and technical partnerships';

      return [
        {
          id: 'c1',
          number: '1.0',
          heading: 'Definition of Confidential Information',
          text: `For the purposes of this Agreement, "Confidential Information" shall include all proprietary information, trade secrets, software code, product roadmaps, business plans, financial statements, customer lists, and technical data disclosed by either Party ("Disclosing Party") to the other Party ("Receiving Party"), whether orally, visually, or in tangible writing, relating to ${purpose}. Information disclosed orally shall be confirmed in writing within thirty (30) days of disclosure.`,
          explanation: 'Clearly defines exactly what proprietary data, code, or ideas are legally protected under this agreement.',
          category: 'Core Terms'
        },
        {
          id: 'c2',
          number: '2.0',
          heading: 'Non-Disclosure and Standard of Care',
          text: `The Receiving Party agrees to hold and maintain all Confidential Information in strictest confidence. The Receiving Party shall restrict access to Confidential Information solely to those of its directors, employees, and authorized legal and financial advisors who have a verifiable need-to-know and who are bound by confidentiality obligations at least as restrictive as those contained herein. The Receiving Party shall exercise at least the same degree of care as it uses for its own confidential records of like nature, but in no event less than a reasonable degree of care.`,
          explanation: 'Restricts who can see your sensitive information and requires the receiving party to guard it with reasonable industry safeguards.',
          category: 'Obligations'
        },
        {
          id: 'c3',
          number: '3.0',
          heading: 'Exclusions from Confidentiality',
          text: `Confidential Information shall not include information that: (a) is or becomes publicly known through no breach of this Agreement by the Receiving Party; (b) was already rightfully known to the Receiving Party prior to disclosure without an obligation of confidentiality; (c) is independently developed by the Receiving Party without reference to or reliance upon the Disclosing Party\'s Confidential Information; or (d) is required to be disclosed pursuant to a lawful order of a court or regulatory authority, provided prompt written notice is furnished to the Disclosing Party.`,
          explanation: 'Standard legal exceptions where confidentiality does not apply, such as public knowledge or court orders.',
          category: 'Exceptions'
        },
        {
          id: 'c4',
          number: '4.0',
          heading: 'Term and Duration of Obligations',
          text: `This Agreement shall commence on the Effective Date. The non-disclosure obligations set forth herein shall survive and remain binding upon each Party for a duration of ${termPeriod}. Upon expiration or written termination of discussions, the Receiving Party shall immediately return or securely certify the destruction of all tangible copies of Confidential Information.`,
          explanation: 'Specifies the length of time both parties must keep the trade secrets protected (here, 3 years).',
          category: 'Duration'
        },
        {
          id: 'c5',
          number: '5.0',
          heading: 'No License or Warranty',
          text: `Nothing contained in this Agreement shall be construed as granting, conferring, or implying any license, patent right, copyright, or intellectual property right from the Disclosing Party to the Receiving Party. All Confidential Information is provided strictly "AS IS" without warranties of accuracy or completeness.`,
          explanation: 'Guarantees that sharing information does not accidentally grant the other company any ownership or intellectual property license.',
          category: 'Intellectual Property'
        },
        {
          id: 'c6',
          number: '6.0',
          heading: 'Injunctive Relief and Equitable Remedies',
          text: `Both Parties acknowledge that unauthorized disclosure or misuse of Confidential Information will cause irreparable injury for which monetary damages alone would be inadequate. Accordingly, the Disclosing Party shall be entitled to seek immediate injunctive relief, specific performance, and other equitable remedies from any court of competent jurisdiction without the necessity of posting a bond.`,
          explanation: 'Allows you to immediately petition a judge to stop a breach before your trade secrets get leaked publicly.',
          category: 'Remedies'
        },
        {
          id: 'c7',
          number: '7.0',
          heading: 'Governing Law and Jurisdiction',
          text: `This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of ${state}, ${country}, without regard to conflict of law principles. Any legal action or proceeding arising out of or relating to this Agreement shall be instituted exclusively in the state or federal courts situated in ${state}.`,
          explanation: 'Establishes which legal system and geographic court will resolve any disputes.',
          category: 'Jurisdiction'
        }
      ];
    }
  },
  {
    id: 'rental',
    title: 'Rental Agreement',
    category: 'Rental',
    popular: true,
    estimatedTime: '4 mins',
    description: 'Comprehensive residential tenancy agreement covering monthly rent, security deposits, maintenance duties, utilities, and occupancy rules.',
    keyClauses: [
      'Premises & Occupancy Details',
      'Term of Lease & Renewal',
      'Monthly Rent & Late Fees',
      'Security Deposit & Deductions',
      'Maintenance, Repairs & Alterations',
      'Rules, Pets & Quiet Enjoyment'
    ],
    defaultValues: {
      title: 'Residential Lease Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'California',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Residential tenancy of a private single-family residential premises.',
      partyA: {
        role: 'Landlord',
        name: 'Pacific Heritage Properties LLC',
        entityType: 'Limited Liability Company',
        address: '742 Evergreen Terrace, Suite 200, San Jose, CA 95126',
        signatoryName: 'Robert Vance',
        signatoryTitle: 'Property Manager',
        email: 'management@pacificheritage.com'
      },
      partyB: {
        role: 'Tenant',
        name: 'Jordan Miller & Samantha Lee',
        entityType: 'Individual',
        address: '1040 Oak Creek Blvd, Apt 3B, San Jose, CA 95117',
        signatoryName: 'Jordan Miller',
        signatoryTitle: 'Primary Tenant',
        email: 'jordan.miller@gmail.com'
      },
      customTerms: {
        monthlyRent: '$2,850.00 USD due on the 1st day of each calendar month',
        securityDeposit: '$3,500.00 USD held in an escrow account',
        leaseTerm: '12 Months (Fixed Term with Month-to-Month conversion)',
        petPolicy: 'One domestic cat permitted with $300 refundable pet deposit',
        premisesAddress: '1040 Oak Creek Blvd, Unit 3B, San Jose, CA 95117'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'California';
      const rent = formData.customTerms?.monthlyRent || '$2,850.00 USD';
      const deposit = formData.customTerms?.securityDeposit || '$3,500.00 USD';
      const premises = formData.customTerms?.premisesAddress || 'The designated residential property';

      return [
        {
          id: 'r1',
          number: '1.0',
          heading: 'Demised Premises and Permitted Use',
          text: `The Landlord hereby leases to Tenant, and Tenant rents from Landlord, the real property located at ${premises} ("Premises"). The Premises shall be used strictly and exclusively as a private residential dwelling for the registered occupants named herein, and for no commercial or unlawful purpose.`,
          explanation: 'Identifies the physical rental address and restricts usage strictly to private residential housing.',
          category: 'Property'
        },
        {
          id: 'r2',
          number: '2.0',
          heading: 'Rent Payment Terms and Late Assessments',
          text: `Tenant agrees to pay Landlord monthly base rent of ${rent}. Rent shall be payable in advance on or before the first (1st) day of each calendar month. If rent is not received by Landlord within five (5) calendar days of the due date, Tenant shall incur a late administration assessment of 5% of the unpaid monthly balance.`,
          explanation: 'Sets the monthly rent amount, payment due date, and grace period before late charges accrue.',
          category: 'Financial'
        },
        {
          id: 'r3',
          number: '3.0',
          heading: 'Security Deposit and Conditions of Refund',
          text: `Tenant has deposited with Landlord the sum of ${deposit} as security for the faithful performance of Tenant\'s obligations. This deposit shall be held in accordance with the statutory requirements of ${state}. The deposit shall be returned within twenty-one (21) days following vacating, minus allowable statutory deductions for repair of damages beyond ordinary wear and tear.`,
          explanation: 'Governs how the deposit is held and guarantees timely return minus documented damage deductions.',
          category: 'Security'
        },
        {
          id: 'r4',
          number: '4.0',
          heading: 'Maintenance, Repairs, and Quiet Enjoyment',
          text: `Tenant shall maintain the Premises in clean, sanitary condition and promptly report plumbing leaks, electrical hazards, or structural concerns to Landlord. Tenant shall not perform structural alterations, paint walls, or change lock cylinders without prior written authorization from Landlord.`,
          explanation: 'Allocates daily upkeep responsibilities to the tenant while preserving the property integrity.',
          category: 'Maintenance'
        },
        {
          id: 'r5',
          number: '5.0',
          heading: 'Landlord Right of Inspection and Entry',
          text: `Landlord or its authorized agents reserve the right to enter the Premises for inspection, repairs, pest control, or showing to prospective buyers or tenants upon providing at least twenty-four (24) hours advance written notice, except in cases of bona fide emergency.`,
          explanation: 'Requires landlord to provide 24 hours notice prior to entering, safeguarding tenant privacy.',
          category: 'Access'
        },
        {
          id: 'r6',
          number: '6.0',
          heading: 'Governing Law and Severability',
          text: `This Lease shall be governed and interpreted under the residential landlord-tenant statutes of ${state}. If any provision of this agreement is determined to be invalid by a court of competent jurisdiction, the remaining provisions shall remain in full force.`,
          explanation: 'Ensures local landlord-tenant laws control the lease terms.',
          category: 'Legal'
        }
      ];
    }
  },
  {
    id: 'employment',
    title: 'Employment Agreement',
    category: 'Employment',
    popular: true,
    estimatedTime: '4 mins',
    description: 'Standard full-time or part-time employment contract outlining duties, compensation, benefits, IP assignment, and termination policies.',
    keyClauses: [
      'Position, Title & Reporting Structure',
      'Compensation, Bonus & Benefits',
      'Proprietary Inventions Assignment',
      'Confidentiality & Non-Compete',
      'Termination with/without Cause',
      'Severance & Notice Period'
    ],
    defaultValues: {
      title: 'Executive Employment Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'New York',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Formalization of terms for full-time executive software engineering employment.',
      partyA: {
        role: 'Employer',
        name: 'Starlight Financial Systems Inc.',
        entityType: 'Corporation',
        address: '350 Fifth Avenue, 54th Floor, New York, NY 10118',
        signatoryName: 'Catherine Sterling',
        signatoryTitle: 'Chief People Officer',
        email: 'catherine@starlightfinancial.com'
      },
      partyB: {
        role: 'Employee',
        name: 'David K. Chen',
        entityType: 'Individual',
        address: '128 W 82nd St, Apt 4A, New York, NY 10024',
        signatoryName: 'David K. Chen',
        signatoryTitle: 'Principal Systems Architect',
        email: 'david.chen.dev@gmail.com'
      },
      customTerms: {
        annualSalary: '$175,000 USD paid semi-monthly',
        noticePeriod: '30 days written notice',
        probationPeriod: '90 days probationary evaluation',
        vacationDays: '20 paid personal days per calendar year',
        title: 'Principal Systems Architect'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'New York';
      const salary = formData.customTerms?.annualSalary || '$175,000 USD';
      const role = formData.customTerms?.title || 'Principal Systems Architect';
      const notice = formData.customTerms?.noticePeriod || '30 days';

      return [
        {
          id: 'e1',
          number: '1.0',
          heading: 'Appointment, Duties, and Standard of Performance',
          text: `The Employer hereby employs the Employee in the position of ${role}. The Employee shall faithfully and diligently perform all duties customary to such role, devote their full professional time and best efforts to the business of the Employer, and adhere to all corporate compliance policies.`,
          explanation: 'Specifies the job title, dedication of working hours, and performance standards expected.',
          category: 'Role'
        },
        {
          id: 'e2',
          number: '2.0',
          heading: 'Compensation, Overtime, and Fringe Benefits',
          text: `In consideration of the services rendered, the Employer shall pay Employee an annual base salary of ${salary}, payable in accordance with the Employer\'s standard payroll schedule. Employee shall be eligible for participation in group health insurance, retirement contribution matching, and paid leave.`,
          explanation: 'Details the base salary amount, pay cadence, and employee health/retirement benefits.',
          category: 'Compensation'
        },
        {
          id: 'e3',
          number: '3.0',
          heading: 'Inventions, Patents, and Intellectual Property Assignment',
          text: `Employee agrees that all ideas, discoveries, software code, algorithms, inventions, and copyrightable works created, conceived, or reduced to practice during the period of employment that relate directly to the Employer\'s business or developed using Employer resources shall be the sole and exclusive property of the Employer ("Work Made for Hire"). Employee hereby assigns all right, title, and interest therein.`,
          explanation: 'Crucial startup clause ensuring all code and inventions created on company time belong exclusively to the company.',
          category: 'IP Assignment'
        },
        {
          id: 'e4',
          number: '4.0',
          heading: 'Termination, Notice Period, and At-Will Relationship',
          text: `Employment is subject to applicable labor standards in ${state}. Either party may terminate this employment relationship at any time by tendering at least ${notice} advance written notice, or immediately by the Employer in the event of Gross Misconduct, material fraud, or breach of fiduciary duty.`,
          explanation: 'Outlines how either side may terminate the contract and what notice period is required.',
          category: 'Termination'
        },
        {
          id: 'e5',
          number: '5.0',
          heading: 'Post-Employment Restrictive Covenants',
          text: `For a period of twelve (12) months following termination of employment, Employee shall not directly solicit, recruit, or attempt to induce any existing employees, key contractors, or active clients of Employer to terminate their commercial relationship with Employer.`,
          explanation: 'Prevents departing team members from poaching clients or team members for 12 months.',
          category: 'Protection'
        }
      ];
    }
  },
  {
    id: 'freelance',
    title: 'Freelance Agreement',
    category: 'Employment',
    popular: true,
    estimatedTime: '3 mins',
    description: 'Independent contractor agreement for software engineers, designers, consultants, and creators specifying deliverables, milestones, and payment terms.',
    keyClauses: [
      'Scope of Work & Deliverables',
      'Milestone Schedule & Payment Terms',
      'Independent Contractor Classification',
      'Intellectual Property Transfer Upon Full Payment',
      'Revisions, Acceptance & Late Fees',
      'Mutual Confidentiality'
    ],
    defaultValues: {
      title: 'Independent Contractor Service Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'California',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Design and front-end engineering of customer-facing web platform.',
      partyA: {
        role: 'Client',
        name: 'Nexus Cloud Innovations LLC',
        entityType: 'Limited Liability Company',
        address: '500 Howard Street, Suite 300, San Francisco, CA 94105',
        signatoryName: 'Harrison Cole',
        signatoryTitle: 'VP of Product',
        email: 'hcole@nexusinnovate.io'
      },
      partyB: {
        role: 'Freelancer / Contractor',
        name: 'Alex Rivera Studio',
        entityType: 'Sole Proprietorship',
        address: '2100 Mission St, San Francisco, CA 94110',
        signatoryName: 'Alex Rivera',
        signatoryTitle: 'Lead Design Engineer',
        email: 'alex@riveradesign.co'
      },
      customTerms: {
        totalFee: '$8,500.00 USD (50% upfront deposit, 50% upon final acceptance)',
        deliverables: 'Complete UI design system, React component library, and responsive marketing landing pages',
        timeline: '6 weeks from receipt of initial deposit',
        revisionRounds: 'Two (2) consolidated rounds of feedback included'
      }
    },
    generateClauses: (formData) => {
      const fee = formData.customTerms?.totalFee || '$8,500.00 USD';
      const deliverables = formData.customTerms?.deliverables || 'Design and engineering deliverables';
      const timeline = formData.customTerms?.timeline || '6 weeks';
      const state = formData.jurisdictionState || 'California';

      return [
        {
          id: 'f1',
          number: '1.0',
          heading: 'Scope of Services and Deliverables',
          text: `Contractor agrees to perform the professional services and produce deliverables as specified: ${deliverables}. Contractor shall devote sufficient time and expertise to complete said deliverables within the agreed timeline of ${timeline}. Any scope additions beyond this agreement shall require a written Change Order.`,
          explanation: 'Defines deliverables and protects freelancers against "scope creep" without extra pay.',
          category: 'Scope'
        },
        {
          id: 'f2',
          number: '2.0',
          heading: 'Fees, Invoicing, and Payment Milestones',
          text: `Client shall compensate Contractor total consideration of ${fee}. Invoices submitted by Contractor shall be paid net fifteen (15) days. Delinquent payments shall incur interest at the rate of 1.5% per month or the maximum statutory rate permitted by law.`,
          explanation: 'Protects the freelancer\'s cash flow with explicit milestone schedule and late payment fees.',
          category: 'Compensation'
        },
        {
          id: 'f3',
          number: '3.0',
          heading: 'Independent Contractor Status and Tax Responsibility',
          text: `The Parties expressly acknowledge that Contractor is an independent contractor and not an employee, partner, or joint venturer of Client. Contractor maintains sole discretion over methods and working hours and is strictly responsible for all federal, state, and local income and self-employment taxes.`,
          explanation: 'Protects both parties by confirming contractor status and clarifying tax obligations.',
          category: 'Classification'
        },
        {
          id: 'f4',
          number: '4.0',
          heading: 'Ownership of Deliverables and IP Transfer',
          text: `Conditioned strictly upon full and complete payment of all agreed fees, Contractor assigns to Client all right, title, and copyright in the final deliverables. Contractor retains ownership of pre-existing tools, open-source libraries, and modular code snippets ("Background IP"), granting Client a non-exclusive perpetual license to use them.`,
          explanation: 'Ensures the client only owns the final work after paying the invoice in full.',
          category: 'Intellectual Property'
        },
        {
          id: 'f5',
          number: '5.0',
          heading: 'Governing Law and Dispute Resolution',
          text: `This Agreement shall be construed and governed by the laws of ${state}. In the event of non-payment or disputed deliverables, the prevailing party in any formal arbitration or small claims proceeding shall be entitled to recover reasonable legal and collection fees.`,
          explanation: 'Allows freelancer to recover legal expenses if forced to take legal action for non-payment.',
          category: 'Enforcement'
        }
      ];
    }
  },
  {
    id: 'partnership',
    title: 'Partnership Agreement',
    category: 'Business',
    popular: false,
    estimatedTime: '5 mins',
    description: 'Formal partnership deed defining capital contributions, profit/loss sharing percentages, voting rights, management duties, and dissolution protocols.',
    keyClauses: [
      'Name & Principal Place of Business',
      'Capital Contributions & Ownership Ratios',
      'Profit and Loss Allocation',
      'Management, Authority & Voting',
      'Withdrawal, Buyout & Valuation',
      'Dissolution & Winding Up'
    ],
    defaultValues: {
      title: 'General Commercial Partnership Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'Delaware',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Operation of a commercial digital product studio and venture incubator.',
      partyA: {
        role: 'Partner A (50% Stake)',
        name: 'Julian Sterling',
        entityType: 'Individual',
        address: '1440 Broadway, New York, NY 10018',
        signatoryName: 'Julian Sterling',
        signatoryTitle: 'Managing Partner',
        email: 'julian@sterlingmedia.co'
      },
      partyB: {
        role: 'Partner B (50% Stake)',
        name: 'Maya Lin',
        entityType: 'Individual',
        address: '88 Franklin Street, New York, NY 10013',
        signatoryName: 'Maya Lin',
        signatoryTitle: 'Operating Partner',
        email: 'maya@sterlingmedia.co'
      },
      customTerms: {
        capitalRatio: '50% / 50% Equal Initial Capitalization ($50,000 each)',
        votingMajority: 'Supermajority (75%) required for expenditures exceeding $10,000',
        buyoutTerms: 'Right of first refusal with 60-day notice and independent appraisal',
        profitCadence: 'Quarterly distributions following tax and reserve retention'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'Delaware';
      const capital = formData.customTerms?.capitalRatio || '50% / 50% Equal Split';
      const voting = formData.customTerms?.votingMajority || 'Majority vote';

      return [
        {
          id: 'p1',
          number: '1.0',
          heading: 'Formation, Firm Name, and Business Purpose',
          text: `The Partners hereby form a general commercial partnership pursuant to the partnership laws of ${state}. The partnership shall operate under the legal name designated herein and engage in legitimate commercial business activities.`,
          explanation: 'Establishes the legal entity name and purpose of the joint venture.',
          category: 'Formation'
        },
        {
          id: 'p2',
          number: '2.0',
          heading: 'Capital Contributions and Partnership Equity Ratios',
          text: `Initial capital contributions and ownership percentages shall be maintained as: ${capital}. No partner shall be compelled to make additional capital contributions without unanimous written consent. Individual capital accounts shall be maintained in accordance with standard GAAP principles.`,
          explanation: 'Records how much money each partner is investing and their exact ownership split.',
          category: 'Capital'
        },
        {
          id: 'p3',
          number: '3.0',
          heading: 'Profit and Loss Allocations and Working Capital Reserves',
          text: `Net profits and losses of the partnership shall be credited or debited to each partner in proportion to their respective equity ratios. Distributions of net available cash shall occur quarterly, subject to the retention of necessary working capital reserves.`,
          explanation: 'Governs how dividends are distributed and how losses are shared fairly.',
          category: 'Finance'
        },
        {
          id: 'p4',
          number: '4.0',
          heading: 'Management Authority and Decision-Making Thresholds',
          text: `Each Partner shall participate actively in day-to-day operations. However, ${voting} shall be mandatory for major business decisions, including capital asset acquisition, debt financing, legal litigation, and hiring executive personnel.`,
          explanation: 'Prevents one partner from borrowing money or signing major contracts without the other partner\'s consent.',
          category: 'Governance'
        },
        {
          id: 'p5',
          number: '5.0',
          heading: 'Partner Exit, Buyout Mechanism, and Right of First Refusal',
          text: `In the event a Partner desires to withdraw from the partnership, they shall grant the remaining Partner a sixty (60) day Right of First Refusal to purchase their equity interest at fair market value as appraised by a certified neutral valuation auditor.`,
          explanation: 'Provides an orderly buyout exit plan so the business doesn\'t collapse if a partner leaves.',
          category: 'Exit'
        }
      ];
    }
  },
  {
    id: 'affidavit',
    title: 'General Sworn Affidavit',
    category: 'Personal',
    popular: false,
    estimatedTime: '2 mins',
    description: 'Sworn legal statement of facts affirmed under oath or solemn affirmation before a notary public or commissioner of oaths.',
    keyClauses: [
      'Affiant Statement & Jurisdiction',
      'Sworn Statements of Fact',
      'Affirmation Under Penalty of Perjury',
      'Jurats & Formal Notarial Block'
    ],
    defaultValues: {
      title: 'Affidavit of Fact and Identity Verification',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'Texas',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Sworn affirmation of lost official record documentation and lawful identity.',
      partyA: {
        role: 'Affiant (Declarant)',
        name: 'Michael Arthur Pendelton',
        entityType: 'Individual',
        address: '420 Congress Ave, Suite 1100, Austin, TX 78701',
        signatoryName: 'Michael Arthur Pendelton',
        signatoryTitle: 'Affiant',
        email: 'mpendelton@austintx.org'
      },
      partyB: {
        role: 'Notary Public / Witness',
        name: 'Office of the Notary Public',
        entityType: 'State Notary Public',
        address: 'Travis County Notarial Division, Austin, TX',
        signatoryName: 'Sarah Jenkins',
        signatoryTitle: 'Commissioned Notary Public',
        email: 'notary.traviscounty@notaries.gov'
      },
      customTerms: {
        statementFact1: 'I am over eighteen (18) years of age, of sound mind, and fully competent to testify to the facts set forth herein.',
        statementFact2: 'The official commercial ledger records dated March 2026 were physically misplaced during office relocation.',
        statementFact3: 'All assertions made herein represent firsthand personal knowledge and truth.'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'Texas';
      const fact1 = formData.customTerms?.statementFact1 || 'I am of legal age and competent to testify.';
      const fact2 = formData.customTerms?.statementFact2 || 'I affirm the facts stated herein.';

      return [
        {
          id: 'a1',
          number: '1.0',
          heading: 'Affiant Declaration and Competency',
          text: `I, the undersigned Affiant, having been first duly sworn upon my solemn oath, depose and state: ${fact1}`,
          explanation: 'Confirms that the declarant is an adult of sound mind testifying under oath.',
          category: 'Preamble'
        },
        {
          id: 'a2',
          number: '2.0',
          heading: 'Substantive Factual Assertions',
          text: `I hereby declare and affirm based upon firsthand personal knowledge: ${fact2}`,
          explanation: 'Sets out the exact truthful statements the declarant is certifying.',
          category: 'Facts'
        },
        {
          id: 'a3',
          number: '3.0',
          heading: 'Affirmation Under Penalty of Perjury',
          text: `I declare, verify, and certify under penalty of perjury under the laws of ${state} that the foregoing statements are true, accurate, and complete to the best of my knowledge, information, and belief.`,
          explanation: 'The critical legal oath linking the statement to perjury laws.',
          category: 'Oath'
        },
        {
          id: 'a4',
          number: '4.0',
          heading: 'Notarial Jurat and Acknowledgment Block',
          text: `Subscribed and sworn to (or affirmed) before me on this day, by Affiant who proved to me on the basis of satisfactory government identification to be the person who appeared before me. Witness my hand and official seal.`,
          explanation: 'The official space where a notary public stamps and signs.',
          category: 'Notary'
        }
      ];
    }
  },
  {
    id: 'leave-license',
    title: 'Leave and License Agreement',
    category: 'Rental',
    popular: false,
    estimatedTime: '4 mins',
    description: 'Contract granting temporary permissive license to occupy residential or commercial property without creating tenancy rights.',
    keyClauses: [
      'Grant of Permissive License',
      'License Fee & Security Deposit',
      'Duration & Termination Notice',
      'Maintenance & Statutory Compliance'
    ],
    defaultValues: {
      title: 'Leave and License Agreement for Residential Premises',
      jurisdictionCountry: 'India',
      jurisdictionState: 'Maharashtra',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Temporary permission to occupy furnished apartment without creating landlord-tenant tenancy rights.',
      partyA: {
        role: 'Licensor',
        name: 'Anil Kumar Sharma',
        entityType: 'Individual',
        address: 'Flat 502, Skyview Heights, Powai, Mumbai 400076',
        signatoryName: 'Anil Kumar Sharma',
        signatoryTitle: 'Sole Owner & Licensor',
        email: 'anil.sharma@gmail.com'
      },
      partyB: {
        role: 'Licensee',
        name: 'Pooja Verma',
        entityType: 'Individual',
        address: 'B-12, Sector 44, Noida, UP 201301',
        signatoryName: 'Pooja Verma',
        signatoryTitle: 'Licensee',
        email: 'pooja.verma@techcorp.in'
      },
      customTerms: {
        licenseFee: 'INR 45,000 per month payable in advance',
        depositAmount: 'INR 150,000 interest-free refundable security deposit',
        termMonths: '11 Months',
        noticePeriod: '1 month advance written notice by either party'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'Maharashtra';
      const fee = formData.customTerms?.licenseFee || 'Agreed monthly compensation';
      const term = formData.customTerms?.termMonths || '11 Months';

      return [
        {
          id: 'll1',
          number: '1.0',
          heading: 'Grant of Permissive License (No Tenancy Right Created)',
          text: `The Licensor hereby grants unto the Licensee a purely temporary, revocable, and permissive license to occupy the premises for residential use for a fixed duration of ${term}. It is explicitly agreed that this agreement does not create any tenancy, sub-tenancy, or leasehold estate in favor of the Licensee under the applicable Rent Control statutes of ${state}.`,
          explanation: 'Ensures the agreement is a revocable license rather than an irreversible tenancy.',
          category: 'Nature of Grant'
        },
        {
          id: 'll2',
          number: '2.0',
          heading: 'License Compensation and Utilities',
          text: `The Licensee shall pay to the Licensor monthly license compensation of ${fee}. In addition, the Licensee shall pay all actual consumption charges for electricity, broadband, and municipal gas.`,
          explanation: 'Specifies monthly license fee and direct utility payments.',
          category: 'Fees'
        },
        {
          id: 'll3',
          number: '3.0',
          heading: 'Inspection, Repairs, and Peaceful Handover',
          text: `Upon expiration or sooner termination of this License, the Licensee shall peacefully vacate and hand over possession of the premises to the Licensor in sound habitable condition along with all fixtures.`,
          explanation: 'Mandates immediate return of the keys upon license conclusion.',
          category: 'Handover'
        }
      ];
    }
  },
  {
    id: 'service-agreement',
    title: 'Service Agreement (SOW)',
    category: 'Business',
    popular: true,
    estimatedTime: '4 mins',
    description: 'Master services agreement and statement of work detailing service levels, warranty, indemnification, and liability limits for B2B vendors.',
    keyClauses: [
      'Scope of Services & Acceptance Criteria',
      'Billing, Rates & Retainers',
      'Representations & Warranties',
      'Limitation of Liability & Indemnification',
      'Term & Termination Rights'
    ],
    defaultValues: {
      title: 'Master Professional Services Agreement',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'Delaware',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Provision of enterprise cybersecurity monitoring and cloud infrastructure automation services.',
      partyA: {
        role: 'Client',
        name: 'HyperScale Logistics Corp.',
        entityType: 'Corporation',
        address: '1200 Lakeview Parkway, Chicago, IL 60601',
        signatoryName: 'Victoria Price',
        signatoryTitle: 'Chief Information Officer',
        email: 'vprice@hyperscalelogistics.com'
      },
      partyB: {
        role: 'Service Provider',
        name: 'CyberShield Systems Inc.',
        entityType: 'Corporation',
        address: '800 West El Camino Real, Mountain View, CA 94040',
        signatoryName: 'Arthur Dent',
        signatoryTitle: 'Executive Vice President',
        email: 'arthur@cybershield.io'
      },
      customTerms: {
        billingRate: '$12,000 USD monthly retainer plus $180/hour for Tier 3 incident response',
        serviceLevels: '99.9% uptime with 30-minute critical response SLA',
        liabilityCap: 'Capped at total fees paid in preceding 12 months'
      }
    },
    generateClauses: (formData) => {
      const state = formData.jurisdictionState || 'Delaware';
      const rates = formData.customTerms?.billingRate || '$12,000 monthly retainer';
      const cap = formData.customTerms?.liabilityCap || 'Fees paid during the preceding 12 months';

      return [
        {
          id: 'sa1',
          number: '1.0',
          heading: 'Provision of Professional Services',
          text: `Service Provider agrees to provide the specialized enterprise services specified herein in a professional, workmanlike manner adhering to prevailing industry standards.`,
          explanation: 'Legally commits the vendor to meet professional industry standards.',
          category: 'Services'
        },
        {
          id: 'sa2',
          number: '2.0',
          heading: 'Fees, Invoicing, and Reimbursable Expenses',
          text: `Client shall compensate Service Provider as follows: ${rates}. Payment is due within thirty (30) days of invoice submission. Approved travel expenses shall be billed at actual cost.`,
          explanation: 'Clear commercial terms covering retainer, invoices, and expense reimbursement.',
          category: 'Commercial'
        },
        {
          id: 'sa3',
          number: '3.0',
          heading: 'Limitation of Liability and Consequential Damages',
          text: `To the maximum extent permitted by applicable law, neither party shall be liable for indirect, special, punitive, or consequential damages. The aggregate liability of either party shall be strictly ${cap}.`,
          explanation: 'Protects both businesses from open-ended, catastrophic lawsuit damages.',
          category: 'Risk Management'
        },
        {
          id: 'sa4',
          number: '4.0',
          heading: 'Governing Law and Dispute Resolution',
          text: `This Agreement shall be governed by the laws of ${state}. Disputes shall be resolved through commercial arbitration.`,
          explanation: 'Defines jurisdiction and private arbitration forum.',
          category: 'Dispute'
        }
      ];
    }
  },
  {
    id: 'privacy-policy',
    title: 'Website Privacy Policy',
    category: 'Business',
    popular: false,
    estimatedTime: '3 mins',
    description: 'GDPR and CCPA compliant website and SaaS privacy disclosure detailing data collection, tracking cookies, user rights, and security policies.',
    keyClauses: [
      'Categories of Personal Data Collected',
      'Methods and Purposes of Processing',
      'Third-Party Disclosures & Analytics',
      'User Rights (GDPR/CCPA Access & Deletion)',
      'Data Security, Retention & Contact Info'
    ],
    defaultValues: {
      title: 'Website and Mobile App Privacy Policy',
      jurisdictionCountry: 'United States',
      jurisdictionState: 'California',
      effectiveDate: new Date().toISOString().split('T')[0],
      purpose: 'Compliance with global data privacy frameworks (CCPA/CPRA, GDPR) for online consumers.',
      partyA: {
        role: 'Data Controller / Operator',
        name: 'LegalEase Inc.',
        entityType: 'Corporation',
        address: '500 Technology Square, Cambridge, MA 02139',
        signatoryName: 'Privacy Compliance Office',
        signatoryTitle: 'Data Protection Officer',
        email: 'privacy@legalease-ai.com'
      },
      partyB: {
        role: 'Users & Visitors',
        name: 'Platform End Users & Consumers',
        entityType: 'General Public',
        address: 'Worldwide Access',
        signatoryName: 'End User Consumer',
        signatoryTitle: 'Individual',
        email: 'support@legalease-ai.com'
      },
      customTerms: {
        dataCategories: 'Identifiers (names, emails, IP addresses), technical telemetry, and document generation inputs',
        retentionPeriod: 'Encrypted document drafts retained for 90 days unless deleted by user',
        contactEmail: 'privacy@legalease-ai.com'
      }
    },
    generateClauses: (formData) => {
      const contact = formData.customTerms?.contactEmail || 'privacy@domain.com';
      const categories = formData.customTerms?.dataCategories || 'Contact information and technical logs';

      return [
        {
          id: 'pp1',
          number: '1.0',
          heading: 'Information We Collect and Process',
          text: `We collect information you provide directly when creating documents or registering accounts, including ${categories}. We also automatically collect device diagnostics, browser telemetry, and anonymized access logs to maintain platform stability.`,
          explanation: 'Informs visitors what personal data you collect and how it is gathered.',
          category: 'Collection'
        },
        {
          id: 'pp2',
          number: '2.0',
          heading: 'Purpose of Processing and Non-Sale of Personal Data',
          text: `We use your data solely to generate requested document drafts, authenticate your sessions, and enhance software reliability. We do not sell, rent, or trade your personal information or document drafts to data brokers or third-party advertisers.`,
          explanation: 'Assures users their private contracts and information are never sold to advertisers.',
          category: 'Usage'
        },
        {
          id: 'pp3',
          number: '3.0',
          heading: 'Your Privacy Rights (Access, Correction, and Deletion)',
          text: `Subject to local laws (including GDPR and CCPA), you possess the right to request access to, rectification of, or permanent deletion of your stored document drafts and personal data. Inquiries can be submitted directly to our Data Protection Officer at ${contact}.`,
          explanation: 'Details how users can exercise their legal right to delete their personal records.',
          category: 'Rights'
        }
      ];
    }
  }
];

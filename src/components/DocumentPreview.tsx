import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  Edit3, 
  Check, 
  ShieldAlert, 
  FileText, 
  Copy, 
  FileDown,
  Scale
} from 'lucide-react';
import { LegalDocument } from '../types/document';
import { exportDocumentAsDocx } from '../utils/storage';

interface DocumentPreviewProps {
  document: LegalDocument;
  onEdit: () => void;
  onBack: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document: doc,
  onEdit,
  onBack
}) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [watermark, setWatermark] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // Shows jurisdiction compliance warning before final print/PDF capture
    setShowWarningModal(true);
  };

  const confirmPdfExport = () => {
    setShowWarningModal(false);
    showToast('Preparing print-to-PDF export...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleDownloadDocx = () => {
    exportDocumentAsDocx(doc);
    showToast('Downloaded text document draft (.txt)');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Draft link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 flex flex-col">
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="no-print sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{doc.title}</span>
                <span className="text-[10px] font-mono uppercase bg-teal-900/60 text-teal-300 border border-teal-700/60 px-1.5 py-0.5 rounded">
                  A4 Formal Specimen
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Governing Jurisdiction: {doc.jurisdictionState}, {doc.jurisdictionCountry} · Effective: {doc.effectiveDate}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-300 mr-2 cursor-pointer">
              <input
                type="checkbox"
                checked={watermark}
                onChange={(e) => setWatermark(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 bg-slate-800 border-slate-700"
              />
              <span>Watermark</span>
            </label>

            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Document</span>
            </button>

            <button
              onClick={handleDownloadDocx}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download DOCX / Text</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 py-8 px-4 sm:px-6 flex justify-center items-start overflow-y-auto">
        
        {/* Realistic A4 Document Paper Sheet */}
        <div className="paper-sheet relative p-10 sm:p-16 text-slate-900 font-legal text-[13px] sm:text-[14px] leading-relaxed select-text">
          
          {/* Subtle Watermark Stamp */}
          {watermark && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-5 select-none">
              <span className="text-7xl font-sans font-black tracking-widest uppercase -rotate-45 text-slate-900">
                LEGAL DRAFT
              </span>
            </div>
          )}

          {/* Document Header */}
          <div className="text-center pb-6 border-b border-slate-300 space-y-1">
            <h1 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-slate-950 uppercase">
              {doc.title}
            </h1>
            <p className="font-sans text-xs text-slate-600 font-medium">
              GOVERNING JURISDICTION: {doc.jurisdictionState.toUpperCase()}, {doc.jurisdictionCountry.toUpperCase()}
            </p>
            <p className="font-mono text-xs text-slate-500 pt-1">
              EFFECTIVE DATE: {doc.effectiveDate}
            </p>
          </div>

          {/* Preamble */}
          <div className="mt-8 space-y-4">
            <p>
              This <strong>{doc.title}</strong> (the "Agreement") is entered into and made effective as of{' '}
              <strong>{doc.effectiveDate}</strong> (the "Effective Date"), by and between:
            </p>

            {/* Parties definition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-4 border-l-2 border-slate-300 text-xs sm:text-sm">
              <div>
                <p className="font-sans font-bold text-slate-900 uppercase">
                  {doc.partyA.role}:
                </p>
                <p className="font-semibold text-slate-800">{doc.partyA.name}</p>
                <p className="text-slate-600 text-xs">Entity Type: {doc.partyA.entityType}</p>
                <p className="text-slate-600 text-xs mt-0.5">{doc.partyA.address}</p>
              </div>

              <div>
                <p className="font-sans font-bold text-slate-900 uppercase">
                  {doc.partyB.role}:
                </p>
                <p className="font-semibold text-slate-800">{doc.partyB.name}</p>
                <p className="text-slate-600 text-xs">Entity Type: {doc.partyB.entityType}</p>
                <p className="text-slate-600 text-xs mt-0.5">{doc.partyB.address}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic">
              Party A and Party B may collectively be referred to herein as the "Parties," or individually as a "Party."
            </p>
          </div>

          {/* Recitals */}
          <div className="mt-6 space-y-2">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700">
              RECITALS
            </h3>
            <p>
              <strong>WHEREAS,</strong> the Parties desire to engage in commercial discussions and evaluate potential business arrangements relating to: {doc.purpose}; and
            </p>
            <p>
              <strong>WHEREAS,</strong> in connection therewith, the Parties may exchange sensitive, proprietary, and confidential business, technical, or financial information under the covenants herein set forth;
            </p>
            <p>
              <strong>NOW, THEREFORE,</strong> in consideration of the mutual covenants contained herein and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:
            </p>
          </div>

          {/* Numbered Legal Clauses */}
          <div className="mt-8 space-y-6">
            {doc.clauses.map((clause) => (
              <div key={clause.id} className="space-y-1.5">
                <h2 className="font-sans font-bold text-sm text-slate-900 uppercase tracking-wide">
                  {clause.number} {clause.heading}
                </h2>
                <p className="text-justify leading-relaxed text-slate-800">
                  {clause.text}
                </p>
              </div>
            ))}
          </div>

          {/* Execution & Signature Section */}
          <div className="mt-12 pt-8 border-t-2 border-slate-300 space-y-6 page-break-inside-avoid">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-600">
              IN WITNESS WHEREOF, the Parties have executed this {doc.title} by their duly authorized representatives as of the Effective Date.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
              {/* Party A Signature Box */}
              <div className="space-y-4">
                <p className="font-sans font-bold text-xs uppercase text-slate-900">
                  FOR AND ON BEHALF OF:
                </p>
                <p className="font-semibold text-sm text-slate-900">{doc.partyA.name}</p>
                
                <div className="pt-8 border-b border-slate-800">
                  <span className="font-sans text-[11px] text-slate-400">Authorized Signature</span>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong className="font-sans">Name:</strong> {doc.partyA.signatoryName}</p>
                  <p><strong className="font-sans">Title:</strong> {doc.partyA.signatoryTitle}</p>
                  <p><strong className="font-sans">Date:</strong> ____________________________</p>
                </div>
              </div>

              {/* Party B Signature Box */}
              <div className="space-y-4">
                <p className="font-sans font-bold text-xs uppercase text-slate-900">
                  FOR AND ON BEHALF OF:
                </p>
                <p className="font-semibold text-sm text-slate-900">{doc.partyB.name}</p>
                
                <div className="pt-8 border-b border-slate-800">
                  <span className="font-sans text-[11px] text-slate-400">Authorized Signature</span>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong className="font-sans">Name:</strong> {doc.partyB.signatoryName}</p>
                  <p><strong className="font-sans">Title:</strong> {doc.partyB.signatoryTitle}</p>
                  <p><strong className="font-sans">Date:</strong> ____________________________</p>
                </div>
              </div>
            </div>

            {/* Formal Notary / Witness Section */}
            <div className="mt-8 pt-6 border-t border-dashed border-slate-300 text-xs text-slate-600 space-y-2">
              <p className="font-sans font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                Notarial / Attestation Jurat (Optional for Recordation)
              </p>
              <p>
                State of {doc.jurisdictionState}, County / Municipality of ____________________________. Subscribed and sworn to before me this _____ day of __________________, 20____, by _____________________________________, who proved to me on satisfactory evidence to be the person who appeared before me.
              </p>
              <div className="flex justify-between pt-4 font-sans text-[11px] text-slate-500">
                <span>Notary Public Signature & Official Stamp: ____________________________</span>
                <span>Commission Expiration: ______________</span>
              </div>
            </div>

            {/* Document Footer & Page Number */}
            <div className="pt-10 flex items-center justify-between text-[11px] font-sans text-slate-400 border-t border-slate-200">
              <span>LegalEase AI Document Generator Specimen</span>
              <span>Page 1 of 1</span>
              <span>Ref: {doc.id}</span>
            </div>

          </div>

        </div>
      </div>

      {/* Jurisdiction Compliance Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Important Pre-Download Jurisdiction Notice
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Draft configured for: <strong className="text-slate-800 dark:text-slate-200">{doc.jurisdictionState}, {doc.jurisdictionCountry}</strong>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              <p>
                Before finalizing and executing this document, please note:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
                <li>Legal requirements and enforceability standards vary by state, province, and nation.</li>
                <li>Certain covenants (such as non-competes, liquidated damages, and tenant notice rights) may require specific statutory phrasing in your jurisdiction.</li>
                <li>LegalEase is an AI drafting tool and does not replace qualified counsel.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Go Back & Review
              </button>
              <button
                onClick={confirmPdfExport}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
              >
                Proceed to Export PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 shadow-xl rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

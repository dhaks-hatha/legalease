import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { TemplateSelection } from './components/TemplateSelection';
import { DocumentWizard } from './components/DocumentWizard';
import { GenerationLoader } from './components/GenerationLoader';
import { DocumentEditor } from './components/DocumentEditor';
import { DocumentPreview } from './components/DocumentPreview';
import { MyDocuments } from './components/MyDocuments';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';

import { LegalDocument, DocumentTemplate } from './types/document';
import { DOCUMENT_TEMPLATES } from './data/templates';
import { 
  getStoredDocuments, 
  saveDocument, 
  deleteDocument, 
  duplicateDocument 
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Initialize stored documents on mount
  useEffect(() => {
    const loaded = getStoredDocuments();
    setDocuments(loaded);
  }, []);

  // Handle template selection
  const handleSelectTemplate = (templateId: string) => {
    const tpl = DOCUMENT_TEMPLATES.find((t) => t.id === templateId) || DOCUMENT_TEMPLATES[0];
    setSelectedTemplate(tpl);
    setCurrentView('wizard');
  };

  // Handle AI generation start
  const handleStartGeneration = (formData: any) => {
    if (!selectedTemplate) return;

    // Build the new document structure
    const generatedClauses = selectedTemplate.generateClauses(formData);
    const newDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      title: formData.title,
      templateId: selectedTemplate.id,
      category: selectedTemplate.category,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      jurisdictionCountry: formData.jurisdictionCountry,
      jurisdictionState: formData.jurisdictionState,
      effectiveDate: formData.effectiveDate,
      purpose: formData.purpose,
      partyA: formData.partyA,
      partyB: formData.partyB,
      customTerms: formData.customTerms,
      clauses: generatedClauses,
      watermarkEnabled: true
    };

    setActiveDocument(newDoc);
    setIsGenerating(true);
  };

  // When AI generation animation finishes
  const handleGenerationComplete = () => {
    setIsGenerating(false);
    if (activeDocument) {
      saveDocument(activeDocument);
      setDocuments(getStoredDocuments());
      setCurrentView('editor');
    }
  };

  // Save document from editor
  const handleSaveDocument = (updatedDoc: LegalDocument) => {
    saveDocument(updatedDoc);
    setActiveDocument(updatedDoc);
    setDocuments(getStoredDocuments());
  };

  // Duplicate document
  const handleDuplicate = (id: string) => {
    const copy = duplicateDocument(id);
    if (copy) {
      setDocuments(getStoredDocuments());
      setActiveDocument(copy);
      setCurrentView('editor');
    }
  };

  // Delete document
  const handleDelete = (id: string) => {
    const remaining = deleteDocument(id);
    setDocuments(remaining);
    if (activeDocument?.id === id) {
      setActiveDocument(null);
    }
  };

  // View routing
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'create') {
            setCurrentView('templates');
          } else {
            setCurrentView(view);
          }
        }}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartCreate={() => setCurrentView('dashboard')}
            onExploreTemplates={() => setCurrentView('templates')}
            onSelectTemplate={handleSelectTemplate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            documents={documents}
            onSelectTemplate={handleSelectTemplate}
            onOpenEditor={(doc) => {
              setActiveDocument(doc);
              setCurrentView('editor');
            }}
            onOpenPreview={(doc) => {
              setActiveDocument(doc);
              setCurrentView('preview');
            }}
            onDuplicateDocument={handleDuplicate}
            onDeleteDocument={handleDelete}
            onNavigateToTemplates={() => setCurrentView('templates')}
            onNavigateToAllDocuments={() => setCurrentView('my-documents')}
          />
        )}

        {currentView === 'templates' && (
          <TemplateSelection
            onSelectTemplate={handleSelectTemplate}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'wizard' && selectedTemplate && (
          <DocumentWizard
            template={selectedTemplate}
            onBack={() => setCurrentView('templates')}
            onGenerate={handleStartGeneration}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'editor' && activeDocument && (
          <DocumentEditor
            document={activeDocument}
            onSave={handleSaveDocument}
            onPreview={(doc) => {
              setActiveDocument(doc);
              setCurrentView('preview');
            }}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'preview' && activeDocument && (
          <DocumentPreview
            document={activeDocument}
            onEdit={() => setCurrentView('editor')}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'my-documents' && (
          <MyDocuments
            documents={documents}
            onOpenEditor={(doc) => {
              setActiveDocument(doc);
              setCurrentView('editor');
            }}
            onOpenPreview={(doc) => {
              setActiveDocument(doc);
              setCurrentView('preview');
            }}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onCreateNew={() => setCurrentView('templates')}
          />
        )}
      </main>

      {/* AI Generation Animation Modal */}
      {isGenerating && activeDocument && (
        <GenerationLoader
          documentTitle={activeDocument.title}
          jurisdiction={`${activeDocument.jurisdictionState}, ${activeDocument.jurisdictionCountry}`}
          onComplete={handleGenerationComplete}
        />
      )}

      {/* LegalEase Assistant Chat Drawer */}
      <AIAssistantDrawer
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onNavigateToTemplate={handleSelectTemplate}
      />
    </div>
  );
}

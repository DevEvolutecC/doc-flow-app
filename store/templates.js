import { create } from 'zustand';

export const useTemplateStore = create((set) => ({
  templates: [],
  
  // Create a new template
  createTemplate: (template) => set((state) => ({
    templates: [...state.templates, template],
  })),
  
  // Read all templates
  getTemplates: () => set((state) => state.templates),
  
  // Update a template by id
  updateTemplate: (id, updatedTemplate) => set((state) => ({
    templates: state.templates.map((template) =>
      template.id === id ? { ...template, ...updatedTemplate } : template
    ),
  })),
  
  // Delete a template by id
  deleteTemplate: (id) => set((state) => ({
    templates: state.templates.filter((template) => template.id !== id),
  })),
}));

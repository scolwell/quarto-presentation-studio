/**
 * state.js
 * Global application state
 */

let state = {
  templates: [],
  selectedSlides: [], // Array of template IDs in order
  currentPreviewId: null,
  filterLayout: '', // Filter by layout
  searchQuery: '', // Search text
};

export function getState() {
  return state;
}

export function setTemplates(templates) {
  state.templates = templates;
}

export function setSelectedSlides(slides) {
  state.selectedSlides = slides;
}

export function addSelectedSlide(templateId) {
  state.selectedSlides.push(templateId);
}

export function removeSelectedSlide(index) {
  state.selectedSlides.splice(index, 1);
}

export function moveSelectedSlideUp(index) {
  if (index > 0) {
    [state.selectedSlides[index - 1], state.selectedSlides[index]] = [
      state.selectedSlides[index],
      state.selectedSlides[index - 1],
    ];
  }
}

export function moveSelectedSlideDown(index) {
  if (index < state.selectedSlides.length - 1) {
    [state.selectedSlides[index], state.selectedSlides[index + 1]] = [
      state.selectedSlides[index + 1],
      state.selectedSlides[index],
    ];
  }
}

export function setCurrentPreviewId(templateId) {
  state.currentPreviewId = templateId;
}

export function setFilterLayout(layout) {
  state.filterLayout = layout;
}

export function setSearchQuery(query) {
  state.searchQuery = query;
}

export function getFilteredTemplates() {
  const { templates, filterLayout, searchQuery } = state;
  
  return templates.filter((t) => {
    // Filter by layout
    if (filterLayout && t.layout !== filterLayout) return false;

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.layout.toLowerCase().includes(q)
      );
    }

    return true;
  });
}

export function getTemplateById(id) {
  return state.templates.find((t) => t.id === id);
}

export function getUniqueLayers() {
  const layouts = new Set(state.templates.map((t) => t.layout));
  return Array.from(layouts).sort();
}

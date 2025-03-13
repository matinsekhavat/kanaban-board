import React from 'react';
import KanbanHeader from '@/components/kanban/KanbanHeader';
import KanbanMain from '../kanban/KanabanMain';

function KanbanPage() {
  return (
    <>
      {/* HEADER */}
      <KanbanHeader />
      {/* MAIN CONTENT */}
      <KanbanMain />
    </>
  );
}

export default KanbanPage;

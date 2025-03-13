function KanbanList() {
  return (
    <div className="grid grid-cols-2 space-x-3 md:grid-cols-3">
      <div className="min-h-64 bg-red-500">1</div>
      <div className="min-h-64 bg-blue-500">2</div>
      <div className="min-h-64 bg-green-500">3</div>
    </div>
  );
}

export default KanbanList;

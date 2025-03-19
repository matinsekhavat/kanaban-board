'use client';
import { ChevronsDown, ChevronsRight, ChevronsUp, Ellipsis, BookCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import { DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { Separator } from '../ui/separator';
import { KanbanTaskState, useKanbanTasks } from '@/stores/kanban-tasks/useKanbanTasks';
import { PriorityLevel } from '@/types/types';

// Function to filter tasks by priority
function filterTasksByPriority(
  data: KanbanTaskState[],
  priorityToFilter: PriorityLevel
): KanbanTaskState[] {
  return data
    .map((category) => {
      // Create a new category object with filtered tasks
      return {
        ...category,
        tasks: category.tasks.filter((task) => task.priority === priorityToFilter),
      };
    })
    .filter((category) => category.tasks.length > 0); // Remove categories with no matching tasks
}

function KanbanList() {
  const [isTaskOptionOpen, setIsTaskOptionOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTaskState['tasks'][0] | null>(null);
  const tasks = useKanbanTasks((state) => state.tasks);

  // Check if there are any tasks
  const hasNoTasks = tasks.every((category) => category.tasks.length === 0);

  return (
    <>
      {hasNoTasks ? (
        <EmptyKanbanList />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Low Priority Column */}
          <KanbanColumn
            title="Low Priority"
            data={filterTasksByPriority(tasks, 'low')}
            setIsTaskOptionOpen={setIsTaskOptionOpen}
            setSelectedTask={setSelectedTask}
          />

          {/* Medium Priority Column */}
          <KanbanColumn
            title="Medium Priority"
            data={filterTasksByPriority(tasks, 'mid')}
            setIsTaskOptionOpen={setIsTaskOptionOpen}
            setSelectedTask={setSelectedTask}
          />

          {/* High Priority Column */}
          <KanbanColumn
            title="High Priority"
            data={filterTasksByPriority(tasks, 'high')}
            setIsTaskOptionOpen={setIsTaskOptionOpen}
            setSelectedTask={setSelectedTask}
          />
        </div>
      )}

      {/* ========= Modals ========= */}
      <Dialog open={isTaskOptionOpen} onOpenChange={setIsTaskOptionOpen}>
        <DialogContent
          overlay="dim"
          onPointerDownOutside={(e) => e.preventDefault()}
          onKeyDown={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              {/* Task edit form would go here */}
              <p>Editing task: {selectedTask.title}</p>
              {/* Add form elements here */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function KanbanColumn({
  title,
  data,
  setIsTaskOptionOpen,
  setSelectedTask,
}: {
  title: string;
  data: KanbanTaskState[];
  setIsTaskOptionOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<KanbanTaskState['tasks'][0] | null>>;
}) {
  // Count total tasks across all categories in this column
  const totalTasks = data.reduce((count, category) => count + category.tasks.length, 0);

  if (data.length === 0) {
    return (
      <div className="min-h-64 space-y-4 rounded-xl border border-zinc-200 p-4 shadow-sm">
        <div className="text-secondary-foreground flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-200 p-3 dark:border-zinc-500 dark:bg-zinc-600">
          <span>{title}</span>
          <div className="bg-primary/80 text-primary-foreground flex h-5 w-auto min-w-5 items-center justify-center rounded-full px-1 text-sm">
            0
          </div>
        </div>
        <p className="text-center text-sm text-zinc-500">No tasks in this category</p>
      </div>
    );
  }

  return (
    <div className="min-h-64 space-y-4 rounded-xl border border-zinc-200 p-4 shadow-sm">
      <div className="text-secondary-foreground flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-200 p-3 dark:border-zinc-500 dark:bg-zinc-600">
        <span>{title}</span>
        <div className="bg-primary/80 text-primary-foreground flex h-5 w-auto min-w-5 items-center justify-center rounded-full px-1 text-sm">
          {totalTasks}
        </div>
      </div>

      <div className="space-y-3">
        {data.map((category) => (
          <div key={category.id}>
            {category.tasks.map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                handleOpenTaskModal={() => {
                  setSelectedTask(task);
                  setIsTaskOptionOpen(true);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyKanbanList() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-12">
      <div className="flex size-12 items-center justify-center rounded-full bg-zinc-200 p-2 dark:bg-zinc-600">
        <BookCheck className="text-zinc-600 dark:text-zinc-300" size={24} />
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No Tasks currently. Board is empty!
      </p>
    </div>
  );
}

function SingleTask({
  task,
  handleOpenTaskModal,
}: {
  task: KanbanTaskState['tasks'][0];
  handleOpenTaskModal: () => void;
}) {
  // Determine the appropriate badge based on priority
  const renderPriorityBadge = () => {
    switch (task.priority) {
      case 'low':
        return (
          <Badge
            variant="succuss"
            rounded="full"
            className="flex h-6 min-w-16 items-center justify-start gap-1 py-1"
          >
            <ChevronsDown />
            low
          </Badge>
        );
      case 'mid':
        return (
          <Badge
            variant="warning"
            rounded="full"
            className="flex h-6 min-w-16 items-center justify-start gap-1 py-1"
          >
            <ChevronsRight />
            mid
          </Badge>
        );
      case 'high':
        return (
          <Badge
            variant="error"
            rounded="full"
            className="flex h-6 min-w-16 items-center justify-start gap-1 py-1"
          >
            <ChevronsUp />
            high
          </Badge>
        );
      default:
        return (
          <Badge rounded="full" className="flex h-6 min-w-16 items-center justify-start gap-1 py-1">
            unknown
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-2">
        {renderPriorityBadge()}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus-visible:ring-0">
            <Button variant="icon" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleOpenTaskModal}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-md font-bold text-zinc-700 dark:text-zinc-200">{task.title}</p>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{task.description}</p>
      </div>
    </div>
  );
}

export default KanbanList;

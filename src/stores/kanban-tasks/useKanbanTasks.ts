import { PriorityLevel } from '@/types/types';
import { create } from 'zustand';

type TaskTitle = '1' | '2' | '3'; //1 = not started, 2 = in progress, 3 = completed

export interface KanbanTaskState {
  id: string;
  category: string;
  tasks: {
    id: string;
    priority: PriorityLevel;
    title: string;
    description: string;
    status: TaskTitle;
  }[];
}

export interface KanbanAllTasksState {
  tasks: KanbanTaskState[];
  addTask: (task: KanbanTaskState) => void;
}
const dataMock: KanbanTaskState[] = [
  {
    id: '1',
    category: 'muchat tasks',
    tasks: [
      {
        id: '1',
        priority: 'low',
        title: 'task 1',
        description: 'description 1',
        status: '1',
      },
    ],
  },
];
export const useKanbanTasks = create<KanbanAllTasksState>((set) => ({
  tasks: dataMock,
  addTask: (task: KanbanTaskState) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: task.id || '2',
          category: task.category || '',
          tasks: task.tasks.map((t) => ({
            id: t.id,
            priority: t.priority || 'low',
            title: t.title,
            description: t.description,
            status: t.status,
          })),
        },
      ],
    })),
}));

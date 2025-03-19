import { PriorityLevel } from '@/types/types';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

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
  removeTask: (categoryId: string, taskId: string) => void;
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
          id: task.id || uuidv4(),
          category: task.category || '',
          tasks: task.tasks.map((t) => ({
            id: t.id || uuidv4(),
            priority: t.priority || 'low',
            title: t.title,
            description: t.description,
            status: t.status,
          })),
        },
      ],
    })),
  removeTask: (categoryId: string, taskId: string) =>
    set((state) => {
      // Create a new array of categories with the specific task removed
      const updatedCategories = state.tasks.map((category) => {
        if (category.id === categoryId) {
          // Remove the specific task from this category
          return {
            ...category,
            tasks: category.tasks.filter((task) => task.id !== taskId),
          };
        }
        return category;
      });

      // Filter out any categories that now have no tasks
      const cleanedCategories = updatedCategories.filter((category) => category.tasks.length > 0);

      return { tasks: cleanedCategories };
    }),
}));

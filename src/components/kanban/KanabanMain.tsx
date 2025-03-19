'use client';
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  BookCheck,
  ChevronDownIcon,
  EditIcon,
  PlusIcon,
  Sparkles as SparklesIcons,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useUpdateSearchParam } from '@/hooks/use-searchParams';
import { SORT_CONSTANTS } from '@/lib/constants';
import { SortOption } from '@/types/types';
import { cn } from '@/lib/utils';
import KanbanList from './KanbanList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ComboboxDemo } from '../ui/Combobox';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTaskSchema, type addTaskSchemaType } from '@/types/scehma';
import { useKanbanTasks } from '@/stores/kanban-tasks/useKanbanTasks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { v4 as uuidv4 } from 'uuid';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const findSortOption = (value: string): SortOption => {
  return (
    SORT_CONSTANTS.OPTIONS.find((option) => option.value === value) ||
    SORT_CONSTANTS.OPTIONS.find((option) => option.value === SORT_CONSTANTS.DEFAULT_SORT) ||
    SORT_CONSTANTS.OPTIONS[0]
  );
};

function KanbanMain() {
  const { OPTIONS, DEFAULT_SORT } = SORT_CONSTANTS;
  const { getSearchParam, updateSearchParam } = useUpdateSearchParam();
  const [sortBy, setSortBy] = useState(() => getSearchParam('sort') || DEFAULT_SORT);
  const [isAddCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const { label } = findSortOption(sortBy);
  const methods = useForm<addTaskSchemaType>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
      project: '',
    },
  });

  const addTask = useKanbanTasks((state) => state.addTask);
  const tasks = useKanbanTasks((state) => state.tasks);
  console.log(tasks);
  // const selectedCategoryId = useKanbanTasks((state) => state.selectedCategoryId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryAction, setSelectedCategoryAction] = useState<'edit' | 'delete' | null>(
    null
  );

  const handleDeleteCategory = useKanbanTasks((state) => state.removeCategory);

  const handleSortOptionClick = useCallback(
    (option: SortOption) => {
      const value = option.value;
      if (value !== sortBy) {
        setSortBy(value);
        updateSearchParam('sort', value);
      }
    },
    [sortBy, setSortBy, updateSearchParam]
  );
  const [isAddTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  function onSubmit(value: unknown) {
    const { title, description, priority, project } = value as addTaskSchemaType;

    addTask({
      id: uuidv4(),
      category: project,
      tasks: [{ id: uuidv4(), priority, title, description, status: '1' }],
    });
    setIsTaskModalOpen(false);
    methods.reset();
  }

  const confirmDeleteCategory = () => {
    if (selectedCategoryId) {
      handleDeleteCategory(selectedCategoryId);
      setSelectedCategoryId(null);
      setSelectedCategoryAction(null);
    }
  };

  return (
    <>
      <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_350px]">
        {/* left */}
        <div className="order-2 md:order-1">
          {/* HEADER */}
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between">
              {/* HEADER > LEFT */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold sm:text-2xl">Projects</span>
                <Button
                  variant={'ghost'}
                  className="size-max cursor-pointer"
                  onClick={() => {
                    setIsCategoryModalOpen(true);
                  }}
                >
                  <SparklesIcons className="size-4 text-yellow-500" />
                </Button>
              </div>
              {/* HEADER > RIGHT */}
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by</span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="min-w-[100px] justify-between focus-visible:ring-0"
                  >
                    <Button size={'sm'}>
                      {label}
                      <ChevronDownIcon
                        className={cn('ml-1 size-4 transition-transform duration-200')}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={4} className="w-[140px] p-1">
                    {OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSortOptionClick(option)}
                        className={cn('my-1 text-xs transition-colors duration-150 sm:text-sm', {
                          'bg-primary text-primary-foreground': option.value === sortBy,
                        })}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size={'sm'} onClick={() => setIsTaskModalOpen(true)}>
                  Add Task
                  <PlusIcon className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <KanbanList />
            </CardContent>
          </Card>
        </div>
        {/* right */}
        <div className="order-1 md:order-2">
          {/* HEADER */}
          <Card className="">
            <CardHeader>
              <CardTitle>empty</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
      {/* ========== Modal ========== */}
      {/* ========== Add Task Modal ========== */}
      <Dialog open={isAddTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent
          className="!max-h-[90vh] !w-[90%] !max-w-[750px] p-0"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          overlay="dim"
        >
          <DialogHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-min items-center justify-center rounded-full bg-zinc-200 p-2 dark:bg-zinc-600">
                <BookCheck className="text-zinc-600" />
              </div>
              <DialogTitle>Add Task</DialogTitle>
            </div>
            <DialogDescription>Fill in the form below to create or modify a task</DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="px-4">
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={methods.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Task name" {...field} />
                        </FormControl>
                        <FormMessage className="mt-2 text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Task description" {...field} />
                        </FormControl>

                        <FormMessage className="mt-2" />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <FormLabel>Project</FormLabel>
                    <ComboboxDemo
                      handleChange={(value) => {
                        methods.setValue('project', value);
                      }}
                      options={tasks.map((task) => ({
                        value: task.category,
                        label: task.category,
                      }))}
                      placeholder="Select a project"
                      className="w-full"
                    />
                    <FormMessage>{methods.formState.errors.project?.message}</FormMessage>
                  </div>

                  <FormField
                    control={methods.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a priority" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="mid">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>

          <Separator />
          <DialogFooter className="p-4">
            <Button
              variant={'outline'}
              onClick={() => {
                setIsTaskModalOpen(false);
                methods.reset();
              }}
            >
              Close
            </Button>
            <Button
              onClick={async () => {
                methods.handleSubmit(onSubmit)();
                await new Promise((resolve) => {
                  setTimeout(resolve, 2000);
                });

                // setIsTaskModalOpen(false);
                // methods.reset();
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* ========== Add Category Modal ==========     */}
      <Dialog open={isAddCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent
          onPointerDownOutside={(e) => {
            e.preventDefault();
            setIsCategoryModalOpen(false);
            setSelectedCategoryAction(null);
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            setIsCategoryModalOpen(false);
            setSelectedCategoryAction(null);
          }}
          overlay="dim"
        >
          <DialogHeader>
            <DialogTitle>All Projects</DialogTitle>
            <DialogDescription> List of all available projects</DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="flex min-h-[300px] flex-col">
            <div className="flex items-center justify-between gap-2">
              <Input placeholder="Project name" className="max-w-[200px]" />
              <Button>Add Project</Button>
            </div>
            {/* All Categories */}
            <div className="my-4 flex grow flex-col gap-4">
              {tasks.length === 0 ? (
                <div className="flex grow items-center justify-center gap-2">
                  <span className="text-sm text-gray-500">No projects found</span>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-gray-300 p-3"
                  >
                    {/* right side */}
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-green-200 dark:bg-green-600">
                        <SparklesIcons className="size-4 text-green-600" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{task.category}</span>
                        <span className="text-xs text-gray-500">{task.tasks.length} tasks</span>
                      </div>
                    </div>

                    {/* Left side */}
                    <div className="flex items-center gap-2">
                      {/* button edit */}
                      <Button
                        onClick={() => {
                          setSelectedCategoryId(task.id);
                          setSelectedCategoryAction('edit');
                        }}
                      >
                        <EditIcon className="size-4" />
                      </Button>
                      {/* button Danger */}
                      <Button
                        className="bg-red-500/70 hover:bg-red-500/80"
                        onClick={() => {
                          setSelectedCategoryId(task.id);
                          setSelectedCategoryAction('delete');
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {selectedCategoryId &&
              (selectedCategoryAction === 'edit' ? (
                <Dialog
                  open={!!selectedCategoryId}
                  onOpenChange={() => setSelectedCategoryId(null)}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                      <DialogDescription>
                        Edit the name of the project to update it
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : selectedCategoryAction === 'delete' ? (
                <Dialog
                  open={!!selectedCategoryId}
                  onOpenChange={() => {
                    setSelectedCategoryId(null);
                    setSelectedCategoryAction(null);
                  }}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Project</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this project? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:justify-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategoryId(null);
                          setSelectedCategoryAction(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={confirmDeleteCategory}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default KanbanMain;

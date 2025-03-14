import { ChevronsDown, Ellipsis } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import { DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { Separator } from '../ui/separator';

function KanbanList() {
  const [isTaskOptionOpen, setIsTaskOptionOpen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 space-x-3 lg:grid-cols-3">
        <div className="min-h-64 space-y-4 rounded-xl border border-zinc-200 p-4 shadow-sm">
          {/* TITLE */}
          <div className="text-secondary-foreground flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-200 p-3 dark:border-zinc-500 dark:bg-zinc-600">
            <span>yet to start</span>
            <div className="bg-primary/80 text-primary-foreground flex h-5 w-auto min-w-5 items-center justify-center rounded-full px-1 text-sm">
              2
            </div>
          </div>

          {/* taks single */}
          <SingleTask handleOpenTaskModal={setIsTaskOptionOpen} />
        </div>
        {/* <div className="min-h-64 rounded-xl border border-zinc-200 p-4 shadow-sm">2</div>
      <div className="min-h-64 rounded-xl border border-zinc-200 p-4 shadow-md">3</div> */}
      </div>

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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default KanbanList;

{
  /* <Badge
            variant="warning"
            rounded="full"
            className="flex min-w-16 items-center justify-start gap-1 py-1"
          >
            <ChevronsRight />
            mid
          </Badge>{' '}
          <Badge
            variant="error"
            rounded="full"
            className="flex min-w-16 items-center justify-start gap-1 py-1"
          >
            <ChevronsUp />
            high
          </Badge> */
}

// function EmptyKanbanList() {
//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       <div className="flex size-min items-center justify-center rounded-full bg-zinc-200 p-2 dark:bg-zinc-600">
//         <BookCheck className="text-zinc-600" />
//       </div>
//       <p className="text-sm text-zinc-600">No Tasks currently. Board is empty!</p>
//     </div>
//   );
// }

function SingleTask({
  handleOpenTaskModal,
}: {
  handleOpenTaskModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="flex justify-between gap-2">
        <Badge
          variant="succuss"
          rounded="full"
          className="flex h-6 min-w-16 items-center justify-start gap-1 py-1"
        >
          <ChevronsDown />
          low
        </Badge>{' '}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus-visible:ring-0">
            <Button variant="icon" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleOpenTaskModal}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-md font-bold text-zinc-700 dark:text-zinc-200">Task Name</p>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Task Description</p>
      </div>
    </div>
  );
}

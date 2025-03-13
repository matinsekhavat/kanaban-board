'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { Box, Moon, Plus, Search, Sun } from 'lucide-react';
import { Separator } from '../ui/separator';
import { AnimatePresence } from 'motion/react';
import RotateMotion from '../motion/RotateMotion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
function KanbanHeader() {
  const { theme, toggleTheme } = useTheme();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between gap-6">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-8 sm:gap-12">
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="iconPrimary" className="px-1 text-xs">
            <Box className="!size-4" />
          </Button>
          <p className="text-xs sm:text-sm">Kanban Board</p>
        </div>
        {/* Input */}
        <div className="ring-primary/80 flex w-auto items-center gap-1 rounded-lg ring-2 sm:w-full sm:max-w-[280px]">
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 p-1">
            <Search className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Search"
            variant="ghost"
            className="hidden h-8 w-full min-w-0 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:block"
          />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          <Button variant="icon" onClick={toggleTheme} className="s">
            {theme === 'light' ? (
              <RotateMotion key="sun">
                <Sun className="!size-4" />
              </RotateMotion>
            ) : (
              <RotateMotion key="moon">
                <Moon className="!size-4" />
              </RotateMotion>
            )}
          </Button>
        </AnimatePresence>

        <Separator orientation="vertical" className="!h-8" />
        {/* CREATE PROJECT BUTTON */}
        <div>
          <Button
            variant="icon"
            className="sm:hidden"
            onClick={() => setIsCreateProjectModalOpen(true)}
          >
            <Plus className="!size-4" />
          </Button>
          <Button
            variant="default"
            className="ml-1 hidden cursor-pointer px-1 text-xs sm:flex"
            onClick={() => setIsCreateProjectModalOpen(true)}
            rounded="icon"
          >
            <Plus className="!size-4" />
            <p>Create project</p>
          </Button>
        </div>

        {/* MODAL */}
        <Dialog
          defaultOpen
          open={isCreateProjectModalOpen}
          onOpenChange={(open) => setIsCreateProjectModalOpen(open)}
        >
          <DialogContent className="max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
            </DialogHeader>
            <DialogDescription className="overflow-y-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatum quae ut hic
              optio laudantium consectetur molestiae fugiat aliquid minus expedita dolorum illo!
              Officia asperiores tempore unde. Esse, nulla. Molestias inventore quisquam hic
              distinctio cumque saepe consequuntur! Odit? Cum pariatur est cumque enim esse voluptas
              deleniti ut maiores natus. Iusto numquam, quos ex tenetur dolorem nihil blanditiis
              magnam explicabo quae sequi necessitatibus odio corporis voluptatem, recusandae
              reiciendis voluptates! Magnam nihil suscipit, ducimus cumque at tenetur beatae
              pariatur quod qui inventore minus quas laborum, sapiente sed est quisquam soluta,
              molestiae labore tempora facilis voluptatibus recusandae excepturi incidunt. Deserunt,
              p tenetur optio? Labore quae ullam at. Quaerat quasi quod assumenda optio eveniet!
              Illo provident nostrum, adipisci ratione nesciunt doloribus temporibus aliquid
              numquam, asperiores voluptas iste minima dolorum. Debitis fugit provident, inventore
              ullam fuga ratione, deleniti id possimus quae maiores reiciendis dignissimos expedita
              nulla ab explicabo neque cumque? At, necessitatibus error. Quos similique, nobis
              repudiandae numquam provident laboriosam. Ab ipsam, commodi, rem ratione, eveniet
              veritatis mollitia asperiores laudantium doloremque nobis at autem accusantium!
              Praesentium beatae commodi, possimus blanditiis ab rem deleniti temporibus soluta
              omnis in distinctio cumque saepe consequuntur! Odit? Cum pariatur est cumque enim esse
              voluptas deleniti ut maiores natus. Iusto numquam, quos ex tenetur dolorem nihil
              blanditiis magnam explicabo quae sequi necessitatibus odio corporis voluptatem,
              recusandae reiciendis voluptates! Magnam nihil suscipit, ducimus cumque at tenetur
              beatae pariatur quod qui inventore minus quas laborum, sapiente sed est quisquam
              soluta, molestiae labore tempora facilis voluptatibus recusandae excepturi incidunt.
              Deserunt, p tenetur optio? Labore quae ullam at. Quaerat quasi quod assumenda optio
              eveniet! Illo provident nostrum, adipisci ratione nesciunt doloribus temporibus
              aliquid numquam, asperiores voluptas iste minima dolorum. Debitis fugit provident,
              inventore ullam fuga ratione, deleniti id possimus quae maiores reiciendis dignissimos
              expedita nulla ab explicabo neque cumque? At, necessitatibus error. Quos similique,
              nobis repudiandae numquam provident laboriosam. Ab ipsam, commodi, rem ratione,
              eveniet veritatis mollitia asperiores laudantium doloremque nobis at autem
              accusantium! Praesentium beatae commodi, possimus blanditiis ab rem deleniti
              temporibus soluta omnis in! Illo provident nostrum, adipisci ratione nesciunt
              doloribus temporibus aliquid numquam, asperiores voluptas iste minima dolorum. Debitis
              fugit provident, inventore ullam fuga ratione, deleniti id possimus quae maiores
              reiciendis dignissimos expedita nulla ab explicabo neque cumque? At, necessitatibus
              error. Quos similique, nobis repudiandae numquam provident laboriosam. Ab ipsam,
              commodi, rem ratione, eveniet veritatis mollitia asperiores laudantium doloremque
              nobis at autem accusantium! Praesentium beatae commodi, possimus blanditiis ab rem
              deleniti temporibus soluta omnis in
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default KanbanHeader;

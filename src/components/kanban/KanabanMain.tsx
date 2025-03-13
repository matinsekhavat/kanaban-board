'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronDownIcon, Sparkles as SparklesIcon } from 'lucide-react';
import { DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenu } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useUpdateSearchParam } from '@/hooks/use-searchParams';
import { SORT_CONSTANTS } from '@/lib/constants';
import { SortOption } from '@/types/types';

const findSortOption = (value: string): SortOption => {
  return (
    SORT_CONSTANTS.OPTIONS.find((option) => option.value === value) ||
    SORT_CONSTANTS.OPTIONS.find((option) => option.value === SORT_CONSTANTS.DEFAULT_SORT) ||
    SORT_CONSTANTS.OPTIONS[0]
  );
};

function KanbanMain() {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const { OPTIONS, DEFAULT_SORT } = SORT_CONSTANTS;

  const { getSearchParam, updateSearchParam } = useUpdateSearchParam();
  const [sortBy, setSortBy] = useState(() => getSearchParam('sort') || DEFAULT_SORT);
  const { label } = findSortOption(sortBy);

  return (
    // flex-1
    <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_350px]">
      {/* left */}
      <div className="order-2 md:order-1">
        {/* HEADER */}
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between">
            {/* HEADER > LEFT */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold sm:text-2xl">Projects</span>
              <SparklesIcon className="size-4 text-yellow-500" />
            </div>
            {/* HEADER > RIGHT */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by</span>
              <DropdownMenu open={isSortDropdownOpen} onOpenChange={setIsSortDropdownOpen}>
                <DropdownMenuTrigger
                  asChild
                  className="min-w-[100px] justify-between focus-visible:ring-0"
                >
                  <Button size={'sm'}>
                    {label}
                    <ChevronDownIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        updateSearchParam('sort', option.value);
                      }}
                    >
                      <span className="text-xs sm:text-sm">{option.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
        </Card>
        {/* TASKS */}
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
  );
}

export default KanbanMain;

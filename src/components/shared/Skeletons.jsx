import React from 'react'
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'




export const FirmCardSkeleton = () => {
    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 shadow-lg">
            <Skeleton className="aspect-video w-full rounded-none" />

            <CardHeader className="flex-1 space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </CardHeader>

            <CardFooter className="mt-auto flex gap-2">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-20" />
            </CardFooter>
        </Card>
    )
}





export const FirmCardsSkeleton = () => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
            {Array.from({ length: 8 }).map((_, index) => (
                <FirmCardSkeleton key={index} />
            ))}
        </div>
    )
}





export function TableSkeleton() {
  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="hidden h-8 w-20 lg:block" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-dashed">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 7 }).map((_, idx) => (
                <TableHead key={idx}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: 7 }).map((_, cellIdx) => (
                  <TableCell key={cellIdx}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-17.5" />
          </div>
          <Skeleton className="h-4 w-28" />
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden size-8 lg:block" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="hidden size-8 lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}


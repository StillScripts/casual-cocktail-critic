import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const RecipesTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>
        <Skeleton className="h-4 w-24" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">
            <Skeleton className="h-4 w-10" />
          </TableHead>
          <TableHead className="hidden sm:inline-block">
            <Skeleton className="h-4 w-14" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-12" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4].map((recipe) => (
          <TableRow key={recipe}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell className="hidden truncate sm:block">
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell className="hidden sm:block"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

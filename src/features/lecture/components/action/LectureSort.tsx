import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LectureSortParams = "name" | "createdAt";
export type LectureOrderParams = "asc" | "desc";

type LectureSortProps = {
  currentSort?: string;
  currentOrder?: string;
  onSortChange: (sort: LectureSortParams) => void;
  onOrderChange: (order: LectureOrderParams) => void;
};

export const LectureSort = ({
  currentSort = "createdAt",
  currentOrder = "desc",
  onSortChange,
  onOrderChange,
}: LectureSortProps) => {
  return (
    <div className="flex gap-2">
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentOrder} onValueChange={onOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort Order" />
        </SelectTrigger>
        {currentSort === "name" && <SelectSortText />}
        {currentSort === "createdAt" && <SelectSortDate />}
      </Select>
    </div>
  );
};

export const SelectSortText = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(A - Z)</SelectItem>
      <SelectItem value="desc">(Z - A)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortNumber = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(0 - 9)</SelectItem>
      <SelectItem value="desc">(9 - 0)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortDate = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(Old - New)</SelectItem>
      <SelectItem value="desc">(New - Old)</SelectItem>
    </SelectContent>
  );
};

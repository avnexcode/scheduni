import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteLectureDialog } from "../components/action";
import { LectureTableBodySkeleton } from "../components/skeleton";
import type { LectureData } from "../types";
import { type Gender } from "@prisma/client";

type LectureTableProps = {
  lectures?: LectureData[];
  isLecturesLoading: boolean;
};

export const LectureTable = ({
  lectures,
  isLecturesLoading,
}: LectureTableProps) => {
  const displayGender = (gender: Gender) =>
    gender === "MALE" ? "Mr." : "Mrs.";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[300px]">Major</TableHead>
          <TableHead className="w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      {isLecturesLoading && <LectureTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: lectures,
          keyExtractor: (lecture) => lecture.id,
          render: (lecture, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">
                {displayGender(lecture.gender)} {lecture.name}
              </TableCell>
              <TableCell className="capitalize">{lecture.major.name}</TableCell>
              <TableCell className="space-x-2 text-nowrap">
                <Link href={`/dashboard/lecture/${lecture.id}/edit`}>
                  <Button size={"sm"} variant={"outline"}>
                    <SquarePen />
                  </Button>
                </Link>
                <DeleteLectureDialog lectureId={lecture.id} />
              </TableCell>
            </TableRow>
          ),
          isLoading: isLecturesLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                There is no lectures data
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};

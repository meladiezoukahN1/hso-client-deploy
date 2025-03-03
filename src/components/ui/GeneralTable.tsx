import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface GeneralTableProps<T> {
  columns: { header: string; accessor: keyof T | string }[];
  data: T[];
  renderCell?: (item: T, column: string) => React.ReactNode;

  classNameTH?: string;
}

const GeneralTable = <T,>({
  columns,
  data,
  renderCell,

  classNameTH,
}: GeneralTableProps<T>) => {
  return (
    <Table className="rounded-lg overflow-hidden shadow-lg border-collapse h-20">
      <TableHeader className="bg-blue-900">
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className="text-center font-bold text-white">
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={data.length || columns.length} align="center">
              لا توجد بيانات لعرضها
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`text-center border-t-5 border-white ${classNameTH}`}
                >
                  {renderCell
                    ? renderCell(row, col.accessor as string)
                    : (row[col.accessor as keyof T] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default GeneralTable;

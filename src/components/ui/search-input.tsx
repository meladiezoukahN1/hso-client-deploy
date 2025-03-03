"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getStudent } from "@/lib/fetsures/students/action";
import { Students } from "student";

export default function SearchInput() {
  const dispath = useAppDispatch();
  const { student } = useAppSelector((state) => state.student);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Students[]>([]);

  useEffect(() => {
    dispath(getStudent());
  }, [dispath]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const filtered = student.filter(
      (item: Students) =>
        (item.full_name.toLowerCase().includes(trimmed.toLowerCase()) ||
          item.faculty_name.toLowerCase().includes(trimmed.toLowerCase()) ||
          item.fileNo
            .toString()
            .toLowerCase()
            .includes(trimmed.toLowerCase())) &&
        item.status === "Active"
    );
    setResults(filtered);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-96 mx-auto relative">
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-gray-500">
          <Search className="h-4 w-4" />
        </span>
        <Input
          type="text"
          placeholder="بحث عن طالب..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          className="pr-4 h-8 rounded-2xl m-auto focus:outline-none focus:ring-0  border-primary-400"
        />
      </form>

      {results.length > 0 && (
        <ul className="absolute w-full overflow-scroll max-h-52 left-0 mt-1 py-1 bg-white border border-muted rounded-md shadow z-10">
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setResults([]);
              }}
              className="px-1 py-1 text-xs hover:bg-gray-100"
            >
              <div className="flex flex-wrap justify-between text-right pr-2">
                <span className="font-semibold w-1/6">{item.fileNo}</span>
                <span className="font-semibold w-3/6">{item.full_name}</span>
                <span className="font-semibold w-2/6">{item.faculty_name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

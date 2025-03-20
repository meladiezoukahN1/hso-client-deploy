"use client";

import React, { useState, useEffect } from "react";
import { Modal, TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getStudent } from "@/lib/fetsures/students/action";
import { Students } from "student";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.student);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Students[]>([]);

  useEffect(() => {
    dispatch(getStudent());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const filtered = student.filter(
      (item: Students) =>
        item.full_name.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.faculty_name.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.fileNo.toString().toLowerCase().includes(trimmed.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpenModal(true)}
        className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer"
      >
        <IoSearch className="h-6 w-6 text-white font-bold" />
      </button>

      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="2xl"
        
      >
        <div className="p-6 border-b border-ld rounded-t-3xl">
          <TextInput
            sizing="md"
            placeholder="بحث عن طالب..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            required
          />
        </div>
        <Modal.Body className="rounded-lg">
          <SimpleBar className="max-h-72 overflow-auto">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/students/studentsTable/${item.fileNo}`}
                  >
                    <li
                      onClick={() => {
                        setOpenModal(false);
                        setResults([]);
                        setSearchTerm("");
                      }}
                      className="px-2 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className="flex flex-wrap justify-between text-right">
                        <span className="font-semibold">{item.fileNo}</span>
                        <span className="font-semibold">{item.full_name}</span>
                        <span className="font-semibold">
                          {item.faculty_name}
                        </span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">لا توجد نتائج</p>
            )}
          </SimpleBar>
        </Modal.Body>
      </Modal>
    </div>
  );
}

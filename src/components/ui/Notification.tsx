"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { Notafaction } from "@/lib/fetsures/students/action";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { NotificationIcon } from "./NotificationIcon";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { notifications, loading } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(Notafaction());
  }, [dispatch]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center">
        <div className="relative inline-flex">
          <button
            className="rounded-full p-2 hover:bg-gray-100/30 transition-all duration-300 text-white active:opacity-80 disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={toggleNotifications}
            aria-label="إظهار الإشعارات"
          >
            <NotificationIcon className="p-0 m-0 " size={26} />
          </button>
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center h-5 w-5 translate-x-1/4 -translate-y-1/4 rounded-full bg-secondary-500 text-xs text-white font-bold shadow-md">
              {notifications.length > 99 ? "99+" : notifications.length}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 flex items-center justify-end sm:bg-transparent sm:block sm:inset-auto sm:absolute left-[10px] sm:left-0 mt-[240px] sm:mt-2"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div
            className="bg-white w-[80%] max-w-md max-h-[50vh] sm:max-h-[100vh] sm:w-[400px] rounded-lg shadow-xl overflow-hidden mx-4 sm:mx-0 mr-auto ml-0 sm:mr-0"
            style={{ direction: "rtl" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10">
              <h4 className="text-lg font-bold m-0 text-white bg-gradient-to-b from-[#F5E8C7] to-[#DBB459] p-3 flex items-center justify-between">
                <span>الإشعارات</span>
                {notifications.length > 0 && (
                  <span className="bg-white/20 text-white text-xs py-1 px-2 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </h4>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-60px)] sm:max-h-[calc(80vh-60px)]">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-[#DBB459] rounded-full animate-spin"></div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.toReversed().map((not, index) => (
                    <Link
                      key={index}
                      href={`${
                        not.type === "طلب"
                          ? "/students/requests/" + not.pendingRequest_id
                          : "/students/studentsTable/" + not.pendingRequest_id
                      }`}
                      className="block"
                    >
                      <div
                        className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
                          not.status === 1
                            ? "bg-[#F5E8C7]/10 border-r-4 border-[#DBB459]"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* <div className="shrink-0">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-b from-[#F5E8C7] to-[#DBB459] text-white text-sm font-bold">
                              {index + 1}
                            </span>
                          </div> */}

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start w-full">
                              <div className="pr-2 flex-1">
                                <p className="text-sm font-medium text-gray-800 break-words">
                                  قدم {not.data}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {not.type === "طلب" ? "طلب جديد" : "إشعار"}
                                </p>
                              </div>

                              <div className="shrink-0 flex flex-col items-end mr-1">
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                  {not.read_at}
                                </span>
                                {not.status === 1 && (
                                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mt-2"></span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    لا توجد اشعارات لعرضها
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    ستظهر الإشعارات الجديدة هنا
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 text-center sticky bottom-0">
              <button
                className="w-full py-2 px-4 bg-gradient-to-b from-[#F5E8C7] to-[#DBB459] text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

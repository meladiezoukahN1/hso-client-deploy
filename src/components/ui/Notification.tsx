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
            className="rounded-md text-center text-sm text-white transition-all  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={toggleNotifications}
          >
            <NotificationIcon className="p-0 m-0" size={30} />
          </button>
          <span
            className={`absolute top-1 right-2 grid min-h-[12px] min-w-[12px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full ${
              notifications.length === 0 ? "hidden" : "bg-secondary-500"
            } py-1 px-1 text-xs text-secondary`}
          ></span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute  left-1/2 -translate-x-1/2 z-10 mt-3 w-96 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-200">
          <h4 className="text-lg font-bold mb-1 text-white bg-gradient-to-b from-[#F5E8C7] to-[#DBB459] rounded-t-lg p-2">
            الإشعارات
          </h4>

          <div className="divide-y divide-gray-200 max-h-96 overflow-auto ">
            <div className=" items-start gap-2 cursor-pointer">
              {loading ? (
                "isloading"
              ) : notifications.length !== 0 ? (
                notifications.map((not, index) => {
                  return (
                    <Link
                      key={index}
                      href={`${
                        not.type === "طلب"
                          ? "/students/requests/" + not.pendingRequest_id
                          : "/students/studentsTable/" + not.pendingRequest_id
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between p-2 hover:bg-primary ${
                          index + 1 !== notifications.length
                            ? "border-b-1 pb-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-800 font-semibold ml-2">
                              {index + 1}
                            </p>
                            <p className="text-xs text-gray-800 font-semibold ml-2">
                              قدم {not.data}
                            </p>
                          </div>
                          <p className="text-[9px] text-gray-500 ml-2">
                            {not.read_at}
                          </p>
                        </div>
                        {not.status === 1 ? (
                          <span className="mt-1 inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                        ) : null}
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-3">لا توجد اشعارات لعرضها</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

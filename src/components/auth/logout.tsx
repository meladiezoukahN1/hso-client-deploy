"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

const LogoutPage = ({ className }: { className?: string }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // Redirect to the homepage or a specific page after logout
    });
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Link
            href="#"
            className={`flex items-center gap-3 p-2  mx-4 rounded-lg transition duration-200 hover:text-primray-900 hover:bg-[#52462a] hover:text-white`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>تسجيل خروج</span>
          </Link>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-50 text-right shadow-lg rounded-lg border border-gray-200">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FaSignOutAlt className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-blue-800">
              تسجيل الخروج
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 text-center text-sm mt-2">
            عند تسجيل الخروج، سيتم إنهاء جلستك وستحتاج إلى تسجيل الدخول مرة أخرى
            للعودة.
          </DialogDescription>
          <DialogFooter className="flex flex-col sm:flex-row gap-4 mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSignOut} // Trigger signOut
                className="bg-yellow-500 hover:bg-yellow-600 text-white w-full"
              >
                تسجيل الخروج
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                البقاء في الحساب
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogoutPage;

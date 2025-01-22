'use client'
import {ReactNode} from "react";
import Icon from "@/app/components/shared/Icon";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalWrapper({isOpen, onClose, children}: ModalWrapperProps) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white w-1/2 min-h-80 rounded-lg shadow-lg relative overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <Icon iconName={'close'} className='text-blue-700 hover:text-blue-500' />
        </button>
        {/* Modal Content */}
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
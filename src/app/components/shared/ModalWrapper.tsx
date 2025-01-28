'use client'
import {ReactNode, useEffect, MouseEvent} from "react";
import Icon from "@/app/components/shared/Icon";
import {motion} from "framer-motion";
import {AnimatePresence} from "framer-motion";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalWrapper({isOpen, onClose, children}: ModalWrapperProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key={'modal-overlay'}
              onClick={onClose}
              className="fixed top-0 left-0 w-full h-full max-h-screen z-40 bg-black bg-opacity-50"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
            </motion.div>

            {/* Modal Content */}
            <motion.div
              key={'modal-content'}
              onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="fixed bottom-0 left-0 left-1-8 bg-white w-full min-h-80 z-50 rounded-lg shadow-lg overflow-auto md:w-3/4 md:bottom-4"
              initial={{y: "100%"}}
              animate={{y: "0%"}}
              exit={{y: "100%"}}
              transition={{duration: 0.2, ease: 'easeIn'}}
            >
              {/* Close Button */}
              <button onClick={onClose} className="absolute top-4 right-4">
                <Icon iconName={'close'} className='text-blue-700 hover:text-blue-500'/>
              </button>

              {/* Modal Content */}
              <div className="pt-8 md:pt-10 p-4 md:p-10 w-full">{children}</div>
            </motion.div>
          </>
        )}

        {!isOpen && null}
      </AnimatePresence>
    </>
  );
}
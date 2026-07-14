import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={onClose} />
          
          {/* Panel */}
          <div className="relative w-full max-w-lg transform rounded-xl bg-dark-800 border border-dark-600 p-6 shadow-2xl transition-all animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
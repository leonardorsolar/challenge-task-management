import React from 'react'
import { X, Trash2 } from 'lucide-react'

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, isDarkMode }) => {
  if (!isOpen) return null

  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className={`${bgCard} rounded-xl shadow-2xl w-full max-w-md p-6 border ${borderColor}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold ${textColor}`}>Confirmar Exclusão</h3>
          <button
            onClick={onClose}
            className="hover:scale-105 transition"
          >
            <X size={20} className={textColor} />
          </button>
        </div>
        <div className={`${textColor} text-base mb-6`}>
          Tem certeza que deseja excluir esta tarefa? Essa ação não poderá ser desfeita.
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 transition"
          >
            <Trash2 size={16} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal

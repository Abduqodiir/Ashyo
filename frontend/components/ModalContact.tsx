import type React from "react"
import Button from "./Button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalContact: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        {children}
        <Button type="submit" title="Yopish" onClick={onClose} extrClass="mt-4 w-full" />
      </div>
    </div>
  )
}

export default ModalContact


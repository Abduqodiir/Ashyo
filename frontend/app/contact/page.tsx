"use client"

import { useState } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import ModalContact from "@/components/ModalContact"
import Products from "@/components/Products"

const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Imitatsiya uchun
    setIsSubmitting(false)
    setShowModal(true)
    // Forma ma'lumotlarini tozalash
    setFormData(initialFormData)
  }

  return (
    <>
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Qayta aloqa</h1>
        <p className="text-lg text-gray-600">
          Bizning ishimiz haqidagi fikr mulohazalaringiz bilan bo'lishing yoki izohlar maydonida o'zingizni qiziqtirgan
          savolingizni yo'llang
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="text"
            name="firstName"
            placeholder="Ismingizni kiriting"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Familiyangizni kiriting"
            onChange={handleChange}
          />
        </div>

        <Input type="tel" name="phone" placeholder="+998 90 123 45 67" onChange={handleChange} value={formData.phone} />

        <Input
          type="email"
          name="email"
          placeholder="example@mail.com"
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="O'z fikirlaringizni qoldiring"
          onChange={handleChange}
          value={formData.message}
          className="focus:shadow focus:shadow-[#134E9B] duration-300 bg-[#EBEFF3] w-full outline-none py-[17px] px-[26px] rounded-[6px] text-[14px] min-h-[150px]"
        />

        <Button
          title={isSubmitting ? "Yuborilmoqda..." : "Xabar yuborish"}
          type="submit"
          extrClass="w-full"
          isLoading={isSubmitting}
        />
      </form>

      <ModalContact isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Rahmat!</h2>
        <p>Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.</p>
      </ModalContact>
    </div>
    <Products title="Most popular product" API='/product-items'/>
    </>
  )
}


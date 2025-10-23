'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageModal from './ImageModal'

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function ImageCarousel({ images, alt, className = "", size = 'large' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  // Clases CSS según el tamaño
  const sizeClasses = {
    small: 'max-w-md mx-auto max-h-80',
    medium: 'max-w-lg mx-auto max-h-80', 
    large: 'w-full max-h-96'
  }

  return (
    <div className={`relative ${className}`}>
      {/* Imagen principal */}
      <div 
        className={`relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] ${sizeClasses[size]} cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={images[currentIndex]}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          className="w-full h-auto object-contain"
        />
        
        {/* Overlay con controles */}
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-between p-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            disabled={images.length === 1}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            disabled={images.length === 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Indicadores */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      {images.length > 1 && (
        <div className="text-center mt-2 text-sm text-neutral-400">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Modal para imagen completa */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={images[currentIndex]}
        imageAlt={`${alt} - Imagen ${currentIndex + 1}`}
        images={images}
        currentIndex={currentIndex}
        onNext={images.length > 1 ? nextImage : undefined}
        onPrev={images.length > 1 ? prevImage : undefined}
      />
    </div>
  )
}

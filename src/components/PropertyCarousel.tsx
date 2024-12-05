import { useState } from 'react';
import { Property } from '../types/property';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { createSlideImage } from '../utils/canvas';

interface PropertyCarouselProps {
  property: Property;
}

export function PropertyCarousel({ property }: PropertyCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % property.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const exportSlides = async () => {
    setIsExporting(true);
    try {
      for (let i = 0; i < property.images.length; i++) {
        const dataUrl = await createSlideImage(
          property.images[i],
          i,
          property
        );
        
        const link = document.createElement('a');
        link.download = `slide-${i + 1}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error exporting slides:', error);
      alert('Erro ao exportar os slides. Por favor, tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderSlideContent = (index: number) => {
    if (index === 0) {
      return (
        <>
          <div className="absolute top-10 left-0 right-0">
            <div className="bg-white/90 py-4 px-6">
              <h3 className="text-2xl font-bold text-blue-900 text-center">
                {property.type} - {property.reference}
              </h3>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="bg-blue-800 text-white px-8 py-2 rounded-md">
                {property.neighborhood}
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 px-2.5">
            <div className="bg-amber-400 rounded-lg py-4 px-5">
              <div className="grid grid-cols-5 gap-4 text-blue-900">
                {[
                  { label: 'Área', value: `${property.area}m²` },
                  { label: 'Quartos', value: property.bedrooms },
                  { label: 'Vagas', value: property.parkingSpots },
                  { label: 'Suítes', value: property.suites },
                  { label: 'Banheiros', value: property.bathrooms }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-lg font-bold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    if (index === 3) {
      return (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="bg-blue-800 text-white rounded-lg p-6 w-[400px] text-center">
            <h3 className="text-2xl font-bold mb-4">
              {property.type} - {property.reference}
            </h3>
            <p className="text-3xl font-bold">{property.price}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square max-w-[800px] mx-auto bg-gray-900 rounded-lg overflow-hidden">
        <div
          className="relative w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {property.images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{ left: `${index * 100}%` }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {renderSlideContent(index)}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={exportSlides}
        disabled={isExporting}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-5 h-5" />
        {isExporting ? 'Exportando...' : 'Exportar Slides'}
      </button>
    </div>
  );
}
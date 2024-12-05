import { useState } from 'react';
import { Property } from './types/property';
import { PropertyForm } from './components/PropertyForm';
import { PropertyCarousel } from './components/PropertyCarousel';

function App() {
  const [property, setProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Gerador de Post Carrossel
        </h1>

        {property ? (
          <div className="space-y-8">
            <PropertyCarousel property={property} />
            <button
              onClick={() => setProperty(null)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Criar Novo Carrossel
            </button>
          </div>
        ) : (
          <PropertyForm onSubmit={setProperty} />
        )}
      </div>
    </div>
  );
}

export default App;
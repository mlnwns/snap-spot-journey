
import React, { useState } from 'react';
import { Region, popularRegions } from '@/types';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
}

const RegionSelector = ({ selectedRegion, onRegionChange }: RegionSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = (regionId: string | null) => {
    onRegionChange(regionId);
    setIsOpen(false);
  };

  const getSelectedRegionName = () => {
    if (!selectedRegion) return '전체 지역';
    const region = popularRegions.find(r => r.id === selectedRegion);
    return region ? region.name : '전체 지역';
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-10 px-4 bg-white border-blue-200 hover:bg-blue-50"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-slate-700">
            {getSelectedRegionName()}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-12 left-0 right-0 z-50 shadow-lg border border-blue-200 bg-white">
          <div className="p-2">
            <button
              onClick={() => handleRegionSelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedRegion 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              🌍 전체 지역
            </button>
            {popularRegions.map(region => (
              <button
                key={region.id}
                onClick={() => handleRegionSelect(region.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedRegion === region.id 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{region.name}</span>
                  <span className="text-xs text-slate-500">{region.country}</span>
                </div>
                {region.subRegions && (
                  <div className="text-xs text-slate-500 mt-1">
                    {region.subRegions.slice(0, 3).join(', ')}
                    {region.subRegions.length > 3 && '...'}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RegionSelector;

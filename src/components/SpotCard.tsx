
import React from 'react';
import { PhotoSpot } from '@/types';
import { MapPin, Navigation, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SpotCardProps {
  spot: PhotoSpot;
  onNavigate: (spot: PhotoSpot) => void;
  onBookmark: (spot: PhotoSpot) => void;
}

const SpotCard = ({ spot, onNavigate, onBookmark }: SpotCardProps) => {
  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case 'low': return '여유로움';
      case 'medium': return '보통';
      case 'high': return '붐빔';
      default: return '보통';
    }
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative">
        <img 
          src={spot.images[0]} 
          alt={spot.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onBookmark(spot)}
            className="p-2 rounded-full glass-effect hover:bg-white/90 transition-colors"
          >
            <Bookmark className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(spot.crowdLevel)}`}>
            {getCrowdLevelText(spot.crowdLevel)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{spot.name}</h3>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{spot.rating}</span>
            <span className="text-xs text-gray-500">({spot.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{spot.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{spot.address}</span>
          {spot.distance && (
            <span className="ml-2 font-medium">• {spot.distance.toFixed(1)}km</span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {spot.themes.slice(0, 3).map((theme) => (
            <span 
              key={theme} 
              className="px-2 py-1 bg-coral-50 text-coral-600 text-xs rounded-md"
            >
              #{theme}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>추천시간: {spot.bestTime[0]}</span>
          </div>
          <button
            onClick={() => onNavigate(spot)}
            className="flex items-center space-x-1 px-3 py-1.5 gradient-coral text-white text-sm rounded-lg hover:shadow-md transition-all"
          >
            <Navigation className="w-3 h-3" />
            <span>길찾기</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default SpotCard;

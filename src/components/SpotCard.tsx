
import React from 'react';
import { PhotoSpot } from '@/types';
import { MapPin, Navigation, Bookmark, Star, Clock, Users } from 'lucide-react';
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
      case 'low': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'medium': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'high': return 'text-rose-600 bg-rose-100 border-rose-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <Card className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] relative">
          <img 
            src={spot.images[0]} 
            alt={spot.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* 북마크 버튼 */}
        <button
          onClick={() => onBookmark(spot)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
        >
          <Bookmark className="w-4 h-4 text-coral-600" />
        </button>

        {/* 혼잡도 배지 */}
        <div className="absolute bottom-4 left-4">
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getCrowdLevelColor(spot.crowdLevel)}`}>
            <Users className="w-3 h-3" />
            <span>{getCrowdLevelText(spot.crowdLevel)}</span>
          </div>
        </div>

        {/* 평점 */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{spot.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-1.5 leading-tight">{spot.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{spot.description}</p>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3 mr-1.5 text-coral-500" />
          <span className="truncate flex-1">{spot.address}</span>
          {spot.distance && (
            <span className="ml-2 font-semibold text-coral-600 bg-coral-50 px-2 py-1 rounded-full">
              {spot.distance.toFixed(1)}km
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {spot.themes.slice(0, 3).map((theme) => (
            <span 
              key={theme} 
              className="px-2.5 py-1 bg-gradient-to-r from-coral-50 to-coral-100 text-coral-700 text-xs rounded-full font-medium border border-coral-200"
            >
              #{theme}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="w-3 h-3 mr-1.5" />
            <span>{spot.bestTime[0]}</span>
          </div>
          <button
            onClick={() => onNavigate(spot)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white text-sm font-semibold rounded-xl hover:from-coral-600 hover:to-coral-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            <span>길찾기</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default SpotCard;

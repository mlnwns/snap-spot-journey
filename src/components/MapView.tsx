
import React, { useEffect, useState } from 'react';
import { PhotoSpot, UserLocation } from '@/types';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  spots: PhotoSpot[];
  userLocation: UserLocation | null;
  selectedSpot?: PhotoSpot | null;
  onSpotSelect: (spot: PhotoSpot) => void;
}

const MapView = ({ spots, userLocation, selectedSpot, onSpotSelect }: MapViewProps) => {
  const [mapCenter, setMapCenter] = useState<UserLocation>({ lat: 37.5665, lng: 126.9780 }); // 서울 기본값

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // 실제 지도 라이브러리 연동을 위한 임시 UI
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-sky-100 to-cream-100 overflow-hidden">
      {/* 지도 배경 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-100 to-yellow-100"></div>
      </div>
      
      {/* 가상의 지도 격자 */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 5}%` }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 5}%` }} />
        ))}
      </div>

      {/* 사용자 위치 표시 */}
      {userLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-300 rounded-full opacity-30 animate-ping"></div>
        </div>
      )}

      {/* 포토스팟 마커들 */}
      {spots.map((spot, index) => {
        const randomX = 20 + (index * 15) % 60;
        const randomY = 15 + (index * 20) % 70;
        const isSelected = selectedSpot?.id === spot.id;
        
        return (
          <button
            key={spot.id}
            onClick={() => onSpotSelect(spot)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
              isSelected ? 'scale-125 z-20' : 'z-10'
            }`}
            style={{ left: `${randomX}%`, top: `${randomY}%` }}
          >
            <div className={`relative ${isSelected ? 'animate-bounce' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                isSelected 
                  ? 'bg-coral-500 text-white' 
                  : 'bg-white text-coral-500 border-2 border-coral-500'
              }`}>
                <MapPin className="w-4 h-4" />
              </div>
              {isSelected && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap">
                  {spot.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          </button>
        );
      })}

      {/* 지도 컨트롤 */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold text-gray-600">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold text-gray-600">-</span>
        </button>
      </div>

      {/* 현재 위치 버튼 */}
      <div className="absolute bottom-4 left-4">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default MapView;

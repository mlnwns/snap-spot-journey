
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoSpot } from '@/types';
import { mockPhotoSpots } from '@/data/mockSpots';
import { ArrowLeft, MapPin, Clock, Navigation, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MapNavigation = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<PhotoSpot | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeDistance, setRouteDistance] = useState<string>('');
  const [routeTime, setRouteTime] = useState<string>('');

  useEffect(() => {
    const foundSpot = mockPhotoSpots.find(s => s.id === spotId);
    if (foundSpot) {
      setSpot(foundSpot);
    }
  }, [spotId]);

  useEffect(() => {
    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);

        // 거리 계산
        if (spot) {
          const distance = calculateDistance(userPos, spot.coordinates);
          setRouteDistance(`${distance.toFixed(1)}km`);
          setRouteTime(`${Math.ceil(distance * 12)}분`); // 대략적인 도보 시간
        }
      });
    }
  }, [spot]);

  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
    const R = 6371;
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const openKakaoMap = () => {
    if (spot) {
      const url = `https://map.kakao.com/link/to/${encodeURIComponent(spot.name)},${spot.coordinates.lat},${spot.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!spot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sky-50 flex items-center justify-center">
        <div className="text-center text-gray-600">스팟을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sky-50">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:text-coral-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-gray-800 text-lg">길찾기</h1>
          </div>
        </div>
      </div>

      <div className="pt-16">
        {/* 목업 지도 */}
        <div className="h-[60vh] relative bg-gradient-to-br from-green-100 via-blue-50 to-yellow-50">
          {/* 가상의 도로와 건물들 */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
            {/* 도로 */}
            <path d="M0,150 Q100,120 200,150 Q300,180 400,150" stroke="#ddd" strokeWidth="20" fill="none"/>
            <path d="M150,0 Q180,100 150,200 Q120,300 150,300" stroke="#ddd" strokeWidth="15" fill="none"/>
            
            {/* 건물들 */}
            <rect x="50" y="80" width="40" height="60" fill="#e5e7eb" rx="5"/>
            <rect x="320" y="100" width="50" height="80" fill="#d1d5db" rx="5"/>
            <rect x="200" y="50" width="45" height="70" fill="#e5e7eb" rx="5"/>
            <rect x="100" y="200" width="35" height="50" fill="#d1d5db" rx="5"/>
            
            {/* 공원 */}
            <circle cx="250" cy="200" r="30" fill="#dcfce7"/>
            <circle cx="240" cy="190" r="8" fill="#16a34a" opacity="0.6"/>
            <circle cx="260" cy="210" r="6" fill="#16a34a" opacity="0.6"/>
          </svg>
          
          {/* 사용자 위치 (파란 점) */}
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
            <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-75"></div>
          </div>
          
          {/* 목적지 마커 (빨간 핀) */}
          <div className="absolute top-1/3 right-1/3 flex flex-col items-center">
            <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="w-1 h-4 bg-coral-500"></div>
          </div>
          
          {/* 경로 라인 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <path 
              d="M100,200 Q150,150 200,120 Q250,100 300,100" 
              stroke="#ef4444" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
          
          {/* 지도 오버레이 정보 */}
          <div className="absolute top-4 left-4 right-4">
            <Card className="p-4 glass-effect border-white/30">
              <div className="flex items-start space-x-3">
                <img 
                  src={spot.images[0]} 
                  alt={spot.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-bold text-gray-800 mb-1">{spot.name}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{spot.rating}</span>
                    </div>
                    {routeDistance && (
                      <>
                        <span>•</span>
                        <span>{routeDistance}</span>
                        <span>•</span>
                        <span>{routeTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

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

        {/* 하단 정보 */}
        <div className="p-4 space-y-4">
          <Card className="p-5">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">위치 정보</h3>
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 text-coral-500" />
                  <div>
                    <p>{spot.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      위도: {spot.coordinates.lat.toFixed(6)}, 경도: {spot.coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">추천 시간</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-coral-500" />
                  <span>{spot.bestTime.join(', ')}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">테마</h3>
                <div className="flex flex-wrap gap-2">
                  {spot.themes.map((theme) => (
                    <span 
                      key={theme} 
                      className="px-3 py-1 bg-coral-50 text-coral-600 text-sm rounded-full border border-coral-200"
                    >
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Button
              onClick={openKakaoMap}
              className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-semibold py-3 rounded-xl shadow-lg"
            >
              <Navigation className="w-5 h-5 mr-2" />
              카카오맵에서 길찾기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapNavigation;

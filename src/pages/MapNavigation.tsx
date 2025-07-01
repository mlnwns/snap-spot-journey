
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoSpot } from '@/types';
import { mockPhotoSpots } from '@/data/mockSpots';
import { ArrowLeft, MapPin, Clock, Navigation, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapNavigation = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<PhotoSpot | null>(null);
  const [map, setMap] = useState<any>(null);
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
    if (!spot || !mapContainer.current) return;

    // 카카오맵 API 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(spot.coordinates.lat, spot.coordinates.lng),
          level: 3
        };

        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(kakaoMap);

        // 목적지 마커
        const markerPosition = new window.kakao.maps.LatLng(spot.coordinates.lat, spot.coordinates.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: spot.name
        });
        marker.setMap(kakaoMap);

        // 사용자 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(userPos);

            // 사용자 위치 마커
            const userMarkerPosition = new window.kakao.maps.LatLng(userPos.lat, userPos.lng);
            const userMarker = new window.kakao.maps.Marker({
              position: userMarkerPosition,
              title: '현재 위치'
            });
            userMarker.setMap(kakaoMap);

            // 거리 계산
            const distance = calculateDistance(userPos, spot.coordinates);
            setRouteDistance(`${distance.toFixed(1)}km`);
            setRouteTime(`${Math.ceil(distance * 12)}분`); // 대략적인 도보 시간

            // 지도 범위 조정
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(markerPosition);
            bounds.extend(userMarkerPosition);
            kakaoMap.setBounds(bounds);
          });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
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
        {/* 지도 */}
        <div className="h-[60vh] relative">
          <div ref={mapContainer} className="w-full h-full" />
          
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

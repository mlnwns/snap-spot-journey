import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoSpot, SpotTheme, UserLocation } from '@/types';
import { mockPhotoSpots } from '@/data/mockSpots';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import SpotCard from '@/components/SpotCard';
import MapView from '@/components/MapView';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [selectedThemes, setSelectedThemes] = useState<SpotTheme[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [filteredSpots, setFilteredSpots] = useState<PhotoSpot[]>(mockPhotoSpots);
  const [selectedSpot, setSelectedSpot] = useState<PhotoSpot | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const { toast } = useToast();

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setUserLocation(location);
          
          // 거리 계산 및 정렬
          const spotsWithDistance = mockPhotoSpots.map(spot => ({
            ...spot,
            distance: calculateDistance(location, spot.coordinates)
          })).sort((a, b) => a.distance - b.distance);
          
          setFilteredSpots(spotsWithDistance);
          
          toast({
            title: "위치를 찾았어요! 📍",
            description: "가까운 포토스팟을 보여드릴게요.",
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          toast({
            title: "위치 권한이 필요해요",
            description: "더 정확한 추천을 위해 위치 권한을 허용해주세요.",
            variant: "destructive"
          });
        }
      );
    }
  }, [toast]);

  // 거리 계산 함수 (하버사인 공식)
  const calculateDistance = (pos1: UserLocation, pos2: { lat: number; lng: number }) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 테마 필터링
  useEffect(() => {
    let filtered = mockPhotoSpots;
    
    if (selectedThemes.length > 0) {
      filtered = filtered.filter(spot => 
        selectedThemes.some(theme => spot.themes.includes(theme))
      );
    }

    if (userLocation) {
      filtered = filtered.map(spot => ({
        ...spot,
        distance: calculateDistance(userLocation, spot.coordinates)
      })).sort((a, b) => a.distance - b.distance);
    }

    setFilteredSpots(filtered);
  }, [selectedThemes, userLocation]);

  const handleNavigate = (spot: PhotoSpot) => {
    navigate(`/navigation/${spot.id}`);
  };

  const handleBookmark = (spot: PhotoSpot) => {
    toast({
      title: "북마크에 저장했어요! 💾",
      description: `${spot.name}을(를) 나중에 볼 수 있어요.`,
    });
  };

  const handleSpotSelect = (spot: PhotoSpot) => {
    setSelectedSpot(spot);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sky-50">
      <Header />
      <FilterBar 
        selectedThemes={selectedThemes}
        onThemeChange={setSelectedThemes}
      />
      
      <main className="pt-28 pb-6">
        <div className="container mx-auto px-4">
          {/* 뷰 모드 전환 */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-white rounded-lg p-1 shadow-soft">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list' 
                    ? 'bg-coral-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-coral-500'
                }`}
              >
                리스트
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'map' 
                    ? 'bg-coral-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-coral-500'
                }`}
              >
                지도
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <>
              {/* 헤더 정보 */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {userLocation ? '가까운 포토스팟' : '인기 포토스팟'}
                </h2>
                <p className="text-gray-600">
                  {selectedThemes.length > 0 
                    ? `${selectedThemes.join(', ')} 테마 • ${filteredSpots.length}개 장소`
                    : `총 ${filteredSpots.length}개의 감성 포토스팟`
                  }
                </p>
              </div>

              {/* 스팟 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    onNavigate={handleNavigate}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>

              {filteredSpots.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    선택한 조건의 포토스팟이 없어요
                  </h3>
                  <p className="text-gray-600">
                    다른 테마를 선택해보세요
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-soft">
              <MapView
                spots={filteredSpots}
                userLocation={userLocation}
                selectedSpot={selectedSpot}
                onSpotSelect={handleSpotSelect}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

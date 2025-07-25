
import React from 'react';
import { PhotoSpot, categoryLabels } from '@/types';
import { MapPin, Navigation, Bookmark, Star, Clock, Users, DollarSign, ExternalLink, Instagram } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SpotCardProps {
  spot: PhotoSpot;
  onNavigate: (spot: PhotoSpot) => void;
  onBookmark: (spot: PhotoSpot) => void;
}

const themeLabels: Record<string, string> = {
  couple: '커플',
  solo: '혼자',
  friends: '친구들',
  content: '콘텐츠',
  vintage: '빈티지',
  minimal: '미니멀',
  nature: '자연',
  urban: '도심',
  pet: '반려동물',
  sunset: '노을',
  night: '야경'
};

const SpotCard = ({ spot, onNavigate, onBookmark }: SpotCardProps) => {
  const navigate = useNavigate();

  const getWaitTimeText = (averageWaitTime: number, level: string) => {
    if (averageWaitTime === 0) return '대기 없음';
    if (averageWaitTime < 3) return `약 ${averageWaitTime}분`;
    if (averageWaitTime < 10) return `${averageWaitTime}분 내외`;
    return `${averageWaitTime}분 이상`;
  };

  const getWaitTimeBadgeColor = (level: string) => {
    switch (level) {
      case 'short': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'long': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const handleCardClick = () => {
    navigate(`/spot/${spot.id}`);
  };

  const handleInstagramClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <Card className="group overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-200 bg-white/95 backdrop-blur-sm">
      <div className="relative overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <div className="aspect-[4/3] relative">
          <img 
            src={spot.images[0]} 
            alt={spot.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* 북마크 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(spot);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 z-10"
        >
          <Bookmark className="w-4 h-4 text-blue-600" />
        </button>

        {/* 클러스터 표시 */}
        {spot.cluster && spot.cluster.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm">
              <span className="text-xs font-medium text-white">{spot.cluster.length + 1}개 스팟</span>
            </div>
          </div>
        )}

        {/* 대기 시간 배지 (혼잡도 대신) */}
        <div className="absolute bottom-3 left-3">
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getWaitTimeBadgeColor(spot.waitTimeLevel)}`}>
            <Clock className="w-3 h-3" />
            <span>{getWaitTimeText(spot.averageWaitTime, spot.waitTimeLevel)}</span>
          </div>
        </div>

        {/* 평점 */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-slate-800">{spot.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 cursor-pointer" onClick={handleCardClick}>
        <div className="mb-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-slate-900 text-base leading-tight flex-1">{spot.name}</h3>
            {spot.userGenerated && (
              <div className="flex items-center space-x-1 ml-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">유저등록</span>
              </div>
            )}
          </div>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{spot.description}</p>
        </div>
        
        {/* 지역 및 카테고리 */}
        <div className="mb-3 flex items-center space-x-2">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
            {spot.region}
          </span>
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
            {categoryLabels[spot.category]}
          </span>
        </div>
        
        {/* 상세 위치 정보 */}
        {spot.detailedLocation && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <div className="text-xs text-slate-600 space-y-0.5">
              {spot.detailedLocation.building && (
                <div>🏢 {spot.detailedLocation.building}</div>
              )}
              {spot.detailedLocation.floor && (
                <div>📍 {spot.detailedLocation.floor}</div>
              )}
              {spot.detailedLocation.landmark && (
                <div>🗺️ {spot.detailedLocation.landmark}</div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center text-xs text-slate-500 mb-3">
          <MapPin className="w-3 h-3 mr-1 text-blue-500" />
          <span className="truncate flex-1">{spot.address}</span>
          {spot.distance && (
            <span className="ml-2 font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {spot.distance.toFixed(1)}km
            </span>
          )}
        </div>

        {/* 인스타그램 사용자 사진들 (개선된 UI) */}
        {spot.userPhotos && spot.userPhotos.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-slate-600 mb-2 font-medium">📸 인스타그램에서</div>
            <div className="grid grid-cols-3 gap-2">
              {spot.userPhotos.slice(0, 3).map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={photo.image} 
                      alt={`@${photo.username} 사진`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-1">
                    <button
                      onClick={(e) => handleInstagramClick(e, photo.instagramUrl)}
                      className="text-white text-xs text-center"
                    >
                      <Instagram className="w-3 h-3 mx-auto mb-1" />
                      <div className="font-medium">@{photo.username}</div>
                      {photo.capturedTime && (
                        <div className="text-xs opacity-80">{photo.capturedTime}</div>
                      )}
                    </button>
                  </div>
                  {/* 항상 보이는 사용자명 */}
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="bg-black/80 text-white text-xs px-1 py-0.5 rounded text-center truncate">
                      @{photo.username}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 운영 정보 및 외부 링크 */}
        {spot.operationInfo && (
          <div className="flex items-center space-x-2 mb-3 text-xs">
            {spot.operationInfo.fee && (
              <div className="flex items-center space-x-1 text-slate-600">
                <DollarSign className="w-3 h-3" />
                <span>{spot.operationInfo.fee}</span>
              </div>
            )}
            {spot.realTimeInfo?.isOpen !== undefined && (
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                spot.realTimeInfo.isOpen 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-red-600 bg-red-100'
              }`}>
                {spot.realTimeInfo.isOpen ? '운영중' : '운영종료'}
              </div>
            )}
            {spot.operationInfo.officialWebsite && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(spot.operationInfo!.officialWebsite, '_blank');
                }}
                className="h-6 px-2 text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                공식사이트
              </Button>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {spot.themes.slice(0, 3).map((theme) => (
            <span 
              key={theme} 
              className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-600 text-xs rounded-full font-medium border border-blue-200"
            >
              #{themeLabels[theme] || theme}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-600">
            <Clock className="w-3 h-3 mr-1" />
            <span>📸 {spot.bestTime[0]} 촬영 추천</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(spot);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Navigation className="w-3 h-3" />
              <span>길찾기</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpotCard;

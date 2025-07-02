
import React from 'react';
import { PhotoSpot } from '@/types';
import { MapPin, Navigation, Bookmark, Star, Clock, Users, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SpotCardProps {
  spot: PhotoSpot;
  onNavigate: (spot: PhotoSpot) => void;
  onBookmark: (spot: PhotoSpot) => void;
}

const SpotCard = ({ spot, onNavigate, onBookmark }: SpotCardProps) => {
  const navigate = useNavigate();

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
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'high': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const handleCardClick = () => {
    navigate(`/spot/${spot.id}`);
  };

  return (
    <Card className="group overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pastel-200 bg-white/95 backdrop-blur-sm">
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
          <Bookmark className="w-4 h-4 text-pastel-600" />
        </button>

        {/* 클러스터 표시 */}
        {spot.cluster && spot.cluster.length > 0 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-pastel-500/90 backdrop-blur-sm">
              <span className="text-xs font-medium text-slate-700">{spot.cluster.length + 1}개 스팟</span>
            </div>
          </div>
        )}

        {/* 혼잡도 배지 */}
        <div className="absolute bottom-3 left-3">
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCrowdLevelColor(spot.crowdLevel)}`}>
            <Users className="w-3 h-3" />
            <span>{getCrowdLevelText(spot.crowdLevel)}</span>
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
        
        {/* 상세 위치 정보 */}
        {spot.detailedLocation && (
          <div className="mb-3 p-2 bg-pastel-50 rounded-lg">
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
          <MapPin className="w-3 h-3 mr-1 text-pastel-500" />
          <span className="truncate flex-1">{spot.address}</span>
          {spot.distance && (
            <span className="ml-2 font-semibold text-pastel-600 bg-pastel-100 px-2 py-0.5 rounded-full">
              {spot.distance.toFixed(1)}km
            </span>
          )}
        </div>

        {/* 운영 정보 */}
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
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {spot.themes.slice(0, 3).map((theme) => (
            <span 
              key={theme} 
              className="px-2 py-0.5 bg-gradient-to-r from-pastel-100 to-sky-100 text-slate-600 text-xs rounded-full font-medium border border-pastel-200"
            >
              #{theme}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-600">
            <Clock className="w-3 h-3 mr-1" />
            <span>{spot.bestTime[0]}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(spot);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-pastel-500 to-sky-500 text-slate-700 text-sm font-semibold rounded-lg hover:from-pastel-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg"
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

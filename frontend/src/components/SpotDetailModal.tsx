
import React from 'react';
import { PhotoSpot } from '@/types';
import { X, MapPin, Clock, Users, DollarSign, Star, Camera, Share2 } from 'lucide-react';

interface SpotDetailModalProps {
  spot: PhotoSpot | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (spot: PhotoSpot) => void;
}

const SpotDetailModal = ({ spot, isOpen, onClose, onNavigate }: SpotDetailModalProps) => {
  if (!isOpen || !spot) return null;

  const generateInstagramTags = () => {
    const baseTags = ['#포토필터', '#포토스팟', '#감성사진'];
    const locationTags = spot.address.split(' ').slice(0, 2).map(loc => `#${loc}`);
    const themeTags = spot.themes.map(theme => `#${theme}`);
    return [...baseTags, ...locationTags, ...themeTags].join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="relative">
          <div className="aspect-video relative">
            <img 
              src={spot.images[0]} 
              alt={spot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white mb-2">{spot.name}</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-slate-800">{spot.rating}</span>
                  <span className="text-xs text-slate-600">({spot.reviewCount})</span>
                </div>
                {spot.cluster && spot.cluster.length > 0 && (
                  <div className="px-2 py-1 bg-pastel-500/90 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-medium text-slate-700">{spot.cluster.length + 1}개 스팟</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">기본 정보</h3>
              <p className="text-slate-600 leading-relaxed mb-3">{spot.description}</p>
              <div className="flex items-start space-x-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 mt-0.5 text-pastel-500" />
                <span>{spot.address}</span>
              </div>
            </div>

            {/* 상세 위치 */}
            {spot.detailedLocation && (
              <div className="bg-pastel-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">상세 위치</h4>
                <div className="space-y-1 text-sm text-slate-600">
                  {spot.detailedLocation.building && (
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">건물:</span>
                      <span>{spot.detailedLocation.building}</span>
                    </div>
                  )}
                  {spot.detailedLocation.floor && (
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">위치:</span>
                      <span>{spot.detailedLocation.floor}</span>
                    </div>
                  )}
                  {spot.detailedLocation.entrance && (
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">입구:</span>
                      <span>{spot.detailedLocation.entrance}</span>
                    </div>
                  )}
                  {spot.detailedLocation.landmark && (
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">랜드마크:</span>
                      <span>{spot.detailedLocation.landmark}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 운영 정보 */}
            {spot.operationInfo && (
              <div>
                <h4 className="font-medium text-slate-800 mb-2">운영 정보</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {spot.operationInfo.fee && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span>{spot.operationInfo.fee}</span>
                    </div>
                  )}
                  {spot.operationInfo.hours && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{spot.operationInfo.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 촬영 팁 */}
            {spot.tips.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-800 mb-2">촬영 팁</h4>
                <div className="space-y-2">
                  {spot.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                      <Camera className="w-4 h-4 mt-0.5 text-pastel-500" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 인스타그램 해시태그 */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>인스타그램 해시태그</span>
              </h4>
              <p className="text-sm text-slate-600 break-words">{generateInstagramTags()}</p>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={() => {
              onNavigate(spot);
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-pastel-500 to-sky-500 text-slate-700 font-semibold rounded-xl hover:from-pastel-600 hover:to-sky-600 transition-all duration-200 shadow-lg"
          >
            길찾기 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailModal;

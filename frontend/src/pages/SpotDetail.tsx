import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhotoSpot } from "@/types";
import { mockPhotoSpots } from "@/data/mockSpots";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Bookmark,
  Star,
  Clock,
  Users,
  DollarSign,
  Instagram,
  ExternalLink,
  Heart,
  Share2,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const themeLabels: Record<string, string> = {
  couple: "커플ㅇ",
  solo: "혼자",
  friends: "친구들",
  content: "콘텐츠",
  vintage: "빈티지",
  minimal: "미니멀",
  nature: "자연",
  urban: "도심",
  pet: "반려동물",
  sunset: "노을",
  night: "야경",
};

const SpotDetail = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<PhotoSpot | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const foundSpot = mockPhotoSpots.find((s) => s.id === spotId);
    if (foundSpot) {
      setSpot(foundSpot);
    }
  }, [spotId]);

  const handleNavigate = () => {
    if (spot) {
      // 카카오맵으로 길찾기
      const kakaoUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
        spot.name
      )},${spot.coordinates.lat},${spot.coordinates.lng}`;
      window.open(kakaoUrl, "_blank");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "북마크에서 제거했어요" : "북마크에 저장했어요! 💾",
      description: `${spot?.name}을(를) ${
        isBookmarked ? "제거했어요" : "나중에 볼 수 있어요"
      }`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spot?.name,
        text: spot?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크가 복사되었어요! 📋",
        description: "친구들과 공유해보세요",
      });
    }
  };

  const getWaitTimeText = (averageWaitTime: number, level: string) => {
    if (averageWaitTime === 0) return "대기 없음";
    if (averageWaitTime < 3) return `약 ${averageWaitTime}분`;
    if (averageWaitTime < 10) return `${averageWaitTime}분 내외`;
    return `${averageWaitTime}분 이상`;
  };

  const getWaitTimeBadgeColor = (level: string) => {
    switch (level) {
      case "short":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "long":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (!spot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-50 to-sky-50 flex items-center justify-center">
        <div className="text-center text-slate-600">
          스팟을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-50 to-sky-50 max-w-[393px] mx-auto">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-pastel-200 max-w-[393px] mx-auto">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-slate-700 hover:text-pastel-600 p-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="font-bold text-slate-800 text-sm">포토스팟</h1>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-slate-600 hover:text-pastel-600 p-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`p-1.5 ${
                  isBookmarked
                    ? "text-pastel-600"
                    : "text-slate-600 hover:text-pastel-600"
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-6">
        <div className="px-3 space-y-4">
          {/* 이미지 갤러리 - 박스 안으로 이동 */}
          <Card className="overflow-hidden shadow-soft border-pastel-200">
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={spot.images[selectedImage]}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* 이미지 인디케이터 */}
                {spot.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {spot.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedImage ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* 상태 배지들 */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {spot.cluster && spot.cluster.length > 0 && (
                    <Badge className="bg-pastel-500/90 text-slate-700 backdrop-blur-sm text-xs">
                      {spot.cluster.length + 1}개 스팟
                    </Badge>
                  )}
                  <Badge
                    className={`backdrop-blur-sm border text-xs ${getWaitTimeBadgeColor(
                      spot.waitTimeLevel
                    )}`}
                  >
                    <Users className="w-3 h-3 mr-1" />
                    {getWaitTimeText(spot.averageWaitTime, spot.waitTimeLevel)}
                  </Badge>
                  {spot.realTimeInfo?.isOpen !== undefined && (
                    <Badge
                      className={`backdrop-blur-sm text-xs ${
                        spot.realTimeInfo.isOpen
                          ? "bg-emerald-100/90 text-emerald-700 border-emerald-200"
                          : "bg-rose-100/90 text-rose-700 border-rose-200"
                      }`}
                    >
                      {spot.realTimeInfo.isOpen ? "운영중" : "운영종료"}
                    </Badge>
                  )}
                </div>

                {/* 평점 */}
                <div className="absolute top-3 right-3">
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-slate-800">
                      {spot.rating}
                    </span>
                    <span className="text-xs text-slate-600">
                      ({spot.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 기본 정보 */}
          <Card className="p-4 shadow-soft border-pastel-200">
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-xl font-bold text-slate-900">
                    {spot.name}
                  </h1>
                  {spot.userGenerated && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      유저등록
                    </Badge>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {spot.description}
                </p>
              </div>

              <div className="flex items-start space-x-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 mt-0.5 text-pastel-500" />
                <div>
                  <p>{spot.address}</p>
                  {spot.detailedLocation && (
                    <div className="mt-1 space-y-1 text-xs">
                      {spot.detailedLocation.building && (
                        <p>🏢 {spot.detailedLocation.building}</p>
                      )}
                      {spot.detailedLocation.floor && (
                        <p>📍 {spot.detailedLocation.floor}</p>
                      )}
                      {spot.detailedLocation.landmark && (
                        <p>🗺️ {spot.detailedLocation.landmark}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {spot.themes.map((theme) => (
                  <Badge
                    key={theme}
                    variant="outline"
                    className="bg-gradient-to-r from-pastel-100 to-sky-100 text-slate-600 border-pastel-200 text-xs"
                  >
                    #{themeLabels[theme] || theme}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* 클러스터 스팟들 */}
          {spot.cluster && spot.cluster.length > 0 && (
            <Card className="p-4 shadow-soft border-pastel-200">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                📍 이 장소의 다른 포토스팟들
              </h3>
              <div className="space-y-3">
                {spot.cluster.map((clusterSpot) => (
                  <div
                    key={clusterSpot.id}
                    className="flex items-center space-x-3 p-3 bg-pastel-50 rounded-lg"
                  >
                    <img
                      src={clusterSpot.images[0]}
                      alt={clusterSpot.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm">
                        {clusterSpot.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {clusterSpot.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-slate-600">
                            {clusterSpot.rating}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600">
                          {clusterSpot.themes
                            .map((t) => themeLabels[t] || t)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/spot/${clusterSpot.id}`)}
                      className="text-pastel-600 border-pastel-300 hover:bg-pastel-50 text-xs"
                    >
                      보기
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 운영 정보 */}
          {spot.operationInfo && (
            <Card className="p-4 shadow-soft border-pastel-200">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                🕐 운영 정보
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {spot.operationInfo.fee && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-pastel-500" />
                    <span className="text-slate-600">
                      {spot.operationInfo.fee}
                    </span>
                  </div>
                )}
                {spot.operationInfo.hours && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-pastel-500" />
                    <span className="text-slate-600">
                      {spot.operationInfo.hours}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 인스타그램 사진들 */}
          {spot.userPhotos && spot.userPhotos.length > 0 && (
            <Card className="p-4 shadow-soft border-pastel-200">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                📸 사용자들이 찍은 사진
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {spot.userPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo.image}
                      alt={`${spot.name} 사용자 사진`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <a
                        href={photo.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white bg-pink-600 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>@{photo.username}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 추천 해시태그 */}
          {spot.instagramTags && spot.instagramTags.length > 0 && (
            <Card className="p-4 shadow-soft border-pastel-200">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                📱 추천 해시태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {spot.instagramTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigator.clipboard.writeText(tag);
                      toast({ title: "해시태그가 복사되었어요! 📋" });
                    }}
                    className="text-sm bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1.5 rounded-full border border-pink-200 hover:from-pink-200 hover:to-purple-200 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <Button
              onClick={handleNavigate}
              className="w-full bg-gradient-to-r from-pastel-500 to-sky-500 hover:from-pastel-600 hover:to-sky-600 text-slate-700 font-semibold py-3 rounded-xl shadow-lg text-sm"
            >
              <Navigation className="w-4 h-4 mr-2" />
              길찾기 (카카오맵)
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="py-2.5 border-pastel-300 text-pastel-600 hover:bg-pastel-50 text-sm"
              >
                <Heart className="w-3.5 h-3.5 mr-2" />
                좋아요
              </Button>
              <Button
                variant="outline"
                className="py-2.5 border-pastel-300 text-pastel-600 hover:bg-pastel-50 text-sm"
              >
                <Camera className="w-3.5 h-3.5 mr-2" />
                사진 업로드
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;

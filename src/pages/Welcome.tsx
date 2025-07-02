
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Star, Users, Clock, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "정확한 위치 안내",
      description: "GPS 좌표와 상세한 위치 정보로 정확한 포토스팟을 찾아보세요"
    },
    {
      icon: Camera,
      title: "베스트 앵글 가이드",
      description: "사진 작가들이 찍은 실제 사진과 촬영 팁을 확인하세요"
    },
    {
      icon: Clock,
      title: "최적의 촬영 시간",
      description: "빛과 분위기가 가장 좋은 시간대를 추천해드려요"
    },
    {
      icon: Users,
      title: "실시간 혼잡도",
      description: "사람이 적은 시간을 골라 여유롭게 촬영하세요"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* 헤더 */}
      <div className="text-center pt-16 pb-8 px-4">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Camera className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">포토필터</h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
          이제 직접 찾아다니지 말고<br />
          <span className="font-semibold text-blue-600">정확한 포토스팟</span>에서<br />
          완벽한 사진을 찍어보세요
        </p>
      </div>

      {/* 특징들 */}
      <div className="flex-1 px-4 pb-8">
        <div className="space-y-4 max-w-md mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 시작 버튼 */}
      <div className="p-4">
        <Button
          onClick={() => navigate('/spots')}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 rounded-xl text-lg shadow-lg"
        >
          포토스팟 찾아보기 📸
        </Button>
      </div>
    </div>
  );
};

export default Welcome;

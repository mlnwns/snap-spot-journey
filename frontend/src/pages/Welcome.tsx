import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Star, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center max-w-[393px] mx-auto">
      <div className="px-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">포토스팟</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            이제 직접 찾아다니지 말고
            <br />
            정확한 포토스팟 위치에서
            <br />
            완벽한 사진을 찍어보세요
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">
                정확한 위치 안내
              </h3>
              <p className="text-slate-600 text-xs">
                어디서 찍었는지 정확히 알려드려요
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">
                최적의 촬영 시간
              </h3>
              <p className="text-slate-600 text-xs">
                언제 찍으면 좋은지 알려드려요
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">
                검증된 포토스팟
              </h3>
              <p className="text-slate-600 text-xs">
                실제 방문자들이 인증한 장소만
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/spots")}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg text-sm transition-all duration-200"
        >
          포토스팟 찾아보기
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Welcome;

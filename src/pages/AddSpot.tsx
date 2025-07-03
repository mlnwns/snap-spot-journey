import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { SpotTheme, SpotRegistration, SpotCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AddSpot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SpotRegistration>({
    name: '',
    description: '',
    coordinates: { lat: 0, lng: 0 },
    images: [],
    themes: [],
    category: 'outdoor',
    tips: [],
    detailedLocation: {},
    operationInfo: {}
  });
  const [newTip, setNewTip] = useState('');

  const themeOptions: { value: SpotTheme; label: string }[] = [
    { value: 'couple', label: '💕 커플' },
    { value: 'solo', label: '🧘 혼자' },
    { value: 'friends', label: '👥 친구들' },
    { value: 'content', label: '📹 콘텐츠' },
    { value: 'vintage', label: '🎞️ 빈티지' },
    { value: 'minimal', label: '⚪ 미니멀' },
    { value: 'nature', label: '🌿 자연' },
    { value: 'urban', label: '🏙️ 도심' },
    { value: 'pet', label: '🐕 반려동물' },
    { value: 'sunset', label: '🌅 노을' },
    { value: 'night', label: '🌙 야경' }
  ];

  const categoryOptions: { value: SpotCategory; label: string }[] = [
    { value: 'outdoor', label: '야외' },
    { value: 'indoor', label: '실내' },
    { value: 'cafe', label: '카페' },
    { value: 'nature', label: '자연' },
    { value: 'urban', label: '도심' },
    { value: 'rooftop', label: '루프탑' },
    { value: 'underground', label: '지하' }
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          toast({
            title: "현재 위치를 가져왔어요! 📍",
            description: "위치를 조정하려면 직접 입력해주세요.",
          });
        },
        () => {
          toast({
            title: "위치를 가져올 수 없어요",
            description: "직접 입력해주세요.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const toggleTheme = (theme: SpotTheme) => {
    setFormData(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : [...prev.themes, theme]
    }));
  };

  const addTip = () => {
    if (newTip.trim()) {
      setFormData(prev => ({
        ...prev,
        tips: [...prev.tips, newTip.trim()]
      }));
      setNewTip('');
    }
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 서버 전송 로직
    toast({
      title: "포토스팟이 등록되었어요! 🎉",
      description: "검토 후 24시간 이내에 게시됩니다.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-50 to-sky-50 max-w-[393px] mx-auto">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-pastel-200 max-w-[393px] mx-auto">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/spots')}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <h1 className="text-base font-bold text-slate-800">포토스팟 등록</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-[56px] pb-6">
        <div className="px-3 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-pastel-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">기본 정보</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">스팟 이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent"
                    placeholder="예) 북촌 한옥마을 감성 골목"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">설명</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent"
                    rows={3}
                    placeholder="이 포토스팟만의 특별한 점을 알려주세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SpotCategory }))}
                    className="w-full px-4 py-3 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 위치 정보 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-pastel-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">위치 정보</h2>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="flex items-center space-x-2 px-3 py-2 bg-pastel-500 text-slate-700 rounded-lg hover:bg-pastel-400 transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>현재 위치</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">위도</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-3 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent"
                    placeholder="37.5665"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">경도</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-3 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent"
                    placeholder="126.9780"
                    required
                  />
                </div>
              </div>

              {/* 상세 위치 */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-700">상세 위치 (선택사항)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.detailedLocation?.building || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      detailedLocation: { ...prev.detailedLocation, building: e.target.value }
                    }))}
                    className="px-3 py-2 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent text-sm"
                    placeholder="건물명"
                  />
                  <input
                    type="text"
                    value={formData.detailedLocation?.floor || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      detailedLocation: { ...prev.detailedLocation, floor: e.target.value }
                    }))}
                    className="px-3 py-2 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent text-sm"
                    placeholder="층수/위치"
                  />
                  <input
                    type="text"
                    value={formData.detailedLocation?.entrance || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      detailedLocation: { ...prev.detailedLocation, entrance: e.target.value }
                    }))}
                    className="px-3 py-2 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent text-sm"
                    placeholder="입구 정보"
                  />
                  <input
                    type="text"
                    value={formData.detailedLocation?.landmark || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      detailedLocation: { ...prev.detailedLocation, landmark: e.target.value }
                    }))}
                    className="px-3 py-2 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent text-sm"
                    placeholder="주변 랜드마크"
                  />
                </div>
              </div>
            </div>

            {/* 테마 선택 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-pastel-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">테마 선택</h2>
              <div className="flex flex-wrap gap-2">
                {themeOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleTheme(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.themes.includes(option.value)
                        ? 'bg-pastel-500 text-slate-700 shadow-md'
                        : 'bg-white border border-pastel-300 text-slate-600 hover:bg-pastel-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 촬영 팁 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-pastel-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">촬영 팁</h2>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  className="flex-1 px-4 py-2 border border-pastel-300 rounded-lg focus:ring-2 focus:ring-pastel-500 focus:border-transparent text-sm"
                  placeholder="촬영 팁을 입력해주세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTip())}
                />
                <button
                  type="button"
                  onClick={addTip}
                  className="px-4 py-2 bg-pastel-500 text-slate-700 rounded-lg hover:bg-pastel-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-pastel-50 rounded-lg">
                    <span className="text-sm text-slate-700">{tip}</span>
                    <button
                      type="button"
                      onClick={() => removeTip(index)}
                      className="p-1 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 이미지 업로드 (임시 UI) */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-pastel-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">사진 업로드</h2>
              <div className="border-2 border-dashed border-pastel-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-pastel-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">사진을 드래그하거나 클릭해서 업로드</p>
                <p className="text-sm text-slate-500">최대 5장까지 업로드 가능</p>
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pastel-500 to-sky-500 text-slate-700 font-semibold rounded-xl hover:from-pastel-600 hover:to-sky-600 transition-all duration-200 shadow-lg"
            >
              포토스팟 등록하기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddSpot;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Bookmarks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-slate-700 hover:text-blue-600 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-slate-800 text-lg">북마크</h1>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              저장된 포토스팟이 없어요
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              마음에 드는 포토스팟을 북마크해보세요
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl"
            >
              포토스팟 둘러보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

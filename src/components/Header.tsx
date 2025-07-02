
import React from 'react';
import { Camera, MapPin, Plus, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-pastel-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-slate-700" />
            </div>
            <h1 className="text-lg font-bold text-slate-800">포토필터</h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/bookmarks')}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <Bookmark className="w-5 h-5 text-slate-600" />
            </button>
            <button 
              onClick={() => navigate('/add-spot')}
              className="flex items-center space-x-1 px-3 py-2 bg-pastel-500 text-slate-700 rounded-lg hover:bg-pastel-400 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">스팟 등록</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
              <MapPin className="w-5 h-5 text-slate-600" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

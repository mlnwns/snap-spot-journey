
import React from 'react';
import { Camera, Plus, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-blue-200 max-w-[393px] mx-auto">
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="cursor-pointer"
            onClick={() => navigate('/spots')}
          >
            <h1 className="text-base font-bold text-slate-800">포토스팟</h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/bookmarks')}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <Bookmark className="w-4 h-4 text-slate-600" />
            </button>
            <button 
              onClick={() => navigate('/add-spot')}
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>등록</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

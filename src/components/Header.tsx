
import React from 'react';
import { Camera, List, Bookmark } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-coral rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">포토필터</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
              <List className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

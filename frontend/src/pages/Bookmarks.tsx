import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Bookmarks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grgfffadient-to-br from-blue-50 to-indigo-50 max-w-[393px] mx-auto">
      <Header />

      <main className="pt-[56px] pb-5">
        <div className="px-3">
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              북마크한 포토스팟이 없어dddd요.
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              마음에 드는 포토스팟을 북마크해보세요
            </p>
            <Button
              onClick={() => navigate("/spots")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm"
            >
              포토스팟 둘러보기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;

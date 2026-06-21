import Timeline from '@/components/Timeline';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Coffee } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative">
      {/* Background texture */}
      <div className="absolute inset-0 paper-bg opacity-40" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回首页</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="font-serif text-3xl text-ink-700 font-semibold">
                昨日的世界
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic">
                时间线 · 一个消逝的时代
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/cafe"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Coffee size={14} />
                <span className="hidden sm:inline">昨 日 咖 啡 馆</span>
                <span className="sm:hidden">咖 啡</span>
              </Link>
              <Link
                to="/relations"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Users size={14} />
                <span className="hidden sm:inline">人 物 关 系</span>
                <span className="sm:hidden">关 系</span>
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <MapPin size={14} />
                <span className="hidden sm:inline">昨 日 地 图</span>
                <span className="sm:hidden">地 图</span>
              </Link>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>

      {/* Timeline content */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Intro text */}
          <div className="text-center mb-12 mt-8">
            <p className="font-serif text-paper-700 text-lg italic max-w-2xl mx-auto leading-relaxed">
              "我们曾经以为，世界会这样一直和平地走下去。
              <br />
              可谁能想到，那竟是一个时代最后的黄昏。"
            </p>
            <p className="font-body text-paper-500 text-sm mt-4">
              —— 斯蒂芬·茨威格
            </p>
          </div>

          {/* Timeline */}
          <Timeline />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-sm">
            昨日的世界 · 一个欧洲人的回忆
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client"
import { useState, useEffect } from 'react';
import { Course } from '../../type/Types';
import Link from "next/link";

const filterLabels: Record<string, string> = {
  regno: '登録番号',
  season: '学期',
  ay: '学年度',
  no: '科目番号',
  major: 'メジャー',
  level: 'レベル',
  lang: '言語',
  j: '科目名（日本語）',
  e: '科目名（英語）',
  room: '教室',
  instructor: '担当教員',
  unit: '単位数'
};

const allowedFilters = Object.keys(filterLabels);

const SearchPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Course[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkMode);
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      console.log(queryParams);
      const response = await fetch(`/api/search?${queryParams}`);
      if (!response.ok) throw new Error('検索に失敗しました');
      const data = await response.json();
      setResults(data.result || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラー');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisibleCount(10);
    fetchResults();
  };

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
  
    if (field !== 'j' && field !== 'e' && field !== 'schedule') {
      value = value.trim(); 
    }
  
    setFilters(prev => {
      if (value === '') {
        const newFilters = { ...prev };
        delete newFilters[field]; 
        return newFilters;
      }
      return { ...prev, [field]: value }; 
    });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && visibleCount < results.length) {
        setVisibleCount(prev => prev + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, results.length, visibleCount]);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* 左側の検索フォーム */}
      <div className={`w-80 p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r shadow-sm`}>
        <h1 className="text-2xl font-bold mb-6">科目検索</h1>
        <div className="mb-4 flex flex-wrap gap-2">
          <Link href="/">
            <button className="mb-4 rounded bg-teal-500 px-4 py-2 text-white">
              戻る
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {allowedFilters.map(filter => (
            <div key={filter} className="space-y-2">
              <label className="block text-sm font-medium">{filterLabels[filter]}</label>
              {filter === 'level' ? (
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                  }`}
                  onChange={handleInputChange(filter)}
                  value={filters[filter] || ''}
                >
                  <option value="">選択してください</option>
                  <option value="1">100</option>
                  <option value="2">200</option>
                  <option value="3">300</option>
                </select>
              ) : filter === 'lang' ? (
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                  }`}
                  onChange={handleInputChange(filter)}
                  value={filters[filter] || ''}
                >
                  <option value="">選択してください</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </select>
              ) : (
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
                  }`}
                  onChange={handleInputChange(filter)}
                  value={filters[filter] || ''}
                  placeholder={`入力: ${filterLabels[filter]}`}
                />
              )}
            </div>
          ))}

          {/* 特別処理：授業時間 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">授業時間（時限/曜日）</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
              placeholder="例: 3/M"
              onChange={handleInputChange('schedule')}
              value={filters.schedule || ''}
            />
            <p className="text-xs mt-1">フォーマット：時限/曜日（例: 3/M は月曜日3限）</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-150 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '検索中...' : '検索する'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
      {/* 右側の結果エリア */}
      <div className="flex-1 p-6">
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.slice(0, visibleCount).map(course => (
            <div
              key={course.regno}
              className={`p-4 h-48 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {course.j || course.e}
              </h3>
              <div className="mt-2 space-y-1">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">担当教員：</span>
                  {course.instructor || '未定'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">教室：</span>
                  {course.room || '未定'}
                </p>
                <div className="flex gap-4 mt-2">
                  <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                    登録番号：{course.regno}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    単位：{course.unit}
                  </span>
                </div>
                {course.schedule && Array.isArray(course.schedule) && course.schedule.length > 0 && (
                  <div className="mt-2">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-medium">授業時間：</span>
                      {course.schedule
                        .map((item: any) =>
                          item.isSuper ? `*${item.period}/${item.day}` : `${item.period}/${item.day}`
                        )
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {visibleCount < results.length && (
            <div className={`text-center p-4 animate-pulse ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              さらに結果を読み込み中...
            </div>
          )}

          {results.length === 0 && !loading && (
            <div className={`text-center p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              条件に一致する科目が見つかりません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

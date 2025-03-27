// src/app/search/page.tsx

"use client"
import { useState, useEffect } from 'react';
import { useAtom } from "jotai";
import { selectedCoursesAtom } from "../../stories/atoms";
import { Course } from '../../type/Types';
import Link from "next/link";
// 新增：导入 useLocalStorage
import { useLocalStorage } from "../../hooks/useLocalStorage";

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
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // 使用本地存储获取 weekdays，默认为五个工作日
  const [weekdays] = useLocalStorage<string[]>("weekdays", ["M", "TU", "W", "TH", "F"]);
  // 新增：存储表格选择的时限
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkMode);
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      console.log("queryParams", queryParams);
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

  const getRandomColor = () => {
    const colors = [
      "#868e96",
      "#fa5252",
      "#e64980",
      "#be4bdb",
      "#7950f2",
      "#4c6ef5",
      "#228be6",
      "#15aabf",
      "#12b886",
      "#40c057",
      "#82c91e",
      "#fab005",
      "#fd7e14",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const handleCourseSelect = (course: Course) => {
    setSelectedCourses((prev) => {
      const exists = prev.find((c) => c.regno === course.regno);
      if (exists) {
        return prev.filter((c) => c.regno !== course.regno); // 取消选择
      }
      const newCourse = { ...course, color: getRandomColor() };
      return [...prev, newCourse];
    });
  };

  // 点击时限格子时的处理函数
  const toggleSchedule = (value: string) => {
    setSelectedSchedules(prev => {
      let newSchedules;
      if (prev.includes(value)) {
        newSchedules = prev.filter(s => s !== value);
      } else {
        newSchedules = [...prev, value];
      }
      // 将选择的时限更新到 filters.schedule，多个时限以逗号分隔
      setFilters(prevFilters => ({ ...prevFilters, schedule: newSchedules.join(',') }));
      return newSchedules;
    });
  };

  // 使用 local storage 中的 weekdays 数组来生成选择表格的列
  // 这里依然使用固定的 7 行时限
  const periods = [1, 2, 3, 4, 5, 6, 7];

  // check selectedCourses storage
  useEffect(() => {
    console.log("現在の選択済みコース:", selectedCourses);
  }, [selectedCourses]);
  
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
      {/* 左侧的搜索表单 */}
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

          {/* 特别处理：授業時間 */}
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
            {/* 新增：选择表格 */}
            <div className="mt-4 overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {weekdays.map((day) => (
                      <th
                        key={day}
                        className={`px-2 py-1 border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} text-center`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map(period => (
                    <tr key={period}>
                      {weekdays.map(day => {
                        const value = `${period}/${day}`;
                        const isSelected = selectedSchedules.includes(value);
                        return (
                          <td key={value} className="border px-2 py-1 text-center">
                            <button
                              type="button"
                              onClick={() => toggleSchedule(value)}
                              className={`w-full py-1 rounded ${
                                isSelected 
                                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                                  : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
                              }`}
                            >
                              {value}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-1 text-xs text-gray-500">
                複数選択可。選択した時限は自動的にフィルターに反映されます。
              </p>
            </div>
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
      {/* 右侧的结果区 */}
      <div className="flex-1 p-6">
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.slice(0, visibleCount).map(course => {
            const isSelected = selectedCourses.some((c) => c.regno === course.regno);
            return (
              <div
                key={course.regno}
                className={`p-4 h-48 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  {course.j ? `${course.no} ${course.j}` : `${course.no} ${course.e}`} 
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
                    <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-purple-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      学期：{course.season}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      専門：{course.no}
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
                      <button
                        className={`mt-2 px-4 py-2 rounded ${isSelected ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                        onClick={() => handleCourseSelect(course)}
                      >
                        {isSelected ? "削除" : "追加"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

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

        {/* 底部显示已选择的科目 */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-6">
          <h2 className="text-lg font-semibold">選択した科目</h2>
          {selectedCourses.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {selectedCourses.map(course => (
                <li key={course.regno} className="text-sm">
                  {course.no} {course.j || course.e}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">まだ選択されていません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

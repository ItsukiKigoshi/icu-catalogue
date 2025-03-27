// src/app/search/page.tsx

"use client";
import { useState, useEffect } from 'react';
import { useMantineColorScheme, Container, Paper, Title, TextInput, Select, 
  Button, Group, Table, Text, Stack, Alert, Box, Grid } from '@mantine/core';
import { useAtom } from "jotai";
import { selectedCoursesAtom } from "../../stories/atoms";
import { Course } from '../../type/Types';
import Link from "next/link";
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
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weekdays] = useLocalStorage<string[]>("weekdays", ["M", "TU", "W", "TH", "F"]);
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
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
    setSelectedCourses(prev => {
      const exists = prev.find(c => c.regno === course.regno);
      if (exists) {
        return prev.filter(c => c.regno !== course.regno);
      }
      return [...prev, { ...course, color: getRandomColor() }];
    });
  };

  const toggleSchedule = (value: string) => {
    setSelectedSchedules(prev => {
      let newSchedules;
      if (prev.includes(value)) {
        newSchedules = prev.filter(s => s !== value);
      } else {
        newSchedules = [...prev, value];
      }
      setFilters(prevFilters => ({ ...prevFilters, schedule: newSchedules.join(',') }));
      return newSchedules;
    });
  };

  const periods = [1, 2, 3, 4, 5, 6, 7];

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
    <Container fluid p="md" style={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#1A1B1E' : '#F8F9FA' }}>
      <Box mb="md">
        <Group justify="space-between">
          <Title order={2}>科目検索</Title>
          <Button component={Link} href="/" variant="filled" color="teal">
            戻る
          </Button>
        </Group>
      </Box>

      <Grid gutter="xl">
        {/* 左边搜索栏 - 修正后的紧凑布局 */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper shadow="sm" p="md" withBorder style={{ position: 'sticky', top: '1rem' }}>
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Grid gutter={4}>
                  {/* 并排显示的筛选条件 */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="レベル"
                      placeholder="選択"
                      size="xs"
                      data={[
                        { value: "1", label: "100" },
                        { value: "2", label: "200" },
                        { value: "3", label: "300" }
                      ]}
                      value={filters.level || ''}
                      onChange={(value) => setFilters(prev => ({ ...prev, level: value || '' }))}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="言語"
                      placeholder="選択"
                      size="xs"
                      data={[
                        { value: "E", label: "英語" },
                        { value: "J", label: "日本語" }
                      ]}
                      value={filters.lang || ''}
                      onChange={(value) => setFilters(prev => ({ ...prev, lang: value || '' }))}
                    />
                  </Grid.Col>

                  {/* 单列显示的筛选条件 */}
                  {['regno', 'no', 'j', 'e'].map(filter => (
                    <Grid.Col key={filter} span={12}>
                      <TextInput
                        label={filterLabels[filter]}
                        placeholder={`${filterLabels[filter]}...`}
                        size="xs"
                        value={filters[filter] || ''}
                        onChange={handleInputChange(filter)}
                      />
                    </Grid.Col>
                  ))}
                </Grid>

                {/* 授業時間选择表格 */}
                <Box mt={8}>
                  <TextInput
                    label="授業時間"
                    placeholder="例: 3/M"
                    size="xs"
                    value={filters.schedule || ''}
                    onChange={handleInputChange('schedule')}
                  />
                  <Table
                    withColumnBorders
                    mt={4}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <thead>
                      <tr>
                        {weekdays.map(day => (
                          <th key={day} style={{ padding: '0.25rem', textAlign: 'center' }}>
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
                              <td key={value} style={{ padding: '0.25rem', textAlign: 'center' }}>
                                <Button
                                  variant={isSelected ? "filled" : "outline"}
                                  size="xs"
                                  onClick={() => toggleSchedule(value)}
                                >
                                  {value}
                                </Button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>

                <Button 
                  type="submit" 
                  variant="filled" 
                  color="blue" 
                  size="sm"
                  loading={loading}
                  mt={8}
                >
                  {loading ? "検索中..." : "検索実行"}
                </Button>
                {error && <Alert color="red" variant="light">{error}</Alert>}
              </Stack>
            </form>
          </Paper>
        </Grid.Col>

        {/* 右边 - 搜索结果和已选课程 */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack>
            {/* 搜索结果 */}
            <Paper shadow="sm" p="md" withBorder>
              <Title order={4} mb="md">検索結果</Title>
              <Stack>
                {results.slice(0, visibleCount).map(course => {
                  const isSelected = selectedCourses.some(c => c.regno === course.regno);
                  return (
                    <Paper key={course.regno} shadow="sm" p="md" withBorder>
                      <Group justify="space-between">
                        <Title order={4}>
                          {course.j ? `${course.no} ${course.j}` : `${course.no} ${course.e}`}
                        </Title>
                        <Button variant={isSelected ? "outline" : "filled"} color={isSelected ? "red" : "green"} onClick={() => handleCourseSelect(course)}>
                          {isSelected ? "削除" : "追加"}
                        </Button>
                      </Group>
                      <Text size="sm" c="dimmed">
                        担当教員：{course.instructor || '未定'} | 教室：{course.room || '未定'}
                      </Text>
                      <Group gap="xs" mt="xs">
                        <Text size="xs" c="blue">
                          学期：{course.season}
                        </Text>
                        <Text size="xs" c="blue">
                          専門：{course.no}
                        </Text>
                        <Text size="xs" c="blue">
                          単位：{course.unit}
                        </Text>
                      </Group>
                      {course.schedule && Array.isArray(course.schedule) && course.schedule.length > 0 && (
                        <Text size="sm" mt="xs">
                          授業時間：{course.schedule.join(', ')}
                        </Text>
                      )}
                    </Paper>
                  );
                })}

                {visibleCount < results.length && (
                  <Text ta="center" c="dimmed" mt="md">
                    さらに結果を読み込み中...
                  </Text>
                )}

                {results.length === 0 && !loading && (
                  <Text ta="center" c="dimmed" mt="md">
                    条件に一致する科目が見つかりません
                  </Text>
                )}
              </Stack>
            </Paper>

            {/* 已选课程 */}
            <Paper shadow="sm" p="md" withBorder>
              <Title order={4}>選択した科目 ({selectedCourses.length})</Title>
              {selectedCourses.length > 0 ? (
                <Stack mt="xs" gap="xs">
                  {selectedCourses.map(course => (
                    <Text key={course.regno} size="sm">
                      {course.no} {course.j || course.e}
                    </Text>
                  ))}
                </Stack>
              ) : (
                <Text size="sm" c="dimmed">
                  まだ選択されていません
                </Text>
              )}
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SearchPage;
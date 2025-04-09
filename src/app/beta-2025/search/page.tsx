// src/app/search/page.tsx.tsx
"use client";

import {useEffect, useRef, useState} from 'react';
import {
    ActionIcon,
    Alert,
    Badge,
    Box,
    Button,
    Container,
    Grid,
    Group,
    Modal,
    Paper,
    Radio,
    Select,
    Stack,
    Table,
    Text,
    TextInput,
    Title,
    useMantineColorScheme
} from '@mantine/core';
import {useAtom} from "jotai";
import {IconExternalLink, IconShoppingCart, IconTrash, IconX} from '@tabler/icons-react';
import {selectedCoursesAtom} from "../../../stories/atoms";
import {Course, Schedule} from '../../../types/types';
import {useLocalStorage} from "@/src/utils/classic-2024/useLocalStorage";

// 日本語と英語のフィルターラベル
const filterLabels: Record<string, { j: string; e: string }> = {
    regno: {j: '登録番号', e: 'Registration No.'},
    season: {j: '学期', e: 'Term'},
    ay: {j: '学年度', e: 'Academic Year'},
    no: {j: '科目番号', e: 'Course No.'},
    major: {j: 'メジャー', e: 'Major'},
    level: {j: 'レベル', e: 'Level'},
    lang: {j: '言語', e: 'Language'},
    j: {j: '科目名（日本語）', e: 'Title (Japanese)'},
    e: {j: '科目名（英語）', e: 'Title (English)'},
    room: {j: '教室', e: 'Room'},
    instructor: {j: '担当教員', e: 'Instructor'},
    unit: {j: '単位数', e: 'Credits'},
};

// 使用可能なフィルターキーのリスト
const allowedFilters = Object.keys(filterLabels);

// 検索ページコンポーネント
const SearchPage = () => {
    const {colorScheme} = useMantineColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [results, setResults] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [weekdays] = useLocalStorage<string[]>("weekdays", ["M", "TU", "W", "TH", "F"]);
    const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<'group1' | 'group2' | 'both' | null>(null);
    const [orGroups, setOrGroups] = useState<{ group1: Schedule[], group2: Schedule[] }>({group1: [], group2: []});
    const [language, setLanguage] = useLocalStorage<string>("language", "J");
    const [showSelectedCourses, setShowSelectedCourses] = useState(false);

    // 言語に応じたテキストを返す関数
    const t = (key: string) => {
        return language === 'J' ? filterLabels[key]?.j || key : filterLabels[key]?.e || key;
    };

    // 検索結果を取得する関数
    const fetchResults = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/search?${queryParams}`);
            if (!response.ok) throw new Error(language === 'J' ? '検索に失敗しました' : 'Search failed');
            const data = await response.json();
            setResults(data.result || []);
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : language === 'J' ? '不明なエラー' : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    // フォーム送信時の処理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setVisibleCount(10);
        fetchResults();
    };

    // 入力フィールドの変更を処理する関数
    const handleInputChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        let value = e.target.value;
        if (field !== 'j' && field !== 'e' && field !== 'schedule') {
            value = value.trim();
        }
        setFilters(prev => {
            if (value === '') {
                const newFilters = {...prev};
                delete newFilters[field];
                return newFilters;
            }
            return {...prev, [field]: value};
        });
    };

    // ランダムな色を生成する関数
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

    // 科目選択時の処理
    const handleCourseSelect = (course: Course) => {
        const exists = selectedCourses.find(c => c.regno === course.regno);
        if (exists) {
            setSelectedCourses(prev => prev.filter(c => c.regno !== course.regno));
            return;
        }

        // OR条件のある科目を選択する場合の処理
        const orItems = course.schedule?.filter(item => item.isOR) || [];
        if (orItems.length >= 4) {
            setSelectedCourse(course);
            const group1 = orItems.slice(0, 2);
            const group2 = orItems.slice(2, 4);
            setOrGroups({group1, group2});
            setModalOpen(true);
        } else {
            // 通常の科目選択
            setSelectedCourses(prev => [...prev, {...course, color: getRandomColor()}]);
        }
    };

    // ORグループ選択を確定する関数
    const confirmGroupSelection = () => {
        if (!selectedCourse || !selectedGroup) return;

        // 非ORのスケジュール項目を取得
        const nonORItems = selectedCourse.schedule?.filter(item => !item.isOR) || [];

        // 選択されたグループに基づいてスケジュールを追加
        let selectedItems: Schedule[] = [];
        if (selectedGroup === 'group1') {
            selectedItems = orGroups.group1;
        } else if (selectedGroup === 'group2') {
            selectedItems = orGroups.group2;
        } else if (selectedGroup === 'both') {
            selectedItems = [...orGroups.group1, ...orGroups.group2];
        }
        const finalSchedule = [...nonORItems, ...selectedItems];

        const modifiedCourse = {
            ...selectedCourse,
            schedule: finalSchedule,
            color: getRandomColor()
        };

        setSelectedCourses(prev => [...prev, modifiedCourse]);
        setModalOpen(false);
        setSelectedCourse(null);
        setSelectedGroup(null);
        setOrGroups({group1: [], group2: []});
    };

    // スケジュールをフォーマットする関数
    const formatSchedule = (item: Schedule) => {
        return `${item.period}/${item.day}`;
    };

    // スケジュール選択をトグルする関数
    const toggleSchedule = (value: string) => {
        setSelectedSchedules(prev => {
            let newSchedules;
            if (prev.includes(value)) {
                newSchedules = prev.filter(s => s !== value);
            } else {
                newSchedules = [...prev, value];
            }
            setFilters(prevFilters => ({...prevFilters, schedule: newSchedules.join(',')}));
            return newSchedules;
        });
    };

    const periods = [1, 2, 3, 4, 5, 6, 7];
    const seasonToNumber = (season: string) => {
        switch (season) {
            case "Spring":
                return 1;
            case "Autumn":
                return 2;
            case "Winter":
                return 3;
            default:
                return 0;
        }
    };

    // 無限スクロールのためのイベントリスナー設定
    const scrollableRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollableRef.current) return;

            const {scrollTop, clientHeight, scrollHeight} = scrollableRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && visibleCount < results.length) {
                setVisibleCount(prev => prev + 10);
            }
        };

        const currentRef = scrollableRef.current;
        currentRef?.addEventListener('scroll', handleScroll);

        return () => currentRef?.removeEventListener('scroll', handleScroll);
    }, [loading, results.length, visibleCount]);

    return (
        <Container fluid p="md" style={{minHeight: '100vh', backgroundColor: isDarkMode ? '#1A1B1E' : '#F8F9FA'}}>
            <Box mb="md">
                <Group justify="space-between">
                    <Title order={2}>{language === 'J' ? '科目検索' : 'Course Search'}</Title>
                    <Button component={"a"} href="/" variant="filled" color="teal">
                        {language === 'J' ? '戻る' : 'Back'}
                    </Button>
                </Group>
            </Box>

            <Grid gutter="xl">
                {/* 左側の検索フォーム */}
                <Grid.Col span={{base: 12, lg: 4}}>
                    <Paper shadow="sm" p="md" withBorder style={{position: 'sticky', top: '1rem'}}>
                        <form onSubmit={handleSubmit}>
                            <Stack gap={4}>
                                <Grid gutter={4}>
                                    {/* 並べて表示するフィルター */}
                                    <Grid.Col span={{base: 12, sm: 6}}>
                                        <Select
                                            label={t('level')}
                                            placeholder={language === 'J' ? '選択' : 'Select'}
                                            size="xs"
                                            data={[
                                                {value: "1", label: "100"},
                                                {value: "2", label: "200"},
                                                {value: "3", label: "300"}
                                            ]}
                                            value={filters.level || ''}
                                            onChange={(value) => setFilters(prev => ({
                                                ...prev,
                                                level: value || ''
                                            }))}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={{base: 12, sm: 6}}>
                                        <Select
                                            label={t('lang')}
                                            placeholder={language === 'J' ? '選択' : 'Select'}
                                            size="xs"
                                            data={[
                                                {value: "E", label: language === 'J' ? '英語' : 'English'},
                                                {value: "J", label: language === 'J' ? '日本語' : 'Japanese'}
                                            ]}
                                            value={filters.lang || ''}
                                            onChange={(value) => setFilters(prev => ({...prev, lang: value || ''}))}
                                        />
                                    </Grid.Col>

                                    {/* 単一列で表示するフィルター */}
                                    {['regno', 'no', 'j', 'e', 'major', 'instructor', 'season'].map(filter => (
                                        <Grid.Col key={filter} span={12}>
                                            <TextInput
                                                label={t(filter)}
                                                placeholder={`${t(filter)}...`}
                                                size="xs"
                                                value={filters[filter] || ''}
                                                onChange={handleInputChange(filter)}
                                            />
                                        </Grid.Col>
                                    ))}
                                </Grid>

                                {/* 授業時間選択テーブル */}
                                <Box mt={8}>
                                    <TextInput
                                        label={language === 'J' ? '授業時間' : 'Schedule'}
                                        placeholder={language === 'J' ? '例: 3/M' : 'e.g. 3/M'}
                                        size="xs"
                                        value={filters.schedule || ''}
                                        onChange={handleInputChange('schedule')}
                                    />
                                    <Table
                                        withColumnBorders
                                        mt={4}
                                        style={{fontSize: '0.75rem'}}
                                    >
                                        <thead>
                                        <tr>
                                            {weekdays.map(day => (
                                                <th key={day} style={{padding: '0.25rem', textAlign: 'center'}}>
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
                                                        <td key={value}
                                                            style={{padding: '0.25rem', textAlign: 'center'}}>
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
                                    {loading ? (language === 'J' ? "検索中..." : "Searching...") : language === 'J' ? "検索実行" : "Search"}
                                </Button>
                                {error && <Alert color="red" variant="light">{error}</Alert>}
                            </Stack>
                        </form>
                    </Paper>
                </Grid.Col>

                {/* 右側の検索結果と選択科目 */}
                <Grid.Col span={{base: 12, lg: 8}}>
                    <Stack>
                        {/* 検索結果セクション */}
                        <Paper shadow="sm" p="md" withBorder>
                            <Title order={4} mb="md">{language === 'J' ? '検索結果' : 'Search Results'}</Title>
                            {/* Scrollable container */}
                            <Stack
                                ref={scrollableRef}
                                style={{
                                    overflowY: 'auto',
                                    maxHeight: 'calc(120vh - 10px)',
                                    paddingRight: '8px'
                                }}
                            >
                                {results.slice(0, visibleCount).map(course => {
                                    const isSelected = selectedCourses.some(c => c.regno === course.regno);
                                    return (
                                        <Paper key={course.regno} shadow="sm" p="md" withBorder>
                                            {/* グリッドレイアウトを使用 */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr auto', // 左側は可変幅、右側はコンテンツ幅に合わせる
                                                gap: '16px',
                                                alignItems: 'flex-start' // 上部揃え
                                            }}>
                                                {/* 左側コンテンツ */}
                                                <div>
                                                    <Title order={4}>
                                                        {language === 'J'
                                                            ? `${course.no} ${course.j || course.e}`
                                                            : `${course.no} ${course.e || course.j}`}
                                                    </Title>

                                                    {/* 講師情報と教室情報 */}
                                                    <Text size="sm" c="dimmed">
                                                        {
                                                            language === 'J'
                                                                ? `担当教員：${course.instructor === "NULL" ? '未定' : course.instructor}`
                                                                : `Instructor: ${course.instructor === "NULL" ? 'TBA' : course.instructor}`
                                                        } | {
                                                        language === 'J'
                                                            ? `教室：${course.room === "NULL" ? '未定' : course.room}`
                                                            : `Room: ${course.room === "NULL" ? 'TBA' : course.room}`
                                                    }
                                                    </Text>

                                                    {/* 基本情報（学期/専門/単位） */}
                                                    <Group gap="xs" mt="xs">
                                                        <Text size="xs" c="blue">
                                                            {language === 'J' ? `学期：${course.season}` : `Term: ${course.season}`}
                                                        </Text>
                                                        <Text size="xs" c="blue">
                                                            {language === 'J' ? `専門：${course.no}` : `Major: ${course.no}`}
                                                        </Text>
                                                        <Text size="xs" c="blue">
                                                            {language === 'J' ? `単位：${course.unit}` : `Credits: ${course.unit}`}
                                                        </Text>
                                                    </Group>

                                                    {/* 授業スケジュール表示 */}
                                                    {course.schedule && Array.isArray(course.schedule) && course.schedule.length > 0 && (
                                                        <Text size="sm" mt="xs">
                                                            {language === 'J' ? '授業時間：' : 'Schedule: '}{course.schedule
                                                            .map((item: any) =>
                                                                item.isSuper ? `*${item.period}/${item.day}` : `${item.period}/${item.day}`
                                                            )
                                                            .join(', ')}
                                                        </Text>
                                                    )}
                                                </div>

                                                {/* 右側ボタングループ */}
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column', // 縦並び
                                                    gap: '8px', // ボタン間隔
                                                    alignItems: 'flex-end' // 右揃え
                                                }}>
                                                    {/* 追加/削除ボタン */}
                                                    <Button
                                                        variant={isSelected ? "outline" : "filled"}
                                                        color={isSelected ? "red" : "green"}
                                                        onClick={() => handleCourseSelect(course)}
                                                    >
                                                        {isSelected ? (language === 'J' ? "削除" : "Remove") : language === 'J' ? "追加" : "Add"}
                                                    </Button>

                                                    {/* シラバスリンクボタン */}
                                                    <Button
                                                        color="gray"
                                                        data-autofocus
                                                        component="a"
                                                        href={`https://campus.icu.ac.jp/public/ehandbook/PreviewSyllabus.aspx?regno=${
                                                            course.regno
                                                        }&year=${course.ay}&term=${seasonToNumber(course.season)}`}
                                                        target="_blank"
                                                        style={{
                                                            width: 40,  // 正方形ボタン
                                                            height: 40,
                                                            padding: 0, // 余白削除
                                                            display: 'flex',
                                                            alignItems: 'center', // 垂直中央揃え
                                                            justifyContent: 'center', // 水平中央揃え
                                                        }}
                                                    >
                                                        <IconExternalLink/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Paper>
                                    );
                                })}

                                {visibleCount < results.length && (
                                    <Text ta="center" c="dimmed" mt="md">
                                        {language === 'J' ? 'さらに結果を読み込み中...' : 'Loading more results...'}
                                    </Text>
                                )}

                                {results.length === 0 && !loading && (
                                    <Text ta="center" c="dimmed" mt="md">
                                        {language === 'J' ? '条件に一致する科目が見つかりません' : 'No courses match your criteria'}
                                    </Text>
                                )}
                            </Stack>
                        </Paper>

                        {/* 選択科目セクション */}
                        {/* フローティングボタンと選択科目パネル */}
                        <div style={{
                            position: 'fixed',
                            right: '20px',
                            bottom: '20px',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '10px',
                            flexDirection: 'row-reverse'
                        }}>
                            {/* フローティングボタン */}
                            <Button
                                onClick={() => setShowSelectedCourses(!showSelectedCourses)}
                                style={{
                                    borderRadius: '50%',
                                    width: '45px',
                                    height: '45px',
                                    padding: '0',
                                    overflow: 'visible'
                                }}
                            > <IconShoppingCart size="1.4rem"/>
                                {selectedCourses.length > 0 && (
                                    <Badge
                                        color="red"
                                        variant="filled"
                                        circle
                                        style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            pointerEvents: 'none',
                                            minWidth: '18px',
                                            height: '18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {selectedCourses.length}
                                    </Badge>
                                )}
                            </Button>

                            {/* 選択科目パネル（条件付き表示） */}
                            {showSelectedCourses && (
                                <Paper
                                    shadow="lg"
                                    p="md"
                                    withBorder
                                    style={{
                                        width: 'min(400px, 90vw)',
                                        maxHeight: '60vh',
                                        overflow: 'auto',
                                        marginRight: '10px'
                                    }}
                                >
                                    <Group justify="space-between" align="center" mb="sm" wrap="nowrap">
                                        <Title order={4} style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {language === 'J' ? '選択した科目' : 'Selected Courses'} ({selectedCourses.length})
                                        </Title>
                                        <ActionIcon
                                            variant="subtle"
                                            onClick={() => setShowSelectedCourses(false)}
                                            aria-label={language === 'J' ? '閉じる' : 'Close'}
                                            style={{flexShrink: 0}}
                                        >
                                            <IconX size={18}/>
                                        </ActionIcon>
                                    </Group>

                                    {selectedCourses.length > 0 ? (
                                        <Stack gap="xs">
                                            {selectedCourses.map(course => (
                                                <Group key={course.regno} justify="space-between" wrap="nowrap">
                                                    <Text size="sm" style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        flex: 1
                                                    }}>
                                                        {language === 'J'
                                                            ? `${course.no} ${course.j || course.e}`
                                                            : `${course.no} ${course.e || course.j}`
                                                        }
                                                    </Text>
                                                    <ActionIcon
                                                        color="red"
                                                        variant="subtle"
                                                        onClick={() => handleCourseSelect(course)}
                                                        aria-label={language === 'J' ? '削除' : 'Remove'}
                                                        style={{flexShrink: 0}}
                                                    >
                                                        <IconTrash size={16}/>
                                                    </ActionIcon>
                                                </Group>
                                            ))}
                                        </Stack>
                                    ) : (
                                        <Text size="sm" c="dimmed">
                                            {language === 'J' ? 'まだ選択されていません' : 'No courses selected yet'}
                                        </Text>
                                    )}
                                </Paper>
                            )}
                        </div>

                    </Stack>
                </Grid.Col>
            </Grid>

            {/* ORスケジュール選択モーダル */}
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title={language === 'J' ? "演習時間の選択" : "Select Exercise Periods"}
                centered
                size="md"
            >
                <Stack>
                    <Box>
                        <Text fw={500} mb="sm">
                            {language === 'J' ? "講義時間:" : "Lecture Periods:"}
                        </Text>
                        {selectedCourse?.schedule
                            ?.filter(item => !item.isOR)
                            .map(item => (
                                <Text key={`${item.day}-${item.period}`} size="sm" mb="xs">
                                    {formatSchedule(item)}
                                </Text>
                            ))}
                    </Box>

                    <Text>
                        {language === 'J'
                            ? "この科目には選択可能な演習時間があります。いずれかのグループを選択してください:"
                            : "This course has selectable exercise periods. Please choose one of the following groups:"}
                    </Text>

                    <Radio.Group
                        value={selectedGroup || ''}
                        onChange={(value) => setSelectedGroup(value as 'group1' | 'group2' | 'both')}
                        name="orGroupSelection"
                        label={language === 'J' ? "選択可能な演習時間" : "Selectable Exercise Periods"}
                    >
                        <Stack mt="sm">
                            <Radio
                                value="group1"
                                label={
                                    <Text size="sm">
                                        {language === 'J' ? '選択1: ' : 'Choice 1: '}{orGroups.group1.map(item => formatSchedule(item)).join(', ')}
                                    </Text>
                                }
                            />
                            <Radio
                                value="group2"
                                label={
                                    <Text size="sm">
                                        {language === 'J' ? '選択2: ' : 'Choice 2: '}{orGroups.group2.map(item => formatSchedule(item)).join(', ')}
                                    </Text>
                                }
                            />
                            <Radio
                                value="both"
                                label={
                                    <Text size="sm">
                                        {language === 'J' ? '一旦放置（両方選択）: ' : 'Tentative (Select Both): '}{[...orGroups.group1, ...orGroups.group2].map(item => formatSchedule(item)).join(', ')}
                                    </Text>
                                }
                            />
                        </Stack>
                    </Radio.Group>

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="filled"
                            onClick={confirmGroupSelection}
                            disabled={!selectedGroup}
                        >
                            {language === 'J' ? '選択を確定' : 'Confirm'}
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    );
};

export default SearchPage;
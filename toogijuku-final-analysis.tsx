import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const batterData = [
  { name: '木村 紡翔', position: '三', 
    results: ['二ゴ', '中安', '中飛', '左飛', '中直', '左安', '三振', 'ニゴ', '中飛', '左飛', '中直', '左安', '四球']},
  { name: '鎌田 隼輔', position: '中', 
    results: ['三振', '左安', '二ゴ', '左安', '二ゴ', '左安', '空三振', '左安', 'ニゴ', '左安', 'ニゴ', '四球']},
  { name: '長谷川 依吹', position: '左', 
    results: ['三振', '四球', '三飛', '右飛', '中二', '右飛', '三振', '四球', '三飛', '右飛', '中二', '右飛']},
  { name: '佐藤 惺南', position: '遊', 
    results: ['四球', '右安', '中安', '左飛', '右適時打', '右安', '三振', '右安', '中安', '左飛', '右適時打', '右安']},
  { name: '本多 茂仁', position: '右投', 
    results: ['中安', '二飛', '左飛', '三振', '右適時打', '中安', '二飛', '左飛', '三振', '右適時打']},
  { name: '角田 大和', position: '二', 
    results: ['左安', '遊ゴ', '中飛', '二ゴ', '中飛', '右飛', '三振', '遊ゴ', '中飛', '二ゴ', '中飛']},
  { name: '一戸 春翔', position: '右', 
    results: ['三振', '死球']},
  { name: '佐藤 徹昌', position: '一', 
    results: ['右二', '投ゴ', '左安', '二ゴ', '右飛', '三飛', '三振', '投ゴ', '左安', '二ゴ', '右飛']},
  { name: '齋藤 迅汰', position: '捕', 
    results: ['死球', '三振', '三振', '捕邪', '二ゴ', '三振', '三振', '捕邪', '二ゴ']},
  { name: '成田 玲央', position: '投', 
    results: ['右飛', '投ゴ', '三振', '遊ゴ', '捕邪']},
  { name: '成田 星翔', position: '左', 
    results: ['四球', '右適時打']},
  { name: '藤田 海会', position: '打', 
    results: ['遊併']}
];

const processResults = (results) => {
  const hit = results.filter(r => r.includes('安') || r.includes('二') || r.includes('三') || r.includes('本') || r.includes('適時打')).length;
  const walks = results.filter(r => r.includes('四球') || r.includes('死球')).length;
  const outs = results.length - hit - walks;
  return { hit, walks, outs };
};

const BattingResultChart = () => {
  const processedData = batterData.map(batter => ({
    name: batter.name,
    ...processResults(batter.results)
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">2試合総合打撃結果分析</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hit" name="安打" fill="#8884d8" />
          <Bar dataKey="walks" name="四死球" fill="#82ca9d" />
          <Bar dataKey="outs" name="アウト" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const HitDirectionChart = () => {
  const processHitDirection = (results) => {
    const directions = { left: 0, center: 0, right: 0 };
    results.forEach(result => {
      if (result.includes('左')) directions.left++;
      else if (result.includes('中')) directions.center++;
      else if (result.includes('右')) directions.right++;
    });
    return directions;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">2試合総合打球方向分析</h2>
      <div className="flex flex-wrap justify-center">
        {batterData.map((batter, index) => {
          const hitDirection = processHitDirection(batter.results);
          return (
            <div key={index} className="m-2">
              <h3 className="text-center mb-2">{batter.name}</h3>
              <PieChart width={200} height={200}>
                <Pie
                  data={[
                    { name: '左', value: hitDirection.left },
                    { name: '中', value: hitDirection.center },
                    { name: '右', value: hitDirection.right }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {Object.entries(hitDirection).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FinalAnalysis = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">東奥義塾 最終詳細分析ダッシュボード</h1>
      <BattingResultChart />
      <HitDirectionChart />
    </div>
  );
};

export default FinalAnalysis;

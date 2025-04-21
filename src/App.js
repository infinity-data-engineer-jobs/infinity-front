import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// 주요 업무 데이터
const workLabels = [
  "ETL/ELT 파이프라인을 설계하고 자동화해요.",
  "분산 처리 시스템(Hadoop, Spark 등)을 구축하고 최적화해요.",
  "클라우드 기반 인프라와 컨테이너 환경을 구축하고 운영해요.",
  "BI 시스템을 개발하고 데이터 분석 환경을 지원해요.",
  "백엔드 시스템을 개발하고 데이터 서비스를 연계해요."
];
const workValues = [10, 8, 6, 4, 7];

// 주요 우대사항 데이터
const preferLabels = [
  "관련 대회에서 입상한 경험이 있어요.",
  "Git/Github를 활용해 협업한 경험이 있어요.",
  "해당 분야의 석사/박사 학위를 보유하고 있어요.",
  "원활한 커뮤니케이션 능력을 갖추고 있어요.",
  "AWS 환경에서 작업한 경험이 있어요.",
  "대용량 트래픽을 처리한 경험이 있어요.",
  "스트리밍 데이터를 처리한 경험이 있어요."
];
const preferValues = [10, 8, 6, 4, 7, 11, 7];

// 회사 규모 데이터 (세로 막대)
const sizeLabels = ['0~20명', '21~50명', '51~100명', '101~300명', '301~1000명', '1000명 이상'];
const sizeValues = [5, 8, 6, 9, 7, 4];

// 기술 스택 데이터 (세로 막대)
const stackLabels = ['SQL', 'Python', 'Airflow', 'Kubernetes', 'Docker'];
const stackValues = [10, 9, 8, 7, 8];

export default function App() {
  const workRef = useRef(null);
  const preferRef = useRef(null);
  const sizeRef = useRef(null);
  const stackRef = useRef(null);

  const [workGradient, setWorkGradient] = useState(null);
  const [preferGradient, setPreferGradient] = useState(null);
  const [sizeGradient, setSizeGradient] = useState(null);
  const [stackGradient, setStackGradient] = useState(null);

  useEffect(() => {
    const workChart = workRef.current;
    if (workChart) {
      const ctx1 = workChart.ctx;
      const grad1 = ctx1.createLinearGradient(0, 0, 0, workChart.height);
      grad1.addColorStop(0, '#d299c1');
      grad1.addColorStop(1, '#fef9d7');
      setWorkGradient(grad1);
    }

    const preferChart = preferRef.current;
    if (preferChart) {
      const ctx2 = preferChart.ctx;
      const grad2 = ctx2.createLinearGradient(0, 0, 0, preferChart.height);
      grad2.addColorStop(0, '#d299c1');
      grad2.addColorStop(1, '#fef9d7');
      setPreferGradient(grad2);
    }

    const sizeChart = sizeRef.current;
    if (sizeChart) {
      const ctx3 = sizeChart.ctx;
      const grad3 = ctx3.createLinearGradient(0, 0, 0, sizeChart.height);
      grad3.addColorStop(0, '#d299c1');
      grad3.addColorStop(1, '#fef9d7');
      setSizeGradient(grad3);
    }

    const stackChart = stackRef.current;
    if (stackChart) {
      const ctx4 = stackChart.ctx;
      const grad4 = ctx4.createLinearGradient(0, 0, 0, stackChart.height);
      grad4.addColorStop(0, '#d299c1');
      grad4.addColorStop(1, '#fef9d7');
      setStackGradient(grad4);
    }
  }, []);

  const workData = {
    labels: workLabels,
    datasets: [
      {
        label: 'category',
        data: workValues,
        backgroundColor: workGradient,
        barThickness: 53,
        borderRadius: 35,
      }
    ]
  };

  const preferData = {
    labels: preferLabels,
    datasets: [
      {
        label: 'category',
        data: preferValues,
        backgroundColor: preferGradient,
        barThickness: 33,
        borderRadius: 50,
      }
    ]
  };

  const sizeData = {
    labels: sizeLabels,
    datasets: [
      {
        label: 'category',
        data: sizeValues,
        backgroundColor: sizeGradient,
        barThickness: 50,
        borderRadius: 20,
      }
    ]
  };

  const stackData = {
    labels: stackLabels,
    datasets: [
      {
        label: 'category',
        data: stackValues,
        backgroundColor: stackGradient,
        barThickness: 50,
        borderRadius: 20,
      }
    ]
  };

  const commonOptions = {
    indexAxis: 'y',  // 기본 가로 방향
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        categoryPercentage: 0.5,
        barPercentage: 1.0,
      }
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'start',
        align: 'end',
        color: '#3e3866',
        font: {
          weight: '370',
          size: 15.5,
        },
        formatter: (_, ctx) => ctx.chart.data.labels[ctx.dataIndex],
        clip: false,
        padding: { left: 15 },
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center text-center p-8 pt-52 font-pretendard"
      style={{ backgroundImage: "url('/img/background.png')" }}
    >
      {/* Hero Section */}
      <h1 className="text-5xl font-semibold text-black mb-4">
        그래서, 데이터 엔지니어가 뭔데?
      </h1>
      <p className="text-xl font-light text-black mb-16">
        데이터 엔지니어? 저희가 알려드릴게요! 직접 데이터로 확인해볼까요?
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mt-40">
        {/* Card 1 - 주요 업무 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">주요 업무</h2>
          <p className="text-gray-600 text-lg">
            데이터 엔지니어가 주로 하는 일이에요.
          </p>
          <div className="w-full h-80 mt-4">
            <Bar ref={workRef} data={workData} options={commonOptions} />
          </div>
        </div>

        {/* Card 2 - 우대 사항 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">우대 사항</h2>
          <p className="text-gray-600 text-lg">
            이런 조건을 갖추면 더 눈길을 끌 수 있어요.
          </p>
          <div className="w-full h-80 mt-4">
            <Bar ref={preferRef} data={preferData} options={commonOptions} />
          </div>
        </div>
        <div className="md:col-span-2 h-2"></div>
        {/* Card 3 - 회사 규모 (세로막대) */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">회사 규모</h2>
          <p className="text-gray-600 text-lg">
            데이터 엔지니어를 찾는 회사들의 규모를 정리했어요.
          </p>
          <div className="w-full h-80 mt-4">
            <Bar ref={sizeRef} data={sizeData} options={{ ...commonOptions, indexAxis: 'x' }} />
          </div>
        </div>

        {/* Card 4 - 기술 스택 (세로막대) */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">기술 스택</h2>
          <p className="text-gray-600 text-lg">
            데이터 엔지니어에게 많이 요구하는 기술을 모아봤어요.
          </p>
          <div className="w-full h-80 mt-4">
            <Bar ref={stackRef} data={stackData} options={{ ...commonOptions, indexAxis: 'x' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

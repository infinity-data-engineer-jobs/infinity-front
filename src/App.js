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
import WordCloud from 'react-d3-cloud'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function App() {
  const workRef = useRef(null);
  const preferRef = useRef(null);
  const sizeRef = useRef(null);
  const stackRef = useRef(null);

  const [workLabels, setWorkLabels] = useState([]);
  const [workValues, setWorkValues] = useState([]);
  const [workGradient, setWorkGradient] = useState(null);

  const [preferLabels, setPreferLabels] = useState([]);
  const [preferValues, setPreferValues] = useState([]);
  const [preferGradient, setPreferGradient] = useState(null);

  const [sizeLabels, setSizeLabels] = useState([]);
  const [sizeValues, setSizeValues] = useState([]);
  const [sizeGradient, setSizeGradient] = useState(null);

  const [stackLabels, setStackLabels] = useState([]);
  const [stackValues, setStackValues] = useState([]);
  const [stackGradient, setStackGradient] = useState(null);

  const [stackWordCloudData, setStackWordCloudData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // Fetch data from API for work chart
    const fetchWorkData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/mainWorkChartData/');
        const data = await response.json();
        
        const labelMapping = {
          1: "ETL/ELT 파이프라인을 설계하고 자동화해요.",
          2: "분산 처리 시스템(Hadoop, Spark 등)을 구축하고 최적화해요.",
          3: "클라우드 기반 인프라와 컨테이너 환경을 구축하고 운영해요.",
          4: "BI 시스템을 개발하고 데이터 분석 환경을 지원해요.",
          5: "백엔드 시스템을 개발하고 데이터 서비스를 연계해요.",
          6: "딥러닝/머신러닝 역량을 개발하고 적용해요."
        };

        const filteredData = data
        .filter(item => item.label !== 0)
        .sort((a, b) => b.total - a.total); // 내림차순 정렬
        
        const labels = filteredData.map(item => labelMapping[item.label] || "Unknown");
        const values = filteredData.map(item => item.total);

        setWorkLabels(labels);
        setWorkValues(values);

        const workChart = workRef.current;
        if (workChart) {
          const ctx1 = workChart.ctx;
          const grad1 = ctx1.createLinearGradient(0, 0, 0, workChart.height);
          grad1.addColorStop(0, '#d299c1');
          grad1.addColorStop(1, '#fef9d7');
          setWorkGradient(grad1);
        }
      } catch (error) {
        console.error('Error fetching data for work chart:', error);
      }
    };

    fetchWorkData();

    // Fetch data for preferred qualifications chart
    const fetchPreferData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/preferredQualificationData/');
        const data = await response.json();
    
        const sortedData = data.sort((a, b) => b.frequency - a.frequency); // 내림차순 정렬
    
        const labels = sortedData.map(item => item.representative_sentence);
        const values = sortedData.map(item => item.frequency);
    
        setPreferLabels(labels);
        setPreferValues(values);
    
        const preferChart = preferRef.current;
        if (preferChart) {
          const ctx2 = preferChart.ctx;
          const grad2 = ctx2.createLinearGradient(0, 0, 0, preferChart.height);
          grad2.addColorStop(0, '#d299c1');
          grad2.addColorStop(1, '#fef9d7');
          setPreferGradient(grad2);
        }
      } catch (error) {
        console.error('Error fetching data for preferred qualification chart:', error);
      }
    };

    fetchPreferData();

    // Fetch company size data
    const fetchSizeData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/headcountDistributionData/');
        const data = await response.json();
  
        // Extract labels (categories) and values (counts)
        const labels = Object.keys(data);  // 범주 이름 ("0~200", "200~400" 등)
        const values = Object.values(data);  // 각 범주에 해당하는 개수 (10, 15, 12 등)
  
        setSizeLabels(labels);
        setSizeValues(values);
  
        const sizeChart = sizeRef.current;
        if (sizeChart) {
          const ctx3 = sizeChart.ctx;
          const grad3 = ctx3.createLinearGradient(0, 0, 0, sizeChart.height);
          grad3.addColorStop(0, '#d299c1');
          grad3.addColorStop(1, '#fef9d7');
          setSizeGradient(grad3);
        }
      } catch (error) {
        console.error('Error fetching data for company size chart:', error);
      }
    };
  

    fetchSizeData();

    // Fetch data for tech stack chart (tech_Stack_data)
    const fetchStackData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/tech_Stack_data/');
        const data = await response.json();

        // 데이터를 내림차순으로 정렬 (value 기준)
        const sortedData = Object.entries(data)
          .sort((a, b) => b[1] - a[1]);  // 내림차순으로 정렬

        // 상위 10개만 추출
        const top10Data = sortedData.slice(0, 10);

        // 상위 10개의 기술 스택 이름과 개수 추출
        const labels = top10Data.map(item => item[0]);  // 기술 스택 이름
        const values = top10Data.map(item => item[1]);  // 기술 스택 개수

        // 상태 업데이트
        setStackLabels(labels);
        setStackValues(values);

        // 차트 그라디언트 설정
        const stackChart = stackRef.current;
        if (stackChart) {
          const ctx4 = stackChart.ctx;
          const grad4 = ctx4.createLinearGradient(0, 0, 0, stackChart.height);
          grad4.addColorStop(0, '#d299c1');
          grad4.addColorStop(1, '#fef9d7');
          setStackGradient(grad4);
        }

        // `react-d3-cloud`의 형식에 맞게 데이터 변환
        const wordCloudData = top10Data.map(item => ({
          text: item[0], // 기술 스택 이름
          value: item[1] // 해당 기술의 빈도수
        }));

        setStackWordCloudData(wordCloudData);  // Store the word cloud data
        setLoading(false);  // 데이터 로드 완료 후 로딩 상태 변경
      } catch (error) {
        console.error('Error fetching data for tech stack chart:', error);
        setLoading(false);  // 로딩 중 오류가 나도 종료
      }
    };

    fetchStackData();
  }, []);

  // Word cloud 옵션 설정
  const wordCloudOptions = {
    fontSize: (word) => Math.log(word.value) * 10 + 10,  // 글꼴 크기 계산
    rotate: (word) => (word.value % 2 === 0 ? 0 : 90),   // 회전 설정
    padding: 5,  // 단어 간 간격
  };

  const workData = {
    labels: workLabels,
    datasets: [
      {
        label: 'category',
        data: workValues,
        backgroundColor: workGradient,
        barThickness: 43,
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
        barThickness: 43,
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
        barThickness: 43,
        borderRadius: 50,
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
        barThickness: 10,
        borderRadius: 50,
      }
    ]
  };

  const commonOptions = {
    indexAxis: 'y',
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
        {/* <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">기술 스택</h2>
          <p className="text-gray-600 text-lg">
            데이터 엔지니어에게 많이 요구하는 기술을 모아봤어요.
          </p>
          <div className="w-full h-80 mt-4">
            <Bar ref={stackRef} data={stackData} options={{ ...commonOptions, indexAxis: 'x' }} />
          </div>
        </div> */}

        {/* Card 5 - 기술 스택 워드 클라우드 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard h-[470px] overflow-hidden">
          <h2 className="text-2xl font-semibold mb-2">기술 스택 워드 클라우드</h2>
          <p className="text-gray-600 text-lg">
            데이터 엔지니어에게 중요한 기술을 워드 클라우드로 확인해봐요.
          </p>
          <div className="w-full h-[370px] mt-4">
            {loading ? (
              <p>로딩 중...</p>
            ) : stackWordCloudData && stackWordCloudData.length > 0 ? (
              <WordCloud
                data={stackWordCloudData}
                font="Pretendard"
                fontSize={(word) => Math.log(word.value) * 10 + 10}
                rotate={(word) => (word.value % 2 === 0 ? 0 : 90)}
                padding={5}
                width={400} // 워드 클라우드 크기 제한
                height={300} // 워드 클라우드 크기 제한
              />
            ) : (
              <p>데이터가 로드되지 않았습니다.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

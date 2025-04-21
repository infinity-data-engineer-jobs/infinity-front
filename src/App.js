export default function App() {
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
        {/* Card 1 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard  h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">주요 업무</h2>
          <p className="text-gray-600">
            데이터 엔지니어가 주로 하는 일이에요.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard  h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">우대 사항</h2>
          <p className="text-gray-600">
          이런 조건을 갖추면 더 눈길을 끌 수 있어요.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard  h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">회사 규모</h2>
          <p className="text-gray-600">
            데이터 엔지니어를 찾는 회사들의 규모를 정리했어요.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white bg-opacity-40 rounded-3xl p-6 shadow-md text-left font-pretendard  h-[470px]">
          <h2 className="text-2xl font-semibold mb-2">기술 스택</h2>
          <p className="text-gray-600">
          데이터 엔지니어에게 많이 요구하는 기술을 모아봤어요.
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hook/useFetchData";

import Loading from "../components/Loading";
import Error from "../components/Error";
import Chart from "../components/Chart";

const ChartList = () => {
  const yesterday = new Date(); // 오늘 날짜
  yesterday.setDate(yesterday.getDate() - 1); // 오늘 데이터 아직 수집 안되어서 하루 전날인 - 1

  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(yesterday);

  const formattedDate = selectedDate.toISOString().split("T")[0];
  const url = `https://raw.githubusercontent.com/webs9919/music-best/main/${id}/${id}100_${formattedDate}.json`;
  const { data, loading, error } = useFetchData(url);

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error message={error.message} />;

  return (
    <Chart
      title={`✨ ${id} Chart Top100`}
      data={data}
      showCalendar={true}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      minDate={new Date("2024-05-01")}
      maxDate={yesterday}
    />
  );
};

export default ChartList;

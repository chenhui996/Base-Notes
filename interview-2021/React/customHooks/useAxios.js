import React, { useState, useEffect } from "react";
import axios from "axios";

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // 利用 axios 发送网络请求
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false)); // 发送一个 get 请求，返回一个Promise
  }, [url]);

  return [loading, data, error];
}

export default useAxios;

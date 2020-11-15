import { useState, useEffect } from "react";

const usePagination = (target) => {
  const [page, setPage] = useState(0);

  const checkIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      setPage((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0.8 });
      observer.observe(target);
    }
  }, [target]);

  return page;
};

export default usePagination;

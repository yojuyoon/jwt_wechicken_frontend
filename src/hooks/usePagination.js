import { useEffect } from "react";

const usePagination = (target, handleFunction) => {
  const checkIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && entry.intersectionRatio !== 1) {
      observer.unobserve(entry.target);
      await handleFunction();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0.2 });
      observer.observe(target);
    } else {
      handleFunction();
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line
  }, [target]);
};

export default usePagination;

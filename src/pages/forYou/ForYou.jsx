import { useCallback, useEffect, useRef, useState } from 'react';
import MainSideBar from '../../components/layouts/mainSidebar/MainSidebar';
import ViewMainLayout from '../../components/layouts/viewMainLayout/viewMainLayout';
import { FindingProvider } from '../../contexts/FindingContext';
import styles from './ForYou.module.scss';
import classNames from 'classnames/bind';
import useAxios from '../../service/useAxios';

const cx = classNames.bind(styles);

const PAGE_LIMIT = 10;

const ForYou = () => {
  const axiosInstance = useAxios();

  const [videoIds, setVideoIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideo = useCallback(async () => {
    if (!hasMore) return;
    try {
      const response = await axiosInstance.get(
        `/videos/public/byUser/leomessi14/paged?cursor=${cursor}&limit=${PAGE_LIMIT}`,
      );
      const result = response.data.result;
      setVideoIds((prev) => Array.from(new Set([...prev, ...result.videoIds])));
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (error) {
      console.log(error);
    }
  }, [videoIds.length]);
  console.log(cursor);

  return (
    <div className={cx('wrapper')}>
      <FindingProvider>
        <MainSideBar />
      </FindingProvider>
      {/* <CommentProvider>
        <VideoWrapper  fetchVideo={fetchVideo} hasMore={hasMore} videoIds={videoIds}/>
        <CommentContainer />
      </CommentProvider> */}
      <ViewMainLayout
        fetchVideo={fetchVideo}
        videoIds={videoIds}
        hasMore={hasMore}
      />
    </div>
  );
};

export default ForYou;

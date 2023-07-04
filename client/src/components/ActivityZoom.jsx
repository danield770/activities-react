import { useParams } from 'react-router-dom';
import Activity from './Activity';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { prepareData, formatDate, resourseNameFromPath } from '../util/helper';
import Modal from './Modal';
import { imgMap, imgBgs } from './Images';
import { activityConfig } from '../config/activities';

function ActivityZoom() {
  const { key } = useParams();
  const activities_V1_Endpoint = '/activities/v1';

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(activities_V1_Endpoint);
      console.log({ data });
      const dataWithDisplayName = prepareData(data);

      return dataWithDisplayName;
    },
    queryKey: ['activities'],
  });
  if (!key || !data) return null;
  const {
    resource_type,
    score,
    possible_score,
    product,
    topic_data,
    d_created,
    displayName,
    comment,
  } = data.filter((activity) => activity.id === key)[0];

  //   console.log({ modalData });

  return (
    <>
      <Activity />
      <Modal title={displayName}>
        <div className='modal-content'>
          <div
            className='activity-img'
            style={{
              backgroundColor:
                imgBgs[resourseNameFromPath(topic_data.icon_path)],
            }}
          >
            <img
              alt='activity image'
              src={imgMap[resourseNameFromPath(topic_data.icon_path)]}
            />
            {product === 'bpjr' && <div className='junior-tag'>Jr.</div>}
          </div>
          <h2 className='font-bold activity-name'>{displayName}</h2>
          <div className='activity-date'>{formatDate(d_created, false)}</div>
          <div className='comment'>{comment}</div>
          {activityConfig[resource_type].score && (
            <span className='score'>
              Score{' '}
              <span className='font-bold'>
                {score}/{possible_score}
              </span>
            </span>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ActivityZoom;

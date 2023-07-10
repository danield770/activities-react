import React from 'react';
import { useParams } from 'react-router-dom';
import ActivityV2 from './ActivityV2';
import { useData } from '../hooks/useData';
import { formatDate, resourceNameFromPath } from '../util/helper';
import { prepareDataV2 } from '../util/helperV2';
import Modal from './Modal';
import { imgMap, imgBgs } from './Images';
import { activityConfig } from '../config/activities';

// eslint-disable-next-line react/prop-types
function ActivityZoomV2() {
  const { key } = useParams();

  const activitiesEndpoint = '/activities/v2';
  const queryKey = 'activitiesV2';

  const { data } = useData(activitiesEndpoint, queryKey);
  const dataWithDisplayName = React.useMemo(() => {
    if (!data) return [];

    return prepareDataV2(data);
  }, [data]);

  if (!key || !dataWithDisplayName) return null;

  const {
    resource_type,
    score,
    possible_score,
    product,
    topic_data,
    d_created,
    displayName,
    comment,
  } = dataWithDisplayName
    .reduce((acc, item) => [...acc, ...item.activities], [])
    .filter((item) => item.id === key)[0];

  return (
    <>
      <ActivityV2 />
      <Modal title={displayName} version={2}>
        <div className='modal-content'>
          <div
            className='activity-img'
            style={{
              backgroundColor:
                imgBgs[resourceNameFromPath(topic_data.icon_path)],
            }}
          >
            <img
              alt='activity image'
              src={imgMap[resourceNameFromPath(topic_data.icon_path)]}
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

export default ActivityZoomV2;

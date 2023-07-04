import React from 'react';
import { useParams } from 'react-router-dom';
import Activity from './Activity';
import { useData } from '../hooks/useData';
import { prepareData, formatDate, resourseNameFromPath } from '../util/helper';
import Modal from './Modal';
import { imgMap, imgBgs } from './Images';
import { activityConfig } from '../config/activities';

// eslint-disable-next-line react/prop-types
function ActivityZoom({ api }) {
  const { key } = useParams();

  const activitiesEndpoint =
    api === 'v1'
      ? '/activities/v1'
      : api === 'v2'
      ? '/activities/v2'
      : 'no-url';
  const queryKey =
    api === 'v1' ? 'activities' : api === 'v2' ? 'activitiesV2' : 'error';

  const { data } = useData(activitiesEndpoint, queryKey);
  const dataWithDisplayName = React.useMemo(() => {
    if (!data) return [];

    return prepareData(data);
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
  } = dataWithDisplayName.filter((activity) => activity.id === key)[0];

  return (
    <>
      <Activity api={api} />
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

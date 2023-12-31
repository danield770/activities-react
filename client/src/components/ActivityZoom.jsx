import React from 'react';
import { useParams } from 'react-router-dom';
import Activity from './Activity';
// import ActivityV2 from './Activity';
import { useData } from '../hooks/useData';
import { formatDate, resourceNameFromPath } from '../util/helper';
import { prepareData } from '../util/helperV1';
import Modal from './Modal';
import { imgMap, imgBgs } from './Images';
import { activityConfig } from '../config/activities';

// eslint-disable-next-line react/prop-types
function ActivityZoom() {
  //   const location = useLocation();
  //   const {
  //     resource_type,
  //     score,
  //     possible_score,
  //     product,
  //     topic_data,
  //     d_created,
  //     displayName,
  //     comment,
  //     version,
  //   } = location.state;

  //   console.log({ version, displayName });
  const { key } = useParams();
  const activitiesEndpoint = '/activities/v1';
  const queryKey = 'activities';
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
      {/* {version === 1 && <Activity />} */}
      {/* {version === 2 && <ActivityV2 />} */}
      <Activity />
      <Modal title={displayName}>
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

export default ActivityZoom;

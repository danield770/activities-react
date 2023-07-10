import { extractMonth, formatDate, resourceNameFromPath } from '../util/helper';
import { imgMap, imgBgs } from './Images';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { activityConfig } from '../config/activities';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function MonthlyActivities({ monthData, endPoint, hideActivity }) {
  console.log({ monthData });
  return (
    <>
      {/* eslint-disable-next-line react/prop-types */}
      <div className='month-tag'>{extractMonth(monthData[0].d_created)}</div>
      <ol>
        {/* eslint-disable-next-line react/prop-types */}
        {monthData.map(
          ({
            id,
            resource_type,
            score,
            possible_score,
            product,
            topic_data,
            d_created,
            displayName,
            comment,
          }) => (
            <li
              key={id}
              className='border mb-7 h-36 primary flex justify-between items-center pl-5 pr-10 rounded-md activity-item'
            >
              <div className='activity-media'>
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
                <div className='font-bold activity-name'>
                  {displayName}
                  {/* {buildActivityName(topic_data.name, resource_type)} */}
                </div>
                <div className='activity-date'>
                  {formatDate(d_created, false)}
                </div>
              </div>
              <span className='details'>
                <button className='font-bold' onClick={() => hideActivity(id)}>
                  {<ImEyeBlocked size='20' className='icon-visual' />} Hide
                </button>
                {activityConfig[resource_type].score && (
                  <span className='score'>
                    Score{' '}
                    <span className='font-bold'>
                      {score}/{possible_score}
                    </span>
                  </span>
                )}
                {activityConfig[resource_type].zoom && (
                  <Link
                    to={`${endPoint}/${id}`}
                    state={{
                      resource_type,
                      score,
                      possible_score,
                      product,
                      topic_data,
                      d_created,
                      displayName,
                      comment,
                      // eslint-disable-next-line react/prop-types
                      version: endPoint.includes('v2') ? 2 : 1,
                    }}
                  >
                    <span className='font-bold'>
                      {<ImEye size='20' className='icon-visual' />} View work
                    </span>
                  </Link>
                )}
              </span>
            </li>
          )
        )}
      </ol>
    </>
  );
}

export default MonthlyActivities;

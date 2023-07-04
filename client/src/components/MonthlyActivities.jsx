import { extractMonth, formatDate, resourseNameFromPath } from '../util/helper';
import { imgMap, imgBgs } from './Images';
import { ImEye } from 'react-icons/im';
import { activityConfig } from '../config/activities';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function MonthlyActivities({ monthData }) {
  // console.log({ monthData });
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
                      imgBgs[resourseNameFromPath(topic_data.icon_path)],
                  }}
                >
                  <img
                    alt='activity image'
                    src={imgMap[resourseNameFromPath(topic_data.icon_path)]}
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
                {activityConfig[resource_type].score && (
                  <span className='score'>
                    Score{' '}
                    <span className='font-bold'>
                      {score}/{possible_score}
                    </span>
                  </span>
                )}
                {activityConfig[resource_type].zoom && (
                  <Link to={`/activities/v1/${id}`}>
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

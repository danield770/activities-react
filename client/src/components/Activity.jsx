import React from 'react';
import { Link } from 'react-router-dom';
import {
  sortByMonth,
  extractMonth,
  formatDate,
  // buildActivityName,
  prepareData,
  removeDuplicates,
  resourseNameFromPath,
} from '../util/helper';
import { activityConfig } from '../config/activities';
import { imgMap, imgBgs } from './Images';
import Filters from './Filters';
import Search from './Search';
// import { BsFillCheckCircle } from 'react-icons/bs';
// import { CgCloseO } from 'react-icons/cg';
// import { IoSearch } from 'react-icons/io';
import { ImEye } from 'react-icons/im';

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

function Activity() {
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState('all');
  const [searchFilter, setSearchFilter] = React.useState('');
  const activities_V1_Endpoint = '/activities/v1';

  function changeFilter(filter) {
    setFilter(filter);
  }
  function filterByActivityName(searchText) {
    setSearchFilter(searchText);
  }

  async function fetchData() {
    const result = await fetch(activities_V1_Endpoint);
    const json = await result.json();

    const dataWithDisplayName = prepareData(json);

    setData(dataWithDisplayName);
  }
  console.log({ data });

  React.useEffect(() => {
    fetchData();
  }, []);
  // if (!data.length) return;
  // const sortedData =
  //   filter === 'all'
  //     ? sortByMonth(data)
  //     : sortByMonth(
  //         data.filter((activity) => activity.resource_type === filter)
  //       );

  // const dataWithActivityNames = React.useMemo(() => {
  //   if (!data.length) return [];

  //   return
  //     data.map((activity) =>
  //       ({id: activity.id, name: buildActivityName(activity.topic_data.name, activity.resource_type)})
  //     )
  // }, [data]);

  const sortedData = React.useMemo(() => {
    if (!data.length) return [];
    console.log({ filter });
    console.log({ searchFilter });
    console.log({ data });

    const filteredData =
      filter === 'all'
        ? data
        : data.filter((activity) => activity.resource_type === filter);

    const searchFilteredData =
      searchFilter === ''
        ? filteredData
        : filteredData.filter((activity) =>
            activity.displayName.includes(searchFilter)
          );

    return searchFilteredData.length ? sortByMonth(searchFilteredData) : [];
    // if (filter === 'all') {
    //   return sortByMonth(data);
    // } else {
    //   return sortByMonth(
    //     data.filter((activity) => activity.resource_type === filter)
    //   );
    //}
  }, [data, filter, searchFilter]);

  console.log({ sortedData });

  const activityNames = React.useMemo(() => {
    if (!data.length) return [];
    // const names = data.map((activity) =>
    //   buildActivityName(activity.topic_data.name, activity.resource_type)
    // );
    // console.log({ names });

    // in this data there are no dupes, but in general there probably would be
    return removeDuplicates(
      data.map((activity) => activity.displayName)
    ).sort();
    // return names;
  }, [data]);

  console.log({ activityNames });

  return (
    <div className='max-w-[1600px] m-auto text-primary'>
      <h1 className='text-3xl'>Timeline</h1>
      {/* <div>Filter by:</div>
      <ol className='filters'>
        {Object.keys(activityConfig).map((activity) => (
          <li key={activity} onClick={() => setFilter(activity)}>
            {activityConfig[activity].name}
          </li>
        ))}
      </ol> */}
      <Search
        activityNames={activityNames}
        filterByActivityName={filterByActivityName}
      />
      <Filters
        changeFilter={changeFilter}
        filters={activityConfig}
        currentFilter={filter}
      />

      {sortedData?.length > 0 &&
        sortedData.map((monthData, index) => (
          <MonthlyActivities key={index} monthData={monthData} />
        ))}
      {!sortedData.length && searchFilter && (
        <div>{`No results for activity name '${searchFilter}' with filter '${filter}'`}</div>
      )}
    </div>
  );
}

export default Activity;

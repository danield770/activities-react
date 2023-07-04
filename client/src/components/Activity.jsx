import React from 'react';
import { useData } from '../hooks/useData';
import { sortByMonth, prepareData, removeDuplicates } from '../util/helper';
import { activityConfig } from '../config/activities';
import MonthlyActivities from './MonthlyActivities';
import Filters from './Filters';
import Search from './Search';

// eslint-disable-next-line react/prop-types
function Activity({ api }) {
  const [filter, setFilter] = React.useState('all');
  const [searchFilter, setSearchFilter] = React.useState('');
  const activitiesEndpoint =
    api === 'v1'
      ? '/activities/v1'
      : api === 'v2'
      ? '/activities/v2'
      : 'no-url';
  const queryKey =
    api === 'v1' ? 'activities' : api === 'v2' ? 'activitiesV2' : 'error';

  function changeFilter(filter) {
    setFilter(filter);
  }
  function filterByActivityName(searchText) {
    setSearchFilter(searchText);
  }

  const { data, isLoading } = useData(activitiesEndpoint, queryKey);
  const dataWithDisplayName = React.useMemo(() => {
    if (!data) return [];

    return prepareData(data);
  }, [data]);

  // console.log({ dataWithDisplayName });

  const sortedData = React.useMemo(() => {
    if (!dataWithDisplayName.length) return [];
    // console.log({ filter });
    // console.log({ searchFilter });
    // console.log({ data });

    const filteredData =
      filter === 'all'
        ? dataWithDisplayName
        : dataWithDisplayName.filter(
            (activity) => activity.resource_type === filter
          );

    const searchFilteredData =
      searchFilter === ''
        ? filteredData
        : filteredData.filter((activity) =>
            activity.displayName
              .toLowerCase()
              .includes(searchFilter.toLowerCase())
          );

    return searchFilteredData.length ? sortByMonth(searchFilteredData) : [];
  }, [dataWithDisplayName, filter, searchFilter]);

  // console.log({ sortedData });

  const activityNames = React.useMemo(() => {
    if (!dataWithDisplayName.length) return [];

    // in this data there are no dupes, but in general there probably would be
    return removeDuplicates(
      dataWithDisplayName.map((activity) => activity.displayName)
    ).sort();
  }, [dataWithDisplayName]);

  // console.log({ activityNames });

  if (isLoading) {
    return <div>Data is loading...</div>;
  }

  return (
    <div className='max-w-[1600px] m-auto text-primary'>
      <h1 className='text-3xl'>Timeline</h1>

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

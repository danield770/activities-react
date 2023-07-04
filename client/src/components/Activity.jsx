import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { sortByMonth, prepareData, removeDuplicates } from '../util/helper';
import { activityConfig } from '../config/activities';
import MonthlyActivities from './MonthlyActivities';
import Filters from './Filters';
import Search from './Search';

function Activity() {
  const [filter, setFilter] = React.useState('all');
  const [searchFilter, setSearchFilter] = React.useState('');
  const activities_V1_Endpoint = '/activities/v1';

  function changeFilter(filter) {
    setFilter(filter);
  }
  function filterByActivityName(searchText) {
    setSearchFilter(searchText);
  }

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(activities_V1_Endpoint);
      console.log({ data });
      const dataWithDisplayName = prepareData(data);

      return dataWithDisplayName;
    },
    queryKey: ['activities'],
  });

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    // console.log({ filter });
    // console.log({ searchFilter });
    // console.log({ data });

    const filteredData =
      filter === 'all'
        ? data
        : data.filter((activity) => activity.resource_type === filter);

    const searchFilteredData =
      searchFilter === ''
        ? filteredData
        : filteredData.filter((activity) =>
            activity.displayName
              .toLowerCase()
              .includes(searchFilter.toLowerCase())
          );

    return searchFilteredData.length ? sortByMonth(searchFilteredData) : [];
  }, [data, filter, searchFilter]);

  // console.log({ sortedData });

  const activityNames = React.useMemo(() => {
    if (!data) return [];

    // in this data there are no dupes, but in general there probably would be
    return removeDuplicates(
      data.map((activity) => activity.displayName)
    ).sort();
  }, [data]);

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

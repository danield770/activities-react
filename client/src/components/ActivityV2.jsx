import React from 'react';
import { useData } from '../hooks/useData';
import { removeDuplicates, capSortedData } from '../util/helper';
import {
  sortByMonthV2,
  prepareDataV2,
  getDisplayNames,
} from '../util/helperV2';
import { activityConfig } from '../config/activities';
import MonthlyActivities from './MonthlyActivities';
import Filters from './Filters';
import Search from './Search';
import { HiChevronDown } from 'react-icons/hi';

// eslint-disable-next-line react/prop-types
function ActivityV2() {
  const [filter, setFilter] = React.useState('all');
  const [searchFilter, setSearchFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [hiddenActivities, setHiddenActivities] = React.useState(() => {
    return JSON.parse(localStorage.getItem('hidden')) || [];
  });
  const activitiesEndpoint = '/activities/v2';
  const queryKey = 'activitiesV2';

  function hideActivity(id) {
    const updatedHidden = [...hiddenActivities, id];
    localStorage.setItem('hidden', JSON.stringify(updatedHidden));
    setHiddenActivities(updatedHidden);
  }

  function changeFilter(filter) {
    setFilter(filter);
  }
  function filterByActivityName(searchText) {
    setSearchFilter(searchText);
  }

  const { data, isLoading } = useData(activitiesEndpoint, queryKey);
  const dataWithDisplayName = React.useMemo(() => {
    if (!data) return [];

    return prepareDataV2(data);
  }, [data]);

  const sortedData = React.useMemo(() => {
    if (!dataWithDisplayName.length) return [];

    const nonHiddenActivities = dataWithDisplayName.map((item) => ({
      ...item,
      activities: item.activities.filter(
        (activity) => !hiddenActivities.includes(activity.id)
      ),
    }));

    const filteredData =
      filter === 'all'
        ? nonHiddenActivities
        : nonHiddenActivities.filter(
            (activity) => activity.resource_type === filter
          );

    console.log({ filteredData });

    const searchFilteredData =
      searchFilter === ''
        ? filteredData
        : filteredData.map((item) => {
            return {
              ...item,
              activities: item.activities.filter((activity) =>
                activity.displayName
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase())
              ),
            };
          });

    console.log({ searchFilteredData });

    return searchFilteredData.some((item) => item.activities.length)
      ? sortByMonthV2(
          searchFilteredData.filter((item) => item.activities.length)
        )
      : [];
  }, [dataWithDisplayName, filter, searchFilter, hiddenActivities]);

  console.log({ sortedData });

  const ITEMS_PER_PAGE = 10;
  const total_items = sortedData.length
    ? sortedData.reduce((acc, item) => acc + item.length, 0)
    : 0;
  const numItemsToDisplay = Math.min(total_items, page * ITEMS_PER_PAGE);
  const cappedSortedData = capSortedData(sortedData, numItemsToDisplay);

  console.log({ total_items });
  console.log({ numItemsToDisplay });

  const activityNames = React.useMemo(() => {
    if (!dataWithDisplayName.length) return [];

    // in this data there are no dupes, but in general there probably would be
    return removeDuplicates(getDisplayNames(dataWithDisplayName)).sort();
  }, [dataWithDisplayName]);

  console.log({ activityNames });

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

      {!sortedData.length && searchFilter && (
        <div>{`No results for activity name '${searchFilter}' with filter '${filter}'`}</div>
      )}
      {sortedData?.length > 0 &&
        cappedSortedData.map((monthData, index) => (
          <MonthlyActivities
            key={index}
            monthData={monthData}
            endPoint='/activities/v2'
            hideActivity={hideActivity}
          />
        ))}

      {page < Math.ceil(total_items / ITEMS_PER_PAGE) && (
        <button
          type='button'
          className='load-more'
          onClick={() => setPage(page + 1)}
        >
          <HiChevronDown size='20' className='chevron-down' /> Load more
        </button>
      )}
    </div>
  );
}

export default ActivityV2;

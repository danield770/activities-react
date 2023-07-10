import { buildActivityName, sortByKey, extractMonth } from './helper';

export function prepareDataV2(data) {
  return data.map((item) => ({
    ...item,
    activities: item.activities.map((activity) => ({
      ...activity,
      displayName: buildActivityName(
        activity.topic_data.name,
        item.resource_type
      ),
      resource_type: item.resource_type,
    })),
  }));
}
export function getDisplayNames(data) {
  return data.reduce(
    (acc, item) => [
      ...acc,
      ...item.activities.map((activity) => activity.displayName),
    ],
    []
  );
}

export function sortByMonthV2(arr) {
  const activities = arr.reduce(
    (acc, elem) => [...acc, ...elem.activities],
    []
  );
  const latestActivitiesV2 = sortByKey(activities, 'd_created', true);
  console.log({ latestActivitiesV2 });
  const activitiesByMonth = [];
  let monthlyActivities = [];
  let currentMonth = extractMonth(latestActivitiesV2[0].d_created);

  for (const activity of latestActivitiesV2) {
    if (extractMonth(activity.d_created) === currentMonth) {
      monthlyActivities.push(activity);
    } else {
      currentMonth = extractMonth(activity.d_created);
      activitiesByMonth.push(monthlyActivities);
      monthlyActivities = [activity];
    }
  }
  activitiesByMonth.push(monthlyActivities);
  return activitiesByMonth;
}

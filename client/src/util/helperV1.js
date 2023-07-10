import { buildActivityName, sortByKey, extractMonth } from './helper';

export function sortByMonth(arr) {
  const latestActivities = sortByKey(arr, 'd_created', true);
  console.log({ latestActivities });
  const activitiesByMonth = [];
  let monthlyActivities = [];
  let currentMonth = extractMonth(latestActivities[0].d_created);

  for (const activity of latestActivities) {
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

export function prepareData(data) {
  // console.log({ data });
  return data.map((item) => ({
    ...item,
    displayName: buildActivityName(item.topic_data.name, item.resource_type),
  }));
}

import { activityConfig } from '../config/activities';

export function formatDate(number, isLongMonth = true) {
  const d = new Date(0);
  const dateOptions = {
    year: 'numeric',
    month: isLongMonth ? 'long' : 'short',
    day: 'numeric',
  };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };

  d.setUTCSeconds(number);

  return `${d.toLocaleDateString('en-US', dateOptions)} · ${d
    .toLocaleTimeString('en-US', timeOptions)
    .toLowerCase()}`;
}

function sortByKey(arr, key, isDesc = false) {
  return arr.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (!isDesc) {
      return x < y ? -1 : x > y ? 1 : 0;
    }
    return x > y ? -1 : x < y ? 1 : 0;
  });
}

export function extractMonth(dateNumber) {
  const formattedDate = formatDate(dateNumber);
  return formattedDate.split(' ')[0];
}

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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAll(string) {
  const words = string.split(' ');
  const newWords = [];

  for (const word of words) {
    newWords.push(capitalize(word));
  }
  return newWords.join(' ');
}

export function resourseNameFromPath(path) {
  //'/assets/topics/camouflage.png';
  return path.split('/').at(-1).slice(0, -4);
}

export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function buildActivityName(topicDataName, resourceType) {
  return `${capitalizeAll(topicDataName)} ${activityConfig[resourceType].name}`;
}

export function prepareData(data) {
  return data.map((item) => ({
    ...item,
    displayName: buildActivityName(item.topic_data.name, item.resource_type),
  }));
}

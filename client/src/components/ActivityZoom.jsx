import { useParams, Link } from 'react-router-dom';
import Activity from './Activity';

function ActivityZoom() {
  const { key } = useParams();
  // console.log(useParams());
  //   const icon = data.find((icon) => icon.key === key);

  if (!key) return null;

  return (
    <>
      <Activity />
      <div>The key is {key}</div>
      <Link to={`/`}>
        <span className='m-2 p-2 border rounded shadow'>X</span>
      </Link>
    </>
  );
}

export default ActivityZoom;

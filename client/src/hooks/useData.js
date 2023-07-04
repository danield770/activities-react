import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useData(url, key) {
  console.log({ url });
  console.log({ key });
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(url);
      console.log({ data });

      return data;
    },
    queryKey: [key],
  });
}

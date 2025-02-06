import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabase/client';

const fetchAuthSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session || error) throw new Error();
  return session;
};

const useAuthSession = () => {
  const query = useQuery({
    queryKey: ['authSession'],
    queryFn: fetchAuthSession,
    retry: 0,
  });

  return { ...query, accessToken: query.data?.access_token, refreshToken: query.data?.refresh_token };
};

export default useAuthSession;

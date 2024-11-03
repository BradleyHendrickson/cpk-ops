// hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const fetchUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};

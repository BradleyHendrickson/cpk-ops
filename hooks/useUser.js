// hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const fetchUser = async () => {
  // Get the current user
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return null; // or handle the case where there is no user
  }

  console.log('user',user);

  // Fetch user_company records and join with company table
  const { data: userCompanies, error } = await supabase
    .from('user_company')
    .select(`
      *,
      company:company_id (
        id,
        name
      )
    `)
    .eq('user_id', user.id); // Assuming user_company has a user_id field that links to the user

  if (error) {
    throw new Error(error.message); // Handle errors appropriately
  }

  console.log('user companies',userCompanies);

  // Return user object with user_company info
  return {
    ...user,
    userCompanies
  };
};

export const useUser = () => {

  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};

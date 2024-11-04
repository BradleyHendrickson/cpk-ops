// hooks/useWorkstations.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/hooks/useUser';

const supabase = createClient();

const fetchWorkstations = async (companyId) => {
  if (!companyId) {
    return []; // Return an empty array if there is no company ID
  }

  const { data: workstations, error } = await supabase
    .from('workstation')
    .select('*')
    .eq('company_id', companyId);

  if (error) {
    throw new Error(error.message); // Handle errors appropriately
  }

  return workstations;
};

const createWorkstation = async ({ companyId, workstationData }) => {
  const { data, error } = await supabase
    .from('workstation')
    .insert({ ...workstationData, company_id: companyId });

  if (error) {
    throw new Error(error.message); // Handle errors appropriately
  }

  return data;
};

export const useWorkstation = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUser();
  const queryClient = useQueryClient();

  // Retrieve the company ID from the first userCompany
  const companyId = user?.userCompanies?.[0]?.company?.id;

  const workstationsQuery = useQuery({
    queryKey: ['workstations', companyId],
    queryFn: () => fetchWorkstations(companyId),
    enabled: !!companyId && !isUserLoading && !isUserError, // Only run if companyId is available and user is loaded
  });

  // Mutation for creating a new workstation
  const createWorkstationMutation = useMutation({
    mutationFn: (workstationData) => createWorkstation({ companyId, workstationData }),
    onSuccess: () => {
      // Invalidate and refetch the workstations query to update with the new workstation
      queryClient.invalidateQueries(['workstations', companyId]);
    },
  });

  return {
    ...workstationsQuery,
    createWorkstation: createWorkstationMutation.mutate,
    creatingWorkstation: createWorkstationMutation.isLoading,
  };
};

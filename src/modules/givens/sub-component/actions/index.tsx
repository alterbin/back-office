import { Eye } from "@/components";
import { ActionType } from "@/components/shared/actionables";
import { useModals } from "@/contexts/modals";
import { Given } from "@/services/queries/givens/types";
import routes from "@/utils/routes";
import { useRouter } from "next/navigation";

export const useActions = (data: Given) => {
  const { push } = useRouter();
  const { setModals } = useModals();

  const handleView = () => {
    const url = `${routes.givens.path}/${data?.id}`;
    push(url);
  };
  const handleViewDummy = (record: Given) => {
    setModals((old) => ({ ...old, edit: true, record }));
  };

  const getActions = (): ActionType[] => {
    const actions: ActionType[] = [
      {
        label: "View Interests",
        onClick: handleView,
        icon: <Eye stroke="#040622" width={16} height={16} />,
      },
      {
        label: "Edit",
        onClick: () => handleViewDummy(data),
      },
    ];

    return actions;
  };

  return {
    getActions,
  };
};

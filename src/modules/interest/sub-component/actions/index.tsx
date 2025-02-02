import { Eye } from "@/components";
import { ActionType } from "@/components/shared/actionables";
import { useModals } from "@/contexts/modals";
import { Interest } from "@/services/queries/interest/types";
import routes from "@/utils/routes";
import { useRouter } from "next/navigation";

export const useInterestActions = (data: Interest) => {
  const { setModals } = useModals();

  const handleView = () => {
    setModals((old) => ({ ...old, show: true, record: data }));
  };

  const handleViewDummy = (record: Interest) => {
    setModals((old) => ({ ...old, show: true, record }));
  };

  const getActions = (): ActionType[] => {
    const actions: ActionType[] = [
      {
        label: "View Given",
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

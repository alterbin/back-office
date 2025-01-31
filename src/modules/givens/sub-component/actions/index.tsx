import { Eye } from "@/components";
import { ActionType } from "@/components/shared/actionables";
import { Given } from "@/services/queries/givens/types";
import routes from "@/utils/routes";
import { useRouter } from "next/navigation";

export const useActions = (data: Given) => {
  const { push } = useRouter();

  const handleView = () => {
    const url = `${routes.givens.path}/${data?.id}`;
    push(url);
  };
  const handleViewDummy = (e: MouseEvent) => {
    e.stopPropagation();
    document.body.click();
  };

  const getActions = (): ActionType[] => {
    const actions: ActionType[] = [
      {
        label: "View more",
        onClick: handleView,
        icon: <Eye stroke="#040622" width={16} height={16} />,
      },
      {
        label: "",
        onClick: handleViewDummy,
      },
    ];

    return actions;
  };

  return {
    getActions,
  };
};

import { Edit, Eye, Trash } from "@/components";
import { ActionType } from "@/components/shared/actionables";
import { useModals } from "@/contexts/modals";
import { ICollection } from "@/services/queries/collections/types";

export const useActions = (data: ICollection) => {
  const { setModals } = useModals();

  const handleView = () => {
    setModals((old) => ({ ...old, show: true, record: data }));
  };
  const handleEdit = (record: ICollection) => {
    setModals((old) => ({ ...old, create: true, record }));
  };
  const handleDelete = (record: ICollection) => {
    setModals((old) => ({ ...old, delete: true, record }));
  };

  const getActions = (): ActionType[] => {
    const actions: ActionType[] = [
      {
        label: "View Collection",
        onClick: handleView,
        icon: <Eye stroke="#040622" width={16} height={16} />,
      },
      {
        label: "Edit",
        onClick: () => handleEdit(data),
        icon: <Edit stroke="#040622" width={16} height={16} />,
      },
      {
        label: "Delete",
        onClick: () => handleDelete(data),
        icon: <Trash stroke="#040622" width={16} height={16} />,
      },
    ];

    return actions;
  };

  return {
    getActions,
  };
};

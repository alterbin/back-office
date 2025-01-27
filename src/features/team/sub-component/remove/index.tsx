import { Button, Trash } from '@/components';
import { teamqueries } from '@/services/queries';
import { Team } from '@/services/queries/team/types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export const Remove = ({ id }: Team) => {
  const { mutate, isPending } = teamqueries.Del();

  const handleDelete = () => mutate({ id });

  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      rootClose
      overlay={(
        <Popover id="popover-positioned">
          <Popover.Body className="d-flex flex-column gap-2">
            <h6>Are you sure?</h6>

            <div className="d-flex gap-2">
              <Button isLoading={isPending} onClick={handleDelete} className="w-auto" size="md" variant="outlined">
                Yes
              </Button>

              <Button onClick={() => document.body.click()} className="w-auto" size="md">
                No
              </Button>
            </div>
          </Popover.Body>
        </Popover>
              )}
    >
      <div>
        <Button style={{ padding: '0.1rem 0.975rem', minHeight: '28px' }} className="w-auto" size="md" variant="outlined">
          <Trash stroke="var(--red)" />
        </Button>
      </div>
    </OverlayTrigger>
  );
};

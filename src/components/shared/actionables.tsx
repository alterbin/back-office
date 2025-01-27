import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { ActionsIcon } from '../svgs';

export type ActionType = {
  label: string;
  onClick: (e: any) => void;
  variant?: 'normal' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
};

type ActionablesProps = {
  actions?: ActionType[];
  customTrigger?: React.ReactNode;
  forceDropdown?: boolean;
};

export const Actionables: React.FC<ActionablesProps> = ({
  actions,
  customTrigger,
  forceDropdown = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleClose = () => {
    setShowDropdown(false);
  };

  if (actions && (forceDropdown || actions.length > 1)) {
    return (
      <div>
        {!customTrigger ? (
          <Button variant="light" onClick={handleClick}>
            <ActionsIcon stroke="var(--red)" />
          </Button>
        ) : (
          React.cloneElement(customTrigger as React.ReactElement, {
            onClick: handleClick,
          })
        )}

        <Dropdown
          show={showDropdown}
          onToggle={handleClose}
          data-bs-theme="light"
          align={{
            sm: 'start',
          }}
          drop="down"
        >
          <Dropdown.Menu
            style={{
              borderRadius: '10px', backgroundColor: '#fff', border: 'none', zIndex: 10000,
            }}
            className="shadow-dropdown"
            align={{
              lg: 'end',
            }}
          >
            {actions.map((action, i) => (
              <Dropdown.Item
                key={i}
                onClick={(e) => {
                  action.onClick(e);
                  handleClose();
                }}
                disabled={action.disabled}
                className={action.variant === 'danger' ? 'tx_red' : 'tx_purple'}
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  display: 'flex',
                  gap: '16px',
                  borderRadius: '8px',
                  fontWeight: 400,
                  fontFamily: 'Articulat-Semibold',
                }}
              >
                {action.icon}
                {action.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  if (customTrigger) {
    const triggers = Array.isArray(customTrigger) ? customTrigger : [customTrigger];
    return (
      <div>
        {triggers.map((trigger, i) => (
          <div key={i}>{trigger}</div>
        ))}
      </div>
    );
  }

  const [action] = actions ?? [];
  if (action) {
    return (
      <div>
        <Button
          type="button"
          className="d-flex align-items-center"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.icon ? (
            <div className="d-flex justify-content-between gap-2">
              {action.label}
              {action.icon}
            </div>
          ) : (
            <div>{action.label}</div>
          )}
        </Button>
      </div>
    );
  }

  return null;
};

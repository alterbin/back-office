import OverlayTrigger, { OverlayTriggerProps } from 'react-bootstrap/OverlayTrigger';
import RBTooltip from 'react-bootstrap/Tooltip';

interface IProps extends Omit<OverlayTriggerProps, 'children' | 'overlay'> {
  children: any
  tooltip: string | string[]
  isList?: boolean;
}

export function Tooltip(props: IProps) {
  const {
    children, tooltip, isList = false, ...restProps
  } = props;

  if (isList && Array.isArray(tooltip)) {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        {...restProps}
        overlay={(tProps) => (
          <RBTooltip id="button-tooltip" {...tProps}>
            <ul>
              {tooltip.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </RBTooltip>
        )}
      >
        {children}
      </OverlayTrigger>
    );
  }

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      {...restProps}
      overlay={(tProps) => (
        <RBTooltip id="button-tooltip" {...tProps}>
          {tooltip}
        </RBTooltip>
      )}
    >
      {children}
    </OverlayTrigger>
  );
}

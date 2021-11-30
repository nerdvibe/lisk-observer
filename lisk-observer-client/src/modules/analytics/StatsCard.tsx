import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import "./style.css";

interface Props {
  title: string;
  value: any;
  variation?: string | number;
  variationColor?: "red" | "green" | "neutral";
  icon?: IconProp | React.ReactNode;
  dropdownOptions?: any[];
  onDateChange?: (option: number) => void;
  subItem?: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
}

export const StatsCard = ({
  title,
  value,
  variation,
  variationColor,
  icon,
  dropdownOptions,
  onDateChange,
  subItem,
  tooltip,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [option, setOption] = useState(
    dropdownOptions ? dropdownOptions[0] : ""
  );
  const handleOptionUpdate = (value: number, label: string) => {
    onDateChange && onDateChange(value);
    setOption({ value, label });
  };
  const calculateVariationColor =
    variation &&
    (+variation === 0 ? "neutral" : +variation > 0 ? "green" : "red");

  const dropdown = () => {
    if (!dropdownOptions) return <></>;
    return (
      <Dropdown
        isOpen={showDropdown}
        toggle={() => setShowDropdown(!showDropdown)}
        className="days-dropdown bg-none"
      >
        <DropdownToggle caret>
          {option.label}
          <FontAwesomeIcon
            icon={["fas", "angle-down"]}
            className="pointer float-right mt-1 ml-4 dropdown-icon"
          />
        </DropdownToggle>
        {showDropdown && (
          <DropdownMenu>
            {dropdownOptions?.map(({ label, value }) => {
              return (
                <DropdownItem
                  className="pointer"
                  onClick={() => handleOptionUpdate(value, label)}
                >
                  {label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  };

  return (
    <Card className="stats-card-container" data-tip={tooltip}>
      <CardHeader>
        <CardTitle tag="h3">
          {dropdownOptions ? (
            <>
              <Row>
                <Col xs={8}>
                  <CardTitle tag="h3">{title}</CardTitle>
                </Col>
              </Row>
              <div className="floating-card-dropdown">{dropdown()}</div>
            </>
          ) : (
            <CardTitle tag="h3">{title}</CardTitle>
          )}
        </CardTitle>
      </CardHeader>
      <CardBody className="stats-card">
        <div className="stats-card-data-block">
          <div className="left-block">
            <div className="stats-card-value">{value}</div>
            {variation && (
              <div
                className={`stats-card-variation variation-${
                  variationColor || calculateVariationColor
                }`}
              >
                {variation} %
              </div>
            )}
            {subItem && <div className="stats-card-sub-value">{subItem}</div>}
          </div>
        </div>
        <div className={`floating-card-icon`}>
          {icon &&
            (React.isValidElement(icon) ? (
              icon
            ) : (
              <FontAwesomeIcon
                icon={icon as IconProp}
                className="white-text stats-card-icon"
              />
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

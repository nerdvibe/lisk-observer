import React from "react";
import "./rowcell.css";

interface Props {
  mainItem: React.ReactChild | string;
  mainItemClass?: string;
  mainItemBold?: boolean;
  subItem?: React.ReactChild | string;
  subItemClass?: string;
  subItemBold?: boolean;
  extraClass?: string;
  dataTip?: string;
  subDataTip?: string;
  image?: any;
}

const RowCell = ({
  mainItem,
  mainItemClass,
  subItem,
  subItemClass,
  extraClass,
  mainItemBold,
  subItemBold,
  dataTip,
  subDataTip,
  image,
}: Props) => {
  const isMainItemBold = mainItemBold ? "bold" : null;
  const isSubItemBold = subItemBold ? "bold" : null;
  return (
    <td className={extraClass} data-tip={!subDataTip ? dataTip : undefined}>
      {image && <div className="inline-element w-20">{image}</div>}
      <div className={`inline-element ${image && "w-auto"}`}>
        <div
          className={`row-cell-main-item white-text ${mainItemClass} ${isMainItemBold}`}
          data-tip={!subDataTip ? dataTip : undefined}
        >
          {mainItem}
        </div>
        {subItem && (
          <div
            className={`row-cell-sub-item text-truncate ${subItemClass} ${isSubItemBold}`}
            data-tip={subDataTip}
          >
            {subItem}
          </div>
        )}
      </div>
    </td>
  );
};

export default RowCell;

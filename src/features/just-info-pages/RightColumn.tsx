import React from "react";

export const RightColumn = (props: React.PropsWithChildren) => {
  return (
    <div className="w-3/12">
      <h2>
        Messeges
      </h2>
      {props.children}
    </div>
  );
};

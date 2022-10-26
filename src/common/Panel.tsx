import React from "react"

export const Panel = (props: React.PropsWithChildren) => {
  return (
    <div className="my-3 pt-9 px-2 md:px-4 bg-indigo-50 rounded-xl shadow-lg">
      {props.children}
    </div>
  );
}
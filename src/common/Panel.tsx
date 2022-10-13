import React from "react"

export const Panel = (props: React.PropsWithChildren) => {
  return (
    <div className="my-3 pt-9 px-1 bg-slate-50 border-2 border-solid border-slate-400 shadow-lg">
      {props.children}
    </div>
  );
}
import React from "react"

export const Panel = (props: React.PropsWithChildren) => {
  return (
    <div className="my-3 pt-9 px-2 md:px-4 bg-stone-50 border-2 border-solid border-slate-400 shadow-lg">
      {props.children}
    </div>
  );
}
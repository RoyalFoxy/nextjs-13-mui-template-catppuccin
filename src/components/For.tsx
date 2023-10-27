import { ReactNode } from "react";

interface For<T> {
  dataSet: T[];
  children: (data: T) => ReactNode;
}

export default function For<T>({ dataSet, children }: For<T>) {
  return <>{dataSet.map(children)}</>;
}
